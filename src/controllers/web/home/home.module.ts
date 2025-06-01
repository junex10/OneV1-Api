import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { Person, User } from 'src/models';

@Module({
    imports: [
        SequelizeModule.forFeature([
            User,
            Person,
        ])
    ],
    controllers: [
        HomeController
    ],
    providers: [
        HomeService
    ]
})
export class HomeModule { }
