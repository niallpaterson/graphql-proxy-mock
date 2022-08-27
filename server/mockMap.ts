import { faker } from '@faker-js/faker';

export const mockMap = {
	String: {
		default: () => 'test string',
		name: {
			Teddy: () => `${faker.name.prefix()} ${faker.animal.cow()}`,
			default: faker.name.fullName,
		},
		description: faker.lorem.sentence,
	},
	Int: {
		default: 1,
		quantity: () => Math.random() * 10,
	},
};
