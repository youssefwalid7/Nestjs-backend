import {customAlphabet} from 'nanoid';

export class Generator {
	private static readonly ALPHABET_FRIENDLY_ID = '123456789ABCDEFGHJKMNPQRSTUVWXYZ';
	private static readonly NANOID_FRIENDLY_ID_LENGTH = 12;

	/**
	 * generate friendly uid
	 * @returns {string}
	 */
	public static friendlyUid = (): string => {
		const nanoid = customAlphabet(Generator.ALPHABET_FRIENDLY_ID, Generator.NANOID_FRIENDLY_ID_LENGTH);
		return nanoid();
	};

	/**
	 * generate nanoid from alphabet
	 * @param {string} alphabet
	 * @param {number} size
	 * @returns {string}
	 */
	public static nanoid = (alphabet: string, size: number): string => {
		const nanoid = customAlphabet(alphabet, size);
		return nanoid();
	};
}
