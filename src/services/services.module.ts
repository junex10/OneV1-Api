import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FirebaseService } from './firebase.service';

@Module({
  imports: [SequelizeModule.forFeature([])],
  controllers: [],
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class ServicesModule {}
