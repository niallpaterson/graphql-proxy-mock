import { ApolloServer, gql } from 'apollo-server';
import { ProxyMock } from './proxy.js';

// The GraphQL schema
const typeDefs = gql`
	type Teddy {
		name: String
		fur: String
	}
	type Person {
		name: String
		id: String
		teddy: Teddy
	}
	type Query {
		"A simple type for getting started!"
		getPerson: Person
		getPeople: [Person]
	}
`;

const resolvers = {
	Query: ProxyMock,
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
