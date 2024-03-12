import { GraphQLID, GraphQLString } from 'graphql';
import { SongType } from '../types';

const lyricMutations = {
    addSong: {
        type: SongType,
        args: { title: { type: GraphQLString } },
        resolve: async (
            parentValue: any,
            args: { title: string },
            context: any
        ) => {
            return await new context.SongModel({ title: args.title }).save();
        },
    },
    addLyricToSong: {
        type: SongType,
        args: {
            content: { type: GraphQLString },
            songId: { type: GraphQLID },
        },
        resolve: async (
            parentValue: any,
            args: { content: string; songId: string },
            context: any
        ) => {
            const song = await context.SongModel.findById(args.songId);
            song.lyrics.push({ content: args.content });
            return await song.save();
        },
    },
    deleteSong: {
        type: SongType,
        args: { id: { type: GraphQLID } },
        resolve: async (
            parentValue: any,
            args: { id: string },
            context: any
        ) => {
            return await context.SongModel.findByIdAndDelete(args.id);
        },
    },
};

export default lyricMutations;
