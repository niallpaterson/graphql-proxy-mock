import { testServer } from '../server';
import test from 'ava';

const GetPerson = `query GetPerson {
  getPerson {
    name
    age
    teddy {
      fabric
    }
  }
}`;

test('It correctly returns data', async (t) => {
	const result = await testServer.executeOperation({
		query: GetPerson,
	});

	const expected = 'data' in result;
	t.is(expected, true);
});

test('It correctly resolves String Scalars', async (t) => {
	const result = await testServer.executeOperation({
		query: GetPerson,
	});

	const expected = typeof result?.data?.getPerson?.name;
	t.is(expected, 'string');
});

test('It correctly resolves Int Scalars', async (t) => {
	const result = await testServer.executeOperation({
		query: GetPerson,
	});

	const expected = typeof result?.data?.getPerson?.age;
	t.is(expected, 'number');
});

test('It correctly resolves Enum Scalars', async (t) => {
	const result = await testServer.executeOperation({
		query: GetPerson,
	});

	const enumValue = result?.data?.getPerson?.teddy?.fabric;
	const expected = ['WOOL', 'COTTON'].includes(enumValue);

	if (!expected) {
		t.log('received ', enumValue);
	}

	t.is(expected, true);
});
