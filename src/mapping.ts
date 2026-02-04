import { Control, CoverageRow, MappingDictionary } from './types';

const unique = (values: string[]): string[] => Array.from(new Set(values));

export function mergeMappings(base: MappingDictionary, extra?: MappingDictionary): MappingDictionary {
  if (!extra) {
    return { ...base };
  }
  const merged: MappingDictionary = { ...base };
  for (const [controlId, frameworks] of Object.entries(extra)) {
    merged[controlId] = merged[controlId] ?? {};
    for (const [framework, entries] of Object.entries(frameworks)) {
      const existing = merged[controlId][framework] ?? [];
      merged[controlId][framework] = unique([...existing, ...entries]);
    }
  }
  return merged;
}

export function getFrameworks(mappings: MappingDictionary): string[] {
  const frameworks = new Set<string>();
  Object.values(mappings).forEach((entry) => {
    Object.keys(entry).forEach((framework) => frameworks.add(framework));
  });
  return Array.from(frameworks).sort();
}

export function buildCoverageRows(
  controls: Control[],
  mappings: MappingDictionary,
  frameworks: string[]
): CoverageRow[] {
  return controls.map((control) => {
    const mapping = mappings[control.id] ?? {};
    const rowMappings: Record<string, string[]> = {};
    frameworks.forEach((framework) => {
      rowMappings[framework] = mapping[framework] ?? [];
    });
    return {
      id: control.id,
      name: control.name,
      mappings: rowMappings
    };
  });
}
