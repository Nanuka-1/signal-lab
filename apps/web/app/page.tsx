'use client';

import { useState } from 'react';

type ScenarioType = 'test_scenario' | 'slow_success' | 'system_error';

export default function Home() {
  const [scenario, setScenario] = useState<ScenarioType>('test_scenario');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runScenario = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('http://localhost:3000/scenarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: scenario }),
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      setResult({ error: String(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f5f7fb',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        <h1 style={{ marginBottom: '24px' }}>Signal Lab UI</h1>

        <div
          style={{
            background: '#ffffff',
            border: '1px solid #d9e0ea',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
          }}
        >
          <h2 style={{ marginTop: 0 }}>Run Scenario</h2>

          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="scenario-select" style={{ display: 'block', marginBottom: '8px' }}>
              Scenario
            </label>

            <select
              id="scenario-select"
              value={scenario}
              onChange={(e) => setScenario(e.target.value as ScenarioType)}
              style={{
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #c7d2e0',
                minWidth: '240px',
              }}
            >
              <option value="test_scenario">test_scenario</option>
              <option value="slow_success">slow_success</option>
              <option value="system_error">system_error</option>
            </select>
          </div>

          <button
            onClick={runScenario}
            disabled={loading}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: loading ? '#94a3b8' : '#2563eb',
              color: '#ffffff',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Running...' : 'Run Scenario'}
          </button>
        </div>

        <div
          style={{
            background: '#ffffff',
            border: '1px solid #d9e0ea',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
          }}
        >
          <h2 style={{ marginTop: 0 }}>Run Result</h2>

          {!result && !loading && (
            <p style={{ color: '#64748b' }}>No scenario has been executed yet.</p>
          )}

          {loading && <p>Running scenario...</p>}

          {result && (
            <pre
              style={{
                background: '#0f172a',
                color: '#e2e8f0',
                padding: '16px',
                borderRadius: '8px',
                overflowX: 'auto',
              }}
            >
              {JSON.stringify(result, null, 2)}
            </pre>
          )}
        </div>

        <div
          style={{
            background: '#ffffff',
            border: '1px solid #d9e0ea',
            borderRadius: '12px',
            padding: '24px',
          }}
        >
          <h2 style={{ marginTop: 0 }}>Observability Links</h2>

          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>
              <a href="http://localhost:3000/metrics" target="_blank" rel="noreferrer">
                Metrics
              </a>
            </li>
            <li>
              <a href="http://localhost:3002" target="_blank" rel="noreferrer">
                Grafana
              </a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}