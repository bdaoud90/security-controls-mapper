import { stringify } from 'csv-stringify/sync';
import { CoverageRow } from './types';

const formatCell = (values: string[]): string => (values.length ? values.join('; ') : '-');

export function renderCsv(frameworks: string[], rows: CoverageRow[]): string {
  const records = rows.map((row) => {
    const record: Record<string, string> = {
      'Control ID': row.id,
      'Control Name': row.name
    };
    frameworks.forEach((framework) => {
      record[framework] = formatCell(row.mappings[framework]);
    });
    return record;
  });
  return stringify(records, { header: true });
}

export function renderMarkdown(frameworks: string[], rows: CoverageRow[]): string {
  const headers = ['Control ID', 'Control Name', ...frameworks];
  const separator = headers.map(() => '---');
  const lines = [
    `| ${headers.join(' | ')} |`,
    `| ${separator.join(' | ')} |`
  ];
  rows.forEach((row) => {
    const cells = [row.id, row.name, ...frameworks.map((framework) => formatCell(row.mappings[framework]))];
    lines.push(`| ${cells.join(' | ')} |`);
  });
  return `${lines.join('\n')}\n`;
}
