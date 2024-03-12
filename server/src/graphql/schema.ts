import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import {
    userQueries,
    companyQueries,
    songQueries,
    lyricQueries,
} from './queries';
import { userMutations, songMutations, lyricMutations } from './mutations';

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        ...userQueries,
        ...companyQueries,
        ...songQueries,
        ...lyricQueries,
    },
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...userMutations,
        ...songMutations,
        ...lyricMutations,
    },
});

export default new GraphQLSchema({ query: RootQuery, mutation: Mutation });
