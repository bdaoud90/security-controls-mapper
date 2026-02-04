import { MappingDictionary } from '../types';

export const defaultMappings: MappingDictionary = {
  SC-01: {
    'NIST CSF': ['ID.AM-1', 'ID.AM-2'],
    'CIS Controls': ['1.1', '1.2']
  },
  SC-02: {
    'NIST CSF': ['PR.AC-1', 'PR.AC-4'],
    'CIS Controls': ['5.1', '5.2']
  },
  SC-03: {
    'NIST CSF': ['DE.CM-1'],
    'CIS Controls': ['8.1']
  }
};
