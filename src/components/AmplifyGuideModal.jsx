import React from 'react';

export default function AmplifyGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="amplify-guide-title">
      <div className="modal-content animate-scale-in" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close guide"
        >
          ✕
        </button>

        <div className="modal-cover" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', height: '80px' }} />

        <div style={{ padding: '24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{ fontSize: '24px' }}>⚡</span>
            <h2 id="amplify-guide-title" style={{ fontSize: '20px', fontWeight: 800 }}>
              AWS Amplify Gen 2 Integration Guide
            </h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>
            Your <strong>profilesapp</strong> is currently operating in rich interactive local state. When you are ready to link Amazon DynamoDB and AWS Cognito via Amplify Gen 2, follow these steps:
          </p>

          <h3 style={{ fontSize: '14px', fontWeight: 700, marginTop: '16px', color: 'var(--text-main)' }}>
            1. Define Data Model in <code>amplify/data/resource.ts</code>
          </h3>
          <div className="guide-code-box">
{`import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  UserProfile: a
    .model({
      email: a.string().required(),
      name: a.string(),
      role: a.string(),
      department: a.string(),
      status: a.string(),
      location: a.string(),
      bio: a.string(),
      avatar: a.string(),
    })
    .authorization((allow) => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});`}
          </div>

          <h3 style={{ fontSize: '14px', fontWeight: 700, marginTop: '16px', color: 'var(--text-main)' }}>
            2. Launch Amplify Gen 2 Cloud Sandbox
          </h3>
          <div className="guide-code-box">
{`# In your terminal:
npx ampx sandbox`}
          </div>

          <h3 style={{ fontSize: '14px', fontWeight: 700, marginTop: '16px', color: 'var(--text-main)' }}>
            3. Install Amplify UI Libraries (Optional for Auth)
          </h3>
          <div className="guide-code-box">
{`npm install aws-amplify @aws-amplify/ui-react`}
          </div>

          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" onClick={onClose}>
              Got It, Continue to App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
