import { GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';

import { SongType } from '../types';

const songQueries = {
    songs: {
        type: new GraphQLList(SongType),
        resolve: async (parentValue: any, args: any, context: any) => {
            return await context.SongModel.find({});
        },
    },
    song: {
        type: SongType,
        args: { id: { type: new GraphQLNonNull(GraphQLString) } },
        resolve: async (
            parentValue: any,
            args: { id: string },
            context: any
        ) => {
            return await context.SongModel.findById(args.id);
        },
    },
};

export default songQueries;
