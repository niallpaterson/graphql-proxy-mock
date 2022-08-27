import { gql } from 'apollo-server';

export const typeDefs = gql`
	enum Fabric {
		COTTON
		WOOL
	}
	type Teddy {
		name: String
		fur: String
		fabric: Fabric
	}
	type Person {
		name: String
		id: String
		age: Int
		teddy: Teddy
	}
	type Query {
		getPerson: Person
		getPeople: [Person]
		getTeddy: Teddy
	}
`;
