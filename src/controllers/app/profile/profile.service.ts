import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Level, Person, User } from 'src/models';
import { Constants, Hash, Globals } from 'src/utils';
import { UpdateUserDTO } from './profile.entity';
import * as fs from 'fs';

@Injectable()
export class AppProfileService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Person) private personModel: typeof Person,
  ) {}

  update = async (request: UpdateUserDTO, file: Express.Multer.File) => {
    const user = await this.userModel.findOne({ where: { id: request.id } });
    if (file !== undefined && user?.photo !== null) {
      const PATH = `./public/storage/${user?.photo}`;
      if (fs.existsSync(PATH)) fs.unlinkSync(PATH);
    }
    const update = await this.userModel.update(
      {
        email: request.email,
        photo: file !== undefined ? 'users/' + file.filename : user?.photo,
        level_id: request.level_id ?? user.level_id,
      },
      {
        where: { id: request.id },
      },
    );
    if (update !== null) {
      await this.personModel.update(
        {
          name: request.name,
          lastname: request.lastname,
          phone: request.phone,
        },
        {
          where: { user_id: request.id },
        },
      );
      return await this.userModel.findOne({
        include: [
          {
            model: Level,
            include: ['permissions'],
          },
          'person',
        ],
        where: { id: request.id },
      });
    }

    return null;
  };
}
