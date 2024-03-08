import { GraphQLString, GraphQLNonNull } from 'graphql';

import CompanyType from '../types/CompanyType';

const companyQueries = {
    company: {
        type: CompanyType,
        args: { id: { type: new GraphQLNonNull(GraphQLString) } },
        resolve: async (
            parentValue: any,
            args: { id: string },
            context: any
        ) => {
            return await context.CompanyModel.findOne({
                id: args.id,
            });
        },
    },
};

export default companyQueries;
