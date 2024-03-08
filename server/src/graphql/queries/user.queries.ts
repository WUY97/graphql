import { GraphQLString, GraphQLNonNull } from 'graphql';

import { UserType } from '../types';

const userQueries = {
    user: {
        type: UserType,
        args: { id: { type: new GraphQLNonNull(GraphQLString) } },
        resolve: async (
            parentValue: any,
            args: { id: string },
            context: any
        ) => {
            return await context.UserModel.findOne({
                id: args.id,
            });
        },
    },
};

export default userQueries;
