import { faker } from '@faker-js/faker';

export const MockMap = {
	String: {
		default: 'I am a string-a-ling-ling',
		fields: {
			name: faker.name.fullName,
			fur: faker.color.human,
		},
	},
	Int: {
		quantity: Math.random() * 10,
	},
};
