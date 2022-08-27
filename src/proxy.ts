import { GraphQLResolveInfo } from 'graphql';
import { MockResolver } from './resolver';
import { MockMapType } from './types';

type ProxyMockResolverConfig = {
	resolveMutations?: boolean;
	mockMap: MockMapType;
};

export function ProxyMock(config: ProxyMockResolverConfig) {
	this.Query = createQueryProxy(config.mockMap);
	if (config.resolveMutations) {
		this.Mutation = createQueryProxy(config.mockMap);
	}
}

const createQueryProxy = (mockMap: MockMapType) =>
	new Proxy(
		{},
		{
			get(target, prop) {
				const mockResolver = new MockResolver(mockMap);
				return new Proxy(() => {}, {
					apply: (
						target,
						thisArg,
						[obj, args, context, info]: [{}, unknown[], {}, GraphQLResolveInfo]
					) => {
						if (info) {
							return mockResolver.generateMockMap(info.returnType);
						} else {
							throw new Error('Unable to generate mock resolver map.');
						}
					},
				});
			},
		}
	);
