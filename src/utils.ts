import { MockMapType } from './types';

export const getRandomLength = () => Math.floor(Math.random() * 10);

export const pluckRandom = <T>(array: T[]) =>
	array[Math.floor(Math.random() * array.length)];

export const toFunction = (arg: unknown) =>
	typeof arg === 'function' ? arg : () => arg;

const isObject = (item) => {
	return item && typeof item === 'object' && !Array.isArray(item);
};

export const mergeDeep = <
	T extends { [key: string]: any },
	U extends { [key: string]: any }
>(
	target: T,
	source: U,
	depth: number = 1
): T & U => {
	// we have to limit this to 3 levels
	if (depth > 2) return target as T & U;
	for (const key in source) {
		if (isObject(source[key])) {
			if (!target[key])
				Object.assign(target, {
					[key]: {},
				});
			mergeDeep(target[key], source[key], depth + 1);
		} else {
			Object.assign(target, {
				[key]: source[key],
			});
		}
	}

	return target as T & U;
};
