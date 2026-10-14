import React from 'react';

export default function Toast({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type || 'info'}`}>
          <span className="toast-icon">
            {toast.type === 'success' && '✅'}
            {toast.type === 'danger' && '🗑️'}
            {toast.type === 'info' && '✨'}
          </span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
