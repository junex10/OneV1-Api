import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Level, Person, User } from "src/models";
import { Constants, Hash, Globals } from 'src/utils';
import {
    
} from './home.entity';
import * as fs from 'fs';
import * as moment from 'moment';
import { Op } from 'sequelize';

@Injectable()
export class HomeService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        @InjectModel(Person) private personModel: typeof Person,
    ) {

    }

}
