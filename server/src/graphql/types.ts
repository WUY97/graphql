import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt,
} from 'graphql';

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => {
        const CompanyType = require('./types').CompanyType;
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

export const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => {
        const UserType = require('./types').UserType;
        return {
            id: { type: new GraphQLNonNull(GraphQLID) },
            name: { type: GraphQLString },
            description: { type: GraphQLString },
            users: {
                type: new GraphQLList(UserType),
                resolve: async (parentValue: any, args, context) => {
                    return await context.UserModel.find({
                        companyId: parentValue.id,
                    });
                },
            },
        };
    },
});

export const SongType = new GraphQLObjectType({
    name: 'Song',
    fields: () => {
        const LyricType = require('./types').LyricType;
        return {
            title: { type: GraphQLString },
            artist: { type: GraphQLString },
            album: { type: GraphQLString },
            releasedDate: { type: GraphQLString },
            durationInSeconds: { type: GraphQLInt },
            lyrics: {
                type: new GraphQLList(LyricType),
                resolve: async (
                    parentValue: any,
                    args: { id: string },
                    context: any
                ) => {
                    return await context.LyricModel.find({
                        _id: { $in: parentValue.lyricsIds },
                    });
                },
            },
        };
    },
});

export const LyricType = new GraphQLObjectType({
    name: 'Lyric',
    fields: () => {
        const SongType = require('./types').SongType;
        return {
            text: { type: GraphQLString },
            timestamp: { type: GraphQLInt },
            song: {
                type: SongType,
                resolve: async (
                    parentValue: any,
                    args: { id: string },
                    context: any
                ) => {
                    return await context.SongModel.findOne({
                        _id: parentValue.songId,
                    });
                },
            },
        };
    },
});
