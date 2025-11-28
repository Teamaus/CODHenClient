export type Stock = { symbol: string; url: string; note: string; checked: boolean };
export type SectionModel =
  | { title: string; kind: 'stocks'; stocks: Stock[] }
  | { title: string; kind: 'html'; bodyMd: string };

export function parseMarkdown(md: string): { pageTitle: string; sections: SectionModel[] } {
  const lines = md.split(/\r?\n/);

  let pageTitle = '';
  let currentTitle: string | null = null;
  let currentBody: string[] = [];
  const sections: { title: string; bodyMd: string }[] = [];

  const flush = () => {
    if (currentTitle) {
      sections.push({ title: currentTitle, bodyMd: currentBody.join('\n') });
      currentTitle = null;
      currentBody = [];
    }
  };

  for (const raw of lines) {
    const line = raw.replace(/\s+$/, ''); // trim right

    // H1 becomes page title
    const h1 = line.match(/^#\s+(.*)$/);
    if (h1 && !pageTitle && !currentTitle && currentBody.length === 0) {
      pageTitle = h1[1].trim();
      continue;
    }

    // H2 starts a new section
    const h2 = line.match(/^##\s+(.*)$/);
    if (h2) {
      flush();
      currentTitle = '## ' + h2[1].trim();
      continue;
    }

    if (currentTitle) currentBody.push(line);
  }
  flush();

  // Parse stock bullets
  const stockRe = /^\s*-\s*\[([A-Z0-9.\-]+)\]\((https?:\/\/[^\)]+)\)\s*[\u2013-]\s*(.*)$/;

  const out: SectionModel[] = sections.map(sec => {
    const stocks: Stock[] = [];
    for (const line of sec.bodyMd.split(/\r?\n/)) {
      const m = line.match(stockRe);
      if (m) {
        stocks.push({
          symbol: m[1],
          url: m[2],
          note: (m[3] || '').trim(),
          checked: false
        });
      }
    }
    return stocks.length
      ? { title: sec.title, kind: 'stocks', stocks }
      : { title: sec.title, kind: 'html', bodyMd: sec.bodyMd };
  });

  return { pageTitle, sections: out };
}
