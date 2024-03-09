import { GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';

import { SongType } from '../types';

const songQueries = {
    songs: {
        type: new GraphQLList(SongType),
        resolve: async (parentValue: any, args: any, context: any) => {
            return await context.SongModel.find({});
        },
    },
    songsByTitle: {
        type: new GraphQLList(SongType),
        args: { title: { type: new GraphQLNonNull(GraphQLString) } },
        resolve: async (parentValue: any, args: any, context: any) => {
            return await context.SongModel.find({ title: args.title });
        },
    },
};

export default songQueries;
