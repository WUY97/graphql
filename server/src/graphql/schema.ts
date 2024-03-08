import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { userQueries, companyQueries } from './queries';

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        ...userQueries,
        ...companyQueries,
    },
});

export default new GraphQLSchema({ query: RootQuery });
