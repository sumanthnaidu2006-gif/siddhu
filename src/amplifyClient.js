import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';

let client = null;
let isConfigured = false;

try {
  const outputsModules = import.meta.glob('/amplify_outputs.json', { eager: true });
  const outputs = outputsModules['/amplify_outputs.json']?.default || outputsModules['/amplify_outputs.json'];

  if (outputs && outputs.data?.url) {
    Amplify.configure(outputs);
    client = generateClient();
    isConfigured = true;
    console.log('🚀 AWS Amplify successfully connected to live cloud backend!');
  } else {
    console.log('ℹ️ Running in Local Profiles mode. Connect to AWS to sync live.');
  }
} catch (err) {
  console.warn('Amplify local fallback mode active:', err);
}

export { client, isConfigured };
