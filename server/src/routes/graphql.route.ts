import { Router } from 'express';
import { graphqlController } from '../controllers';

const router = Router();

router.use('/graphql', graphqlController);

export default router;
