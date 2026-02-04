export type Control = {
  id: string;
  name: string;
  description?: string;
};

export type MappingEntry = Record<string, string[]>;

export type MappingDictionary = Record<string, MappingEntry>;

export type ControlsInput = {
  controls: Control[];
};

export type MappingsInput = {
  mappings: MappingDictionary;
};

export type CoverageRow = {
  id: string;
  name: string;
  mappings: Record<string, string[]>;
};
