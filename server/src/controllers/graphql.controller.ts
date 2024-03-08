import { graphqlHTTP } from 'express-graphql';
import Schema from '../graphql/schema';
import { UserModel, CompanyModel } from '../models';

const graphqlController = graphqlHTTP({
    schema: Schema,
    graphiql: true,
    context: {
        UserModel,
        CompanyModel,
    },
});

export default graphqlController;
