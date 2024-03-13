import { Router } from 'express';
import { graphqlController } from '../controllers';

const router = Router();

router.use('/api/graphql', graphqlController);

export default router;
