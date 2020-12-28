import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';

import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { Password } from '../services/password';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password must be valid'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid Credentials');
    }
    const passwordMatch = await Password.compare(
      existingUser!.password,
      password
    );
    if (!passwordMatch) {
      throw new BadRequestError('Invalid Credentials');
    }
    // generate json web token and store on session object
    const userJWT = jwt.sign(
      {
        id: existingUser!.id,
        email: existingUser!.email,
      },
      process.env.JWT_KEY! // ! says we have already checked rthis key and we know this exist
    );
    req.session = {
      jwt: userJWT,
    };
    res.status(200).send(existingUser);
  }
);

export { router as signInRouter };
