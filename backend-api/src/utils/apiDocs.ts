export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface Route {
  method: HttpMethod;
  path: string;
}

const METHOD_COLOR: Record<HttpMethod, string> = {
  GET: '#22c55e',
  POST: '#3b82f6',
  PUT: '#f59e0b',
  PATCH: '#f97316',
  DELETE: '#ef4444',
};

export function generateDocsHTML(title: string, routes: Route[]): string {
  const rows = routes.map(r => `
    <tr>
      <td><span class="badge" style="background:${METHOD_COLOR[r.method]}">${r.method}</span></td>
      <td><code>${r.path}</code></td>
      <td><span class="active">● active</span></td>
    </tr>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0f172a; color: #e2e8f0; }
    header { padding: 2rem; border-bottom: 1px solid #1e3a5f; }
    header h1 { font-size: 1.5rem; font-weight: 700; }
    main { max-width: 900px; margin: 2rem auto; padding: 0 1.5rem 4rem; }
    table { width: 100%; border-collapse: collapse; background: #1e293b; border-radius: .75rem; overflow: hidden; border: 1px solid #1e3a5f; }
    th { text-align: left; padding: .6rem 1rem; font-size: .7rem; text-transform: uppercase; letter-spacing: .08em; color: #64748b; background: #0f172a; }
    td { padding: .65rem 1rem; border-top: 1px solid #1e3a5f; font-size: .875rem; }
    tr:hover td { background: #263346; }
    code { font-family: monospace; font-size: .8rem; color: #e2e8f0; }
    .badge { display: inline-block; padding: .15rem .5rem; border-radius: .3rem; font-size: .7rem; font-weight: 700; color: #fff; }
    .active { font-size: .8rem; color: #22c55e; }
  </style>
</head>
<body>
  <header><h1>${title}</h1></header>
  <main>
    <table>
      <thead><tr><th>Method</th><th>Path</th><th>Status</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </main>
</body>
</html>`;
}
