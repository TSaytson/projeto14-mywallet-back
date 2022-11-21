import { Router } from 'express';
import { singIn, singUp } from '../controllers/users.controller.js';
import { signUpValidation, signInValidation } from '../middlewares/usersValidation.js';

const router = Router();

router.post('/sign-up', signUpValidation, singUp);
router.post('/sign-in', signInValidation, singIn);

export default router;