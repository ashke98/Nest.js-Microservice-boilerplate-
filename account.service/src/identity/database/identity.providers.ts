import { Connection } from 'mongoose';
import { IdentitySchema } from './../schemas/identity.schema';

export const identityProviders = [
  {
    provide: 'IDENTITY_MODEL',
    useFactory: (connection: Connection) => connection.model('Identity', IdentitySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];