import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { Person, User } from 'src/models';

@Module({
    imports: [
        SequelizeModule.forFeature([
            User,
            Person
        ])
    ],
    controllers: [
        ProfileController
    ],
    providers: [
        ProfileService
    ]
})
export class ProfileModule { }
