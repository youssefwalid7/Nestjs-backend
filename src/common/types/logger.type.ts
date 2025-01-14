export interface BaseLoggerType {
	data?: any;
	requestId?: string;
}

export interface LoggerInfoType extends BaseLoggerType {
	message: string;
}

export interface LoggerErrorType extends BaseLoggerType {
	severity: LOG_SEVERITY;
	exception?: any;
	message?: string;
}

export enum LOG_SEVERITY {
	critical = 'Critical',
	high = 'High',
	medium = 'Medium',
	low = 'Low',
}
