import { GraphQLEnumType, GraphQLOutputType } from 'graphql';
import {
	GraphQLObjectType,
	GraphQLScalarType,
	GraphQLList,
	GraphQLFieldMap,
} from 'graphql';
import { getRandomLength, pluckRandom, toFunction, mergeDeep } from './utils';
import { defaultMocks } from './defaults';
import { MockMapType } from './types';

export class MockResolver {
	mockMap: MockMapType;
	modelType?: string;
	constructor(mockMap: MockMapType) {
		this.mockMap = mockMap;
	}

	generateMockMap = (type: GraphQLOutputType) => {
		if (type instanceof GraphQLObjectType) {
			return this.mockFields(type.getFields(), type.name);
		}
		if (type instanceof GraphQLEnumType) {
			return this.mockEnumField(type);
		}
		if (type instanceof GraphQLScalarType) {
			return this.mockScalarField(type.name, type.name);
		}
		if (type instanceof GraphQLList) {
			return Array(getRandomLength()).fill(this.generateMockMap(type.ofType));
		}
	};

	mockFields = (
		fields: GraphQLFieldMap<unknown, unknown>,
		modelTypeName?: string
	) => {
		const _obj = {};
		for (const key in fields) {
			const field = fields[key];
			if (field?.type instanceof GraphQLEnumType) {
				_obj[field.name] = this.mockEnumField(field.type);
			}
			if (field?.type instanceof GraphQLScalarType) {
				_obj[field.name] = this.mockScalarField(
					field.name,
					field.type.name,
					modelTypeName
				);
			}

			if (field?.type instanceof GraphQLObjectType) {
				_obj[field.name] = this.mockFields(
					field.type.getFields(),
					field?.type.name
				);
			}
		}

		return _obj;
	};

	mockScalarField = (
		name: string,
		scalarTypeName: string,
		modelTypeName?: string
	) => {
		const scalarType = this.mockMap[scalarTypeName];
		const field = scalarType?.[name];

		const hasFieldName = Reflect.has(scalarType ?? {}, name);
		const hasScalarType = Reflect.has(this.mockMap ?? {}, scalarTypeName);

		const hasScalarDefault = Reflect.has(scalarType ?? {}, 'default');
		const hasModelSpecific = Reflect.has(field ?? {}, modelTypeName);
		const hasFieldNameDefault = Reflect.has(field ?? {}, 'default');

		if (!hasScalarType) {
			throw new Error('No mock found for scalar type: ' + scalarTypeName);
		}

		if (!hasFieldName && !hasScalarDefault) {
			throw new Error(
				'No default mock found for scalar type: ' + scalarTypeName
			);
		}

		if (hasModelSpecific) return toFunction(field[modelTypeName]);
		if (hasFieldNameDefault) return toFunction(field.default);
		if (hasScalarDefault) return toFunction(scalarType.default);
	};

	mockEnumField = (enumType: GraphQLEnumType) => {
		const values = enumType.getValues();
		return () => pluckRandom([...values]).value;
	};
}
