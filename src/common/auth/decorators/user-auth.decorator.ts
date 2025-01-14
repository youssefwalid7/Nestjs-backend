import {IS_SECURED_KEY} from '@/common/auth/decorators/public.decorator';
import {applyDecorators, SetMetadata} from '@nestjs/common';
import {ApiBearerAuth} from '@nestjs/swagger';

export const IS_USER_AUTH_KEY = 'IS_USER_AUTH_KEY';
export const UserAuth = (): ClassDecorator & MethodDecorator => {
	return applyDecorators(
		ApiBearerAuth('access-token'),
		SetMetadata(IS_SECURED_KEY, true),
		SetMetadata(IS_USER_AUTH_KEY, true),
	);
};
