import { graphqlHTTP } from 'express-graphql';
import Schema from '../graphql/schema';
import { UserModel, CompanyModel, SongModel, LyricModel } from '../models';

const graphqlController = graphqlHTTP({
    schema: Schema,
    graphiql: true,
    context: {
        UserModel,
        CompanyModel,
        SongModel,
        LyricModel,
    },
});

export default graphqlController;
