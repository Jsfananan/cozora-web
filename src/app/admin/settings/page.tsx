'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [apiKey, setApiKey] = useState('***-***-***-****');
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving settings:', {
      emailNotifications,
    });
  };

  const handleRegenerateApiKey = () => {
    console.log('Regenerating API key');
    setShowApiKey(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold text-cz-text mb-2">
          Settings
        </h1>
        <p className="text-cz-text-muted">
          Manage admin panel configuration and API keys
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        <div className="bg-cz-bg-card border border-cz-border rounded-lg p-6 space-y-6">
          <div>
            <h2 className="text-lg font-display font-bold text-cz-text mb-4">
              Notifications
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-body text-cz-text">
                    Email Notifications
                  </label>
                  <p className="text-sm text-cz-text-muted mt-1">
                    Receive alerts on new purchases and system updates
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    emailNotifications ? 'bg-cz-teal' : 'bg-cz-text-dim'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-cz-bg transition-transform ${
                      emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-cz-border pt-6">
            <h2 className="text-lg font-display font-bold text-cz-text mb-4">
              API
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-mono text-cz-text-muted mb-2">
                  API Key
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-cz-bg border border-cz-border rounded-lg px-4 py-2 flex items-center">
                    <code className="text-sm text-cz-text font-mono">
                      {showApiKey ? apiKey : '***-***-***-****'}
                    </code>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="px-4 py-2 rounded-lg border border-cz-border hover:border-cz-teal text-cz-text-muted hover:text-cz-teal transition-colors text-sm"
                  >
                    {showApiKey ? 'Hide' : 'Show'}
                  </button>
                  <button
                    type="button"
                    onClick={handleRegenerateApiKey}
                    className="px-4 py-2 rounded-lg border border-cz-border hover:border-cz-coral text-cz-text-muted hover:text-cz-coral transition-colors text-sm"
                  >
                    Regenerate
                  </button>
                </div>
                <p className="text-xs text-cz-text-muted mt-2">
                  Use this key to authenticate API requests. Keep it secret.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-cz-border pt-6">
            <h2 className="text-lg font-display font-bold text-cz-text mb-4">
              Danger Zone
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-cz-coral/30 bg-cz-coral/5">
                <button
                  type="button"
                  className="text-sm px-4 py-2 rounded-lg border border-cz-coral text-cz-coral hover:bg-cz-coral/10 transition-colors"
                >
                  Clear All Cache
                </button>
                <p className="text-xs text-cz-text-muted mt-2">
                  Remove all cached bundle and session data. This action cannot be undone.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-3 bg-cz-accent hover:bg-cz-accent-hover text-cz-bg font-display font-semibold rounded-lg transition-colors"
          >
            Save Settings
          </button>
          <button
            type="button"
            className="px-6 py-3 border border-cz-border rounded-lg text-cz-text hover:border-cz-teal transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
