import {User} from '@/data-service/entities/user.entity';
import {UserRepository} from '@/data-service/repositories/user.repository';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserService} from '../user/user.service';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	providers: [UserService, AuthService, UserRepository],
	controllers: [AuthController],
})
export class AuthModule {}
