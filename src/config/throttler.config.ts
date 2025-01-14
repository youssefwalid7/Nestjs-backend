import {ThrottlerOptions} from '@nestjs/throttler';

export const throttlerConfig: ThrottlerOptions = {
	ttl: 60000, // Time-to-live in seconds
	limit: 5, // Maximum number of requests
};
