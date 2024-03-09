import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { userQueries, companyQueries, songQueries } from './queries';
import { userMutations } from './mutations';

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        ...userQueries,
        ...companyQueries,
        ...songQueries,
    },
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...userMutations,
        // ...companyMutations,
    },
});

export default new GraphQLSchema({ query: RootQuery, mutation: Mutation });
