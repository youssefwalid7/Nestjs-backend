import {Global, Module} from '@nestjs/common';
import {Provider} from '@nestjs/common/interfaces/modules/provider.interface';

/** To be able to ingest repositories in another module
 * Insert it in the repositories array that will be provided and exported
 * */

const repositories: Provider[] = [
	/** User */
];

@Global()
@Module({
	providers: repositories,
	exports: repositories,
})
export class DataServiceModule {}
