import { Injectable, Body, Global } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  User,
  PasswordReset,
  Modules,
  Permissions,
  Level,
  Person,
  UsersCode,
} from 'src/models';
import { MailerService } from '@nestjs-modules/mailer';
import {
  RecoverParams,
  ResetParams,
  RegisterParams,
  VerifyNewRegisterDTO,
  CheckCode,
} from './auth.entity';
import { Constants, Hash, Globals, JWTAuth } from 'src/utils';
import * as moment from 'moment';

@Injectable()
export class AppAuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(PasswordReset)
    private passwordResetModel: typeof PasswordReset,
    @InjectModel(Modules) private moduleModel: typeof Modules,
    @InjectModel(Person) private personModel: typeof Person,
    @InjectModel(UsersCode) private usersCodeModel: typeof UsersCode,
    private mailerService: MailerService,
  ) {}

  findUserVerified = async (email: string) => {
    const user = await this.userModel.findOne({
      include: [
        {
          model: Level,
          include: ['permissions'],
        },
        'person',
      ],
      where: {
        email,
        verified: Constants.USER.USER_VERIFIED.VERIFIED,
      },
    });
    user.save();
    return user;
  };

  findByEmail(email: string) {
    return this.userModel.findOne({
      where: {
        email,
      },
    });
  }

  findByPk(user_id: number) {
    return this.userModel.findOne({
      where: {
        id: user_id,
      },
    });
  }

  getCode(code: string) {
    return this.passwordResetModel.findOne({
      where: {
        code,
        status: Constants.PASSWORD_RESET_STATUS.ACTIVE,
      },
    });
  }

  async updatePassword(@Body() request: ResetParams) {
    await this.userModel.update(
      {
        password: Hash.makeSync(request.password),
      },
      {
        where: {
          id: request.user_id,
        },
      },
    );

    const password = await this.passwordResetModel.destroy({
      where: {
        user_id: request.user_id,
      },
    });
    return password;
  }

  async recover(@Body() request: RecoverParams, user: User) {
    await this.passwordResetModel.update(
      {
        status: Constants.PASSWORD_RESET_STATUS.INACTIVE,
      },
      {
        where: {
          user_id: user.id,
          status: Constants.PASSWORD_RESET_STATUS.ACTIVE,
        },
      },
    );

    let code = Globals.codeGenerater();

    await this.passwordResetModel.create({
      user_id: user.id,
      code,
      status: Constants.PASSWORD_RESET_STATUS.ACTIVE,
    });

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Password Recover | ' + process.env.MAIL_FROM_NAME,
        template: './reset',
        context: {
          code,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async createUser(@Body() request: RegisterParams, file: Express.Multer.File) {
    const user = await this.userModel.create({
      email: request.email,
      password: Hash.makeSync(request.password),
      level_id: request.level_id || Constants.LEVELS.USER,
      photo: file ? 'users/' + file.filename : null,
      token: null, // We should remove this in future updates
      verified: Constants.USER.USER_VERIFIED.NO_VERIFIED,
      status: Constants.USER.USER_VERIFIED.NO_VERIFIED,
    });
    const person = await this.personModel.create({
      name: request.name ?? null,
      lastname: request.lastname ?? null,
      username: request?.username ?? null,
      user_id: user.id,
    });

    const code = Globals.codeGenerater();

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: process.env.MAIL_FROM_NAME,
        template: './register',
        context: {
          user: person.username,
          code,
        },
      });
    } catch (e) {
      console.log(e);
    }

    const getUser = await this.userModel.findOne({
      include: [Person],
      where: {
        id: user.id,
      },
    });
    return getUser;
  }

  async getModules(level: number) {
    let modules: any = [];
    if (level !== undefined) modules = await this.moduleModel.findAll();
    else modules = await this.moduleModel.findAll();

    return modules;
  }

  verify = async (code: number) => {
    const getCode = await this.usersCodeModel.findOne({
      where: {
        code,
        status: Constants.USER.USER_CODE_STATUS.AVAILABLE,
      },
    });
    if (!getCode) return null;

    await this.usersCodeModel.update(
      {
        status: Constants.USER.USER_CODE_STATUS.DISABLED,
      },
      {
        where: {
          id: getCode?.id,
        },
      },
    );

    const user = await this.userModel.update(
      {
        verified: Constants.USER.USER_VERIFIED.VERIFIED,
      },
      {
        where: {
          id: getCode?.user_id,
        },
      },
    );
    return user[0];
  };

  verify_register = async (request: VerifyNewRegisterDTO) => {
    let user: any;
    if (request.username) {
      user = await this.personModel.findOne({
        where: {
          username: request.username,
        },
      });
    } else if (request.email) {
      user = await this.userModel.findOne({
        include: [Person],
        where: {
          email: request.email,
        },
      });
    } else {
      user = await this.personModel.findOne({
        where: {
          phone: request.phone,
        },
      });
    }

    if (user && !request.getUser) return null;
    else if (request.getUser) {
      //We generate the new code in passwordReset
      const code = Globals.codeGenerater();
      await this.passwordResetModel.create({
        user_id: user.id,
        code,
        status: Constants.PASSWORD_RESET_STATUS.ACTIVE,
      });
      // We send email for the new code
      try {
        await this.mailerService.sendMail({
          to: user.email,
          subject: process.env.MAIL_FROM_NAME,
          template: './reset',
          context: {
            user: user.person.username,
            code,
          },
        });
      } catch (e) {
        console.log(e);
      }
      return user;
    }

    return true;
  };

  checkPermissions = async (
    permissions: string,
    code: string,
  ): Promise<boolean> => {
    const readPermissions = JWTAuth.readToken(permissions);
    const auth = await readPermissions?.permissions.filter(
      (value: any) => code === value.actions.code,
    );
    if (auth !== null) {
      if (auth.length > 0) return true;
    }
    return false;
  };

  checkCode = async (request: CheckCode) => {
    const updated = await this.passwordResetModel.update(
      {
        status: Constants.PASSWORD_RESET_STATUS.INACTIVE,
      },
      {
        where: {
          user_id: request.user_id,
          code: request.code,
          status: Constants.PASSWORD_RESET_STATUS.ACTIVE,
        },
      },
    );

    return updated;
  };

  private generateURL = async () => {
    let numbers = '';
    const min: number = 0;
    const max: number = 9;
    for (let x = 0; x < 6; x++) {
      numbers += (Math.floor(Math.random() * (max - min)) + min).toString();
    }
    return `verify/${Globals.filterByUrl(await Hash.make(numbers))}`;
  };
}
