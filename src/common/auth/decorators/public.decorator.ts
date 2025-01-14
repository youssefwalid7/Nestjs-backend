import {SetMetadata} from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const IS_SECURED_KEY = 'isSecured';
export const Public = (): ClassDecorator & MethodDecorator => SetMetadata(IS_PUBLIC_KEY, true);
