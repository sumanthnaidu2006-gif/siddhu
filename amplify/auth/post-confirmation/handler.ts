import type { PostConfirmationTriggerHandler } from 'aws-lambda';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';
import { env } from '$amplify/env/post-confirmation';
import { type Schema } from '../../data/resource';

const { resourceConfig, getAmplifyAuthToken } = await getAmplifyDataClientConfig(env);

Amplify.configure(resourceConfig);

const client = generateClient<Schema>({
  authMode: 'iam',
  authToken: getAmplifyAuthToken,
});

export const handler: PostConfirmationTriggerHandler = async (event) => {
  await client.models.UserProfile.create({
    email: event.request.userAttributes.email,
    profileOwner: `${event.request.userAttributes.sub}::${event.userName}`,
  });
  return event;
};
