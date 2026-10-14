import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { postConfirmation } from '../auth/post-confirmation/resource';

const schema = a
  .schema({
    UserProfile: a
      .model({
        email: a.string(),
        profileOwner: a.string(),
        name: a.string(),
        role: a.string(),
        department: a.string(),
        status: a.string(),
        location: a.string(),
        phone: a.string(),
        timezone: a.string(),
        bio: a.string(),
        avatar: a.string(),
        skills: a.string().array(),
        isFavorite: a.boolean(),
      })
      .authorization((allow) => [
        allow.ownerDefinedIn('profileOwner'),
      ]),
  })
  .authorization((allow) => [
    allow.resource(postConfirmation),
  ]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
