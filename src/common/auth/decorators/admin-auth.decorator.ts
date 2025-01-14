import {IS_SECURED_KEY} from '@/common/auth/decorators/public.decorator';
import {applyDecorators, SetMetadata} from '@nestjs/common';
import {ApiBearerAuth} from '@nestjs/swagger';

export const IS_ADMIN_AUTH_KEY = 'IS_ADMIN_AUTH_KEY';
export const AdminAuth = (): ClassDecorator & MethodDecorator => {
	return applyDecorators(
		ApiBearerAuth('access-token'),
		SetMetadata(IS_SECURED_KEY, true),
		SetMetadata(IS_ADMIN_AUTH_KEY, true),
	);
};
