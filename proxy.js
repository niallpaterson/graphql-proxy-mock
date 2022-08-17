import { GraphQLObjectType, GraphQLScalarType, GraphQLList } from 'graphql';
import { MockMap } from './config.js';
import { getRandomLength } from './utils.js';

const mockScalarField = (name, type) => {
	const hasScalarType = Reflect.has(MockMap, type);
	if (!hasScalarType) {
		throw new Error('No mock found for scalar type: ' + type);
	}
	const scalarType = MockMap[type];
	const { fields } = scalarType;

	if (Reflect.has(fields, name)) {
		const field = fields[name];
		if (typeof field === 'function') return field;
		return () => field;
	}

	return () => scalarType.default ?? null;
};

const mockObjectField = (field) => {
	const subFields = Object.values(field.type._fields);
	return mockFields(subFields);
};

const mockFields = (fields) => {
	const _obj = {};
	fields.forEach((field) => {
		const isScalar = field.type instanceof GraphQLScalarType;
		const isObject = field.type instanceof GraphQLObjectType;

		if (isScalar) {
			_obj[field.name] = mockScalarField(field.name, field.type.name);
		}

		if (isObject) {
			_obj[field.name] = mockObjectField(field);
		}
	});
	return _obj;
};

const FieldProxy = new Proxy(() => {}, {
	apply: (target, thisArg, [obj, args, context, info]) => {
		const isList = info?.returnType instanceof GraphQLList;
		if (isList) {
			const subFields = Object.values(info.returnType.ofType._fields);
			return Array(getRandomLength()).fill(
				(mockFields(subFields), mockFields(subFields))
			);
		} else {
			const subFields = Object.values(info?.returnType?._fields);
			return mockFields(subFields);
		}
	},
});

export const ProxyMock = new Proxy(
	{},
	{
		get() {
			return FieldProxy;
		},
	}
);
