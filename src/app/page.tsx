'use client';

import { useState } from 'react';

export default function Home() {
  const [emails, setEmails] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emails, message }),
    });

    const data = await res.json();

    if (res.ok) {
      setStatus('Messages queued!');
      setEmails('');
      setMessage('');
    } else {
      setStatus(`Error: ${data.error}`);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Send Newsletter</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md">
        <textarea
          className="border p-2 rounded"
          placeholder="Emails (comma or newline separated)"
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          rows={4}
        />
        <textarea
          className="border p-2 rounded"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
        />
        <button className="bg-blue-600 text-white p-2 rounded" type="submit">
          Send
        </button>
        {status && <p>{status}</p>}
      </form>
    </main>
  );
}
