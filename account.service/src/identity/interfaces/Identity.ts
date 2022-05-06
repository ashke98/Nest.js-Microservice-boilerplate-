import { Document } from 'mongoose';

export interface Identity extends Document {
  readonly name: string;
  readonly username: number;
  readonly password: string;
} 