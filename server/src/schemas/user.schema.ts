import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLNonNull,
} from 'graphql';
import _ from 'lodash';

const users = [
    { id: '23', firstName: 'Bill', age: 20 },
    { id: '47', firstName: 'Samantha', age: 21 },
];

interface UserArgs {
    id: string;
}

const userFieldResolver = (parentValue: unknown, args: UserArgs) => {
    const user = _.find(users, { id: args.id });
    if (!user) {
        throw new Error('User not found');
    } else {
        return user;
    }
};

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLString) } },
            resolve: userFieldResolver,
        },
    },
});

export default new GraphQLSchema({ query: RootQuery });
