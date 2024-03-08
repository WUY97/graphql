import { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';
import { UserType } from '../types';
import { randomUUID } from 'crypto';

const userMutations = {
    addUser: {
        type: UserType,
        args: {
            firstName: { type: new GraphQLNonNull(GraphQLString) },
            age: { type: new GraphQLNonNull(GraphQLInt) },
            companyId: { type: GraphQLString },
        },
        resolve: async (
            parentValue: any,
            args: { firstName: string; age: string; companyId: string },
            context: any
        ) => {
            const user = new context.UserModel({
                id: randomUUID(),
                firstName: args.firstName,
                age: args.age,
                companyId: args.companyId,
            });
            return await user.save();
        },
    },
    deleteUser: {
        type: UserType,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: async (
            parentValue: any,
            args: { id: string },
            context: any
        ) => {
            return await context.UserModel.findOneAndDelete({
                id: args.id,
            });
        },
    },
    editUser: {
        type: UserType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
            firstName: { type: GraphQLString },
            age: { type: GraphQLInt },
            companyId: { type: GraphQLString },
        },
        resolve: async (
            parentValue: any,
            args: {
                id: string;
                firstName?: string;
                age?: string;
                companyId?: string;
            },
            context: any
        ) => {
            const update = Object.fromEntries(
                Object.entries(args).filter(([k, v]) => k != 'id' && v != null)
            );
            if (Object.keys(update).length === 0) {
                throw new Error('No fields to update');
            }

            return await context.UserModel.findOneAndUpdate(
                { id: args.id },
                update,
                { new: true }
            );
        },
    },
};

export default userMutations;
