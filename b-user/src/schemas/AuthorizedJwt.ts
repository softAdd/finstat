import { Schema, Document } from 'mongoose';
import { GetEntity } from './types';

export interface IAuthorizedJwt extends Document {
  name: string;
  token: string;
  refreshToken: string;
}

export type AuthorizedJwtType = GetEntity<IAuthorizedJwt>;

export const authorizedJwtSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
});
