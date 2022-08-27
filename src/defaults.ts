import { faker } from '@faker-js/faker';
import { getRandomLength } from './utils';
import { MockMapType } from './types';

export const defaultMocks: MockMapType = {
	String: {
		default: faker.word,
		email: faker.internet.exampleEmail,
		uuid: faker.datatype.uuid,
		uid: faker.datatype.uuid,
		id: faker.database.mongodbObjectId,
		url: faker.internet.url,
		name: faker.name.fullName,
		date: () => faker.date.recent().toISOString(),
		dateTime: () => faker.date.recent().toISOString(),
		colorHex: faker.internet.color,
		color: faker.internet.color,
		backgroundColor: faker.internet.color,
		textShadow: faker.internet.color,
		textColor: faker.internet.color,
		textDecorationColor: faker.internet.color,
		borderColor: faker.internet.color,
		borderTopColor: faker.internet.color,
		borderRightColor: faker.internet.color,
		borderBottomColor: faker.internet.color,
		borderLeftColor: faker.internet.color,
		borderBlockStartColor: faker.internet.color,
		borderBlockEndColor: faker.internet.color,
		borderInlineStartColor: faker.internet.color,
		borderInlineEndColor: faker.internet.color,
		columnRuleColor: faker.internet.color,
		outlineColor: faker.internet.color,
		phoneNumber: faker.phone.number,
		phone: faker.phone.number,
		image: faker.image.abstract,
		images: () => Array(getRandomLength()).fill(faker.image.abstract),
		title: faker.word.adverb,
		description: faker.lorem.sentence,
	},
	Int: {
		default: () => Math.ceil(Math.random() * 10),
		quantity: () => Math.ceil(Math.random() * 10),
	},
};
