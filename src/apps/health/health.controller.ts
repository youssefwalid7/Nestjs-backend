import {Public} from '@/common/auth/decorators/public.decorator';
import {Controller, Get} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

@Public()
@ApiTags('Health')
@Controller('health')
export class HealthController {
	@Get()
	public basicCheck(): string {
		return 'Service is running';
	}
}
