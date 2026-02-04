import { mergeMappings, getFrameworks, buildCoverageRows } from '../src/mapping';
import { renderCsv, renderMarkdown } from '../src/output';
import { MappingDictionary } from '../src/types';

describe('mapping utilities', () => {
  it('merges mappings and removes duplicates', () => {
    const base: MappingDictionary = {
      SC-01: { 'NIST CSF': ['ID.AM-1'] }
    };
    const extra: MappingDictionary = {
      SC-01: { 'NIST CSF': ['ID.AM-1', 'ID.AM-2'] },
      SC-02: { 'CIS Controls': ['1.1'] }
    };

    const merged = mergeMappings(base, extra);
    expect(merged.SC-01['NIST CSF']).toEqual(['ID.AM-1', 'ID.AM-2']);
    expect(merged.SC-02['CIS Controls']).toEqual(['1.1']);
  });

  it('renders coverage outputs', () => {
    const mappings: MappingDictionary = {
      SC-01: { 'NIST CSF': ['ID.AM-1'], 'CIS Controls': ['1.1'] }
    };
    const frameworks = getFrameworks(mappings);
    const rows = buildCoverageRows(
      [{ id: 'SC-01', name: 'Asset inventory' }],
      mappings,
      frameworks
    );

    const csv = renderCsv(frameworks, rows);
    const markdown = renderMarkdown(frameworks, rows);

    expect(csv).toContain('Control ID');
    expect(csv).toContain('ID.AM-1');
    expect(markdown).toContain('| SC-01 | Asset inventory |');
  });
});
