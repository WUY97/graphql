import { GraphQLID } from 'graphql';
import { LyricType } from '../types';

const lyricMutations = {
    likeLyric: {
        type: LyricType,
        args: { id: { type: GraphQLID } },
        resolve: async (
            parentValue: any,
            args: { id: string },
            context: any
        ) => {
            return await context.LyricModel.like(args.id);
        },
    },
};

export default lyricMutations;
