// src/user/user.module.ts
import {User} from '@/data-service/entities/user.entity';
import {UserRepository} from '@/data-service/repositories/user.repository';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserController} from './user.controller';
import {UserService} from './user.service';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [UserController],
	providers: [UserService, UserRepository],
})
export class UserModule {}
