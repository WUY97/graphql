import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
    GraphQLList,
} from 'graphql';

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => {
        const UserType = require('./UserType').default;
        return {
            id: { type: new GraphQLNonNull(GraphQLID) },
            name: { type: GraphQLString },
            description: { type: GraphQLString },
            users: {
                type: new GraphQLList(UserType),
                resolve: async (parentValue: any, args, context) => {
                    return await context.UserModel.find({
                        companyId: parentValue.id,
                    });
                },
            },
        };
    },
});

export default CompanyType;
