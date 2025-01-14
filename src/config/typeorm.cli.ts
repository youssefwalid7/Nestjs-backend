import {exec} from 'child_process';
// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));
const option = argv._[0];
const dataSource = argv.d || './src/config/migration.config.ts';
const name = argv.n || 'undefined';

if (!option) {
	console.log(
		'Please, choose an option: \n - migration:create\n - migration:run\n - migration:revert\n - migration:show',
	);
	process.exit(0);
}
if (option === 'migration:create') {
	exec(`yarn typeorm-ts-node-commonjs ${option} ./src/database/migrations/${name}`, (_err, stdout, stderr) => {
		console.log(`${stdout}`);
		console.log(`${stderr}`);
	});
} else if (option === 'migration:generate') {
	exec(
		`yarn typeorm-ts-node-commonjs ${option} ./src/database/migrations/${name} --dataSource=${dataSource}`,
		(_err, stdout, stderr) => {
			console.log(`${stdout}`);
			console.log(`${stderr}`);
		},
	);
} else {
	exec(`yarn typeorm-ts-node-commonjs ${option} --dataSource=${dataSource}`, (_err, stdout, stderr) => {
		console.log(`${stdout}`);
		console.log(`${stderr}`);
	});
}
