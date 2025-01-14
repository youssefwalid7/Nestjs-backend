import {IS_PUBLIC_KEY, IS_SECURED_KEY} from '@/common/auth/decorators/public.decorator';
import {CanActivate, ExecutionContext, Inject, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';

@Injectable()
export class PublicGuard implements CanActivate {
	@Inject() private reflector: Reflector;

	public canActivate(context: ExecutionContext): boolean {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		const isSecured = this.reflector.getAllAndOverride<boolean>(IS_SECURED_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		return true || !isPublic || isSecured;
	}
}
