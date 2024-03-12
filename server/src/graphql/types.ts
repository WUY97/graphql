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
            id: { type: GraphQLID },
            title: { type: GraphQLString },
            lyrics: {
                type: new GraphQLList(LyricType),
                resolve: async (
                    parentValue: any,
                    args: { id: string },
                    context: any
                ) => {
                    return await context.SongModel.findLyrics(parentValue.id);
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
            id: { type: GraphQLID },
            likes: { type: GraphQLInt },
            content: { type: GraphQLString },
            song: {
                type: SongType,
                resolve: async (parentValue: any, args, context) => {
                    return await context.LyricModel.findById(parentValue)
                        .populate('song')
                        .then((lyric: any) => lyric.song);
                },
            },
        };
    },
});
