import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import { UserSchema } from './schemas';

const app = express();

app.use(
    '/graphql',
    graphqlHTTP({
        schema: UserSchema,
        graphiql: true,
    })
);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
