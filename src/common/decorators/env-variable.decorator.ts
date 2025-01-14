export const Variable = (variableName: string, fallbackValue?: string) => {
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	return (target: any, propertyKey: string) => {
		if (!process.env[variableName] && !fallbackValue) {
			console.error(`${variableName} is not found in environment variables`, {
				name: 'Variable',
			});
			process.exit(1);
		}
		Object.defineProperty(target, propertyKey, {
			configurable: false,
			get: () => {
				return process.env[variableName] || fallbackValue;
			},
		});
	};
};
