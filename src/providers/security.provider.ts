import {Optional} from '@/common/types';
import {compare, hashSync} from 'bcrypt';

export class Security {
	/**
	 * generate hash from password or string
	 * @param {string} password
	 * @returns {string}
	 */
	public static generateHash = (password: string): string => {
		return hashSync(password, 10);
	};

	/**
	 * validate text with hash
	 * @param {string} password
	 * @param {string} hash
	 * @returns {Promise<boolean>}
	 */
	public static validateHash = (password: Optional<string>, hash: Optional<string>): Promise<boolean> => {
		if (!password || !hash) {
			return Promise.resolve(false);
		}
		return compare(password, hash);
	};
}
