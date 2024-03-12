import { GraphQLNonNull, GraphQLID } from 'graphql';

import { LyricType } from '../types';

const lyricQueries = {
    lyric: {
        type: LyricType,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: async (
            parentValue: any,
            args: { id: string },
            context: any
        ) => {
            return await context.LyricModel.findById(args.id);
        },
    },
};

export default lyricQueries;
