import { Injectable, Body } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/sequelize';
import {
  User,
  Person,
  Events,
  EventsType,
  EventsUsersJoined,
  Friends,
  EventComments,
} from 'src/models';
import {
  GetAllMyEventsDTO,
  GetCommentsDTO,
  GetEventDTO,
  GetEventsByUserDTO,
  GetEventsDTO,
  GetEventsTypeDTO,
  GetViewersDTO,
  SetEventDTO,
} from './event.entity';
import { Constants, Globals } from 'src/utils';
import { Op, Sequelize } from 'sequelize';
import * as fs from 'fs';
import * as path from 'path';

const GOOGLE_API = process.env.GOOGLE_API;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

@Injectable()
export class AppEventsService {
  constructor(
    @InjectModel(Person) private personModel: typeof Person,
    @InjectModel(Events) private eventModel: typeof Events,
    @InjectModel(EventsType) private eventTypeModel: typeof EventsType,
    @InjectModel(EventComments)
    private eventsCommentModel: typeof EventComments,
    @InjectModel(Friends) private friendsModel: typeof Friends,
    @InjectModel(EventsUsersJoined)
    private eventsUsersJoined: typeof EventsUsersJoined,
    private readonly http: HttpService,
  ) {}

  async setEvent(@Body() request: SetEventDTO) {
    try {
      // We create only 1 event
      let hashedFileName;

      if (request.main_pic) {
        const dir = path.resolve(process.cwd(), 'public', 'storage', 'events');
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        hashedFileName = Globals.hashPic(
          request.main_pic?.fileName,
          request.main_pic?.mimeType,
        );
        const filePath = path.join(dir, hashedFileName);
        fs.writeFileSync(
          filePath,
          Buffer.from(request.main_pic.base64, 'base64'),
        );
      }

      let setStatus;

      if (request.starting_event) {
        setStatus = Constants.EVENT_STATUS.PENDING; // The event hasnt started yet cus it is planned
      } else {
        setStatus = Constants.EVENT_STATUS.ACTIVE; //No starting event time means the event is happening right now
      }

      // We look up the address using coordinates

      const url = `${GOOGLE_API}geocode/json?latlng=${request.latitude},${request.longitude}&key=${GOOGLE_API_KEY}`;
      const response = await this.http.get(url).toPromise();
      const address =
        response?.data?.results?.[0]?.formatted_address ||
        `No address has been found`;

      const data = {
        ...request,
        address,
        main_pic: request?.main_pic
          ? `events/${hashedFileName}`
          : `${process.env.BASE_URL}/img/random_location.jpg`,
        latitude: request?.latitude.toString(),
        longitude: request?.longitude.toString(),
        users_joined: request?.users_joined ? request.users_joined : 1, // -> Host is always the first user joined
        status: setStatus,
        starting_event: request?.starting_event
          ? request?.starting_event
          : new Date(),
        expiration_time: request?.expiration_time
          ? request?.expiration_time
          : new Date(Date.now() + 6 * 60 * 60 * 1000), // Default is 24 hours
      };

      const event = await this.eventModel.create(data);

      if (event) {
        // We create our first user joined (host)

        await this.eventsUsersJoined.create({
          user_id: request.user_id,
          event_id: event.id,
        });

        const getEvent = await this.eventModel.findOne({
          where: {
            id: event.id,
          },
        });
        return getEvent;
      }

      return null;
    } catch (e) {
      return null;
    }
  }

  async getEvents(@Body() request: GetEventsDTO) {
    const radius = 80000; // Value in meters
    const excludeRadius = 5;
    try {
      let data;
      if (!request.search) {
        data = await this.eventModel.findAll({
          where: Sequelize.literal(`
          (
            6371000 * acos(
              cos(radians(${request.latitude}))
              * cos(radians(CAST(latitude AS DECIMAL(10,7))))
              * cos(radians(CAST(longitude AS DECIMAL(10,7))) - radians(${request.longitude}))
              + sin(radians(${request.latitude}))
              * sin(radians(CAST(latitude AS DECIMAL(10,7))))
            )
          ) < ${radius}
          AND (
            6371000 * acos(
              cos(radians(${request.latitude}))
              * cos(radians(CAST(latitude AS DECIMAL(10,7))))
              * cos(radians(CAST(longitude AS DECIMAL(10,7))) - radians(${request.longitude}))
              + sin(radians(${request.latitude}))
              * sin(radians(CAST(latitude AS DECIMAL(10,7))))
            )
          ) >= ${excludeRadius}
        `),
        });
      } else {
        // Try to detect event type by name (case-insensitive LIKE)
        const eventType = await this.eventTypeModel.findOne({
          where: {
            name: { [Op.like]: `%${request.search}%` },
          },
        });

        if (eventType) {
          // If event type found, filter by event_type_id
          data = await this.eventModel.findAll({
            where: {
              [Op.and]: [
                Sequelize.literal(`
            (
              6371000 * acos(
                cos(radians(${request.latitude}))
                * cos(radians(CAST(latitude AS DECIMAL(10,7))))
                * cos(radians(CAST(longitude AS DECIMAL(10,7))) - radians(${request.longitude}))
                + sin(radians(${request.latitude}))
                * sin(radians(CAST(latitude AS DECIMAL(10,7))))
              )
            ) < ${radius}
            AND (
              6371000 * acos(
                cos(radians(${request.latitude}))
                * cos(radians(CAST(latitude AS DECIMAL(10,7))))
                * cos(radians(CAST(longitude AS DECIMAL(10,7))) - radians(${request.longitude}))
                + sin(radians(${request.latitude}))
                * sin(radians(CAST(latitude AS DECIMAL(10,7))))
              )
            ) >= ${excludeRadius}
          `),
                { event_type_id: eventType.id },
              ],
            },
          });
        } else {
          // If not found, search by address, content, or description
          data = await this.eventModel.findAll({
            where: {
              [Op.and]: [
                Sequelize.literal(`
            (
              6371000 * acos(
                cos(radians(${request.latitude}))
                * cos(radians(CAST(latitude AS DECIMAL(10,7))))
                * cos(radians(CAST(longitude AS DECIMAL(10,7))) - radians(${request.longitude}))
                + sin(radians(${request.latitude}))
                * sin(radians(CAST(latitude AS DECIMAL(10,7))))
              )
            ) < ${radius}
            AND (
              6371000 * acos(
                cos(radians(${request.latitude}))
                * cos(radians(CAST(latitude AS DECIMAL(10,7))))
                * cos(radians(CAST(longitude AS DECIMAL(10,7))) - radians(${request.longitude}))
                + sin(radians(${request.latitude}))
                * sin(radians(CAST(latitude AS DECIMAL(10,7))))
              )
            ) >= ${excludeRadius}
          `),
                { address: { [Op.like]: `%${request.search}%` } },
              ],
            },
          });
        }
      }

      return data;
    } catch (e) {
      return null;
    }
  }

  async getEvent(@Body() request: GetEventDTO) {
    try {
      const data = await this.eventModel.findOne({
        where: {
          id: request.event_id,
        },
      });
      return data;
    } catch (e) {
      return null;
    }
  }

  async getEventsByUser(@Body() request: GetEventsByUserDTO) {
    try {
      const data = await this.eventModel.findAndCountAll({
        include: [
          {
            model: User,
            include: [Person],
          },
        ],
        where: {
          user_id: request.user_id,
        },
      });
      return data;
    } catch (e) {
      return null;
    }
  }

  async getEventsType() {
    try {
      const data = await this.eventTypeModel.findAll();
      return data;
    } catch (e) {
      return null;
    }
  }

  async getEventsTypeById(@Body() request: GetEventsTypeDTO) {
    try {
      const data = await this.eventTypeModel.findOne({
        where: {
          id: request.event_type_id,
        },
      });
      return data;
    } catch (e) {
      return null;
    }
  }

  async getAllMyEvents(@Body() request: GetAllMyEventsDTO) {
    let allEvents = [];

    // All the events that the current user is hosting

    const hostingEvents = await this.eventModel.findAll({
      where: {
        user_id: request.user_id,
        status: { [Op.ne]: Constants.EVENT_STATUS.CLOSED },
      },
    });

    // All the events that we joined but we dont host

    const joinedEvents = await this.eventsUsersJoined.findAll({
      where: {
        user_id: request.user_id,
      },
      include: [
        {
          model: Events,
          where: {
            status: { [Op.ne]: Constants.EVENT_STATUS.CLOSED },
          },
        },
      ],
    });

    // All the events that our friends are hosting or joined
    // Get friend user IDs
    const friends = await this.friendsModel.findAll({
      where: {
        [Op.or]: [
          { sender_id: request.user_id },
          { receiver_id: request.user_id },
        ],
      },
    });
    const friendIds = friends
      .map((f) =>
        f.sender_id === request.user_id ? f.receiver_id : f.sender_id,
      )
      .filter((id) => id !== request.user_id);

    let friendsHostingEvents = [];
    let friendsJoinedEvents = [];

    if (friendIds.length) {
      // Events hosted by friends
      friendsHostingEvents = await this.eventModel.findAll({
        where: {
          user_id: { [Op.in]: friendIds },
          status: { [Op.ne]: Constants.EVENT_STATUS.CLOSED },
        },
      });

      // Events joined by friends (excluding those already hosted above)
      friendsJoinedEvents = await this.eventsUsersJoined.findAll({
        where: {
          user_id: { [Op.in]: friendIds },
        },
        include: [
          {
            model: Events,
            where: { status: { [Op.ne]: Constants.EVENT_STATUS.CLOSED } },
          },
        ],
      });
    }

    // Flatten joined events and avoid duplicates
    const hostingEventIds = hostingEvents.map((e) => e.id);
    const joinedEventIds = joinedEvents.map((j) => j.event_id);
    const friendsHostingEventIds = friendsHostingEvents.map((e) => e.id);

    // Only unique events for friends joined (not already in friendsHostingEvents)
    const friendsJoinedUnique = friendsJoinedEvents
      .map((j) => j.Event)
      .filter(
        (e) =>
          e &&
          !friendsHostingEventIds.includes(e.id) &&
          !hostingEventIds.includes(e.id) &&
          !joinedEventIds.includes(e.id),
      );

    // Combine all events (hosted, joined, friends hosting, friends joined)
    allEvents = [
      ...hostingEvents,
      ...joinedEvents.map((j) => j.event),
      ...friendsHostingEvents,
      ...friendsJoinedUnique,
    ];

    // Remove possible nulls and duplicates by event id
    const uniqueEvents = [];
    const seen = new Set();
    for (const e of allEvents) {
      if (e && !seen.has(e.id)) {
        // Add joined property
        uniqueEvents.push({
          ...(e.get ? e.get({ plain: true }) : e), // flatten sequelize instance if needed
          joined: joinedEventIds.includes(e.id),
        });
        seen.add(e.id);
      }
    }

    return uniqueEvents;
  }

  getViewers = async (request: GetViewersDTO) => {
    try {
      let viewers;
      if (!request.user_id) {
        viewers = await this.eventsUsersJoined.findAll({
          where: {
            event_id: request.event_id,
          },
          include: [
            {
              model: User,
              include: [{ model: Person }],
            },
          ],
        });
      } else {
        viewers = await this.eventsUsersJoined.findAll({
          where: {
            event_id: request.event_id,
            user_id: { [Op.ne]: request.user_id },
          },
          include: [
            {
              model: User,
              include: [{ model: Person }],
            },
          ],
        });
      }

      return viewers;
    } catch (e) {
      return null;
    }
  };

  getComments = async (request: GetCommentsDTO) => {
    try {
      let comments;
      if (request.count_comments) {
        comments = await this.eventsCommentModel.count({
          where: {
            event_id: request.event_id,
          },
        });
      } else {
        if (!request.last_comment) {
          comments = await this.eventsCommentModel.findAll({
            where: {
              event_id: request.event_id,
            },
            include: [{ model: User, include: [{ model: Person }] }],
          });
        } else {
          comments = await this.eventsCommentModel.findOne({
            where: {
              event_id: request.event_id,
            },
            limit: 1,
            order: [['id', 'desc']],
            include: [{ model: User, include: [{ model: Person }] }],
          });
        }
      }
      console.log(comments, ' HERE ');
      return comments;
    } catch (e) {
      return null;
    }
  };
}
