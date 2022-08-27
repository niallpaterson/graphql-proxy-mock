import { ApolloServer } from 'apollo-server';
import { mockMap } from './mockMap';
import { typeDefs } from './typeDefs';
import { ProxyMock } from '../src/proxy';

const resolvers = new ProxyMock({
	mockMap,
	resolveMutations: false,
});

export const testServer = new ApolloServer({
	typeDefs,
	resolvers,
});
