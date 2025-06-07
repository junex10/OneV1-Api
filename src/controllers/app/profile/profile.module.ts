import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppProfileService } from './profile.service';
import { AppProfileController } from './profile.controller';
import { Person, User } from 'src/models';

@Module({
  imports: [SequelizeModule.forFeature([User, Person])],
  controllers: [AppProfileController],
  providers: [AppProfileService],
})
export class AppProfileModule {}
