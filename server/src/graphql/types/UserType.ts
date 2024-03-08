import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
} from 'graphql';

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => {
        const CompanyType = require('./CompanyType').default;
        return {
            id: { type: GraphQLID },
            firstName: { type: GraphQLString },
            age: { type: GraphQLInt },
            company: {
                type: CompanyType,
                resolve: async (parentValue: any, args, context) => {
                    return await context.CompanyModel.findOne({
                        id: parentValue.companyId,
                    });
                },
            },
        };
    },
});

export default UserType;
