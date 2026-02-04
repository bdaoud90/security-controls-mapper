# Security Controls Mapper

## Overview
Security Controls Mapper is a lightweight CLI that maps internal security controls to illustrative references from common security frameworks. It ingests a YAML file of your internal controls and outputs a coverage matrix in CSV and Markdown formats for discussion, planning, and gap-analysis support. The mappings are examples, **not** authoritative compliance guidance.

## Supported frameworks
The built-in sample mappings include illustrative references for:
- NIST CSF
- CIS Controls

You can extend or adjust mappings by providing your own mapping file.

## Mapping logic
- Your internal controls are the source of truth.
- The tool merges built-in sample mappings with your optional custom mappings.
- For each internal control, it lists the mapped framework references.
- Output is a coverage matrix (one row per internal control, columns per framework).

## Input/output examples
### Input: `controls.yaml`
```yaml
controls:
  - id: SC-01
    name: Asset inventory is documented
    description: Maintain an up-to-date inventory of hardware and software assets.
  - id: SC-02
    name: Access provisioning is controlled
    description: Require approvals for user account creation and changes.
```

### Optional custom mapping file
```yaml
mappings:
  SC-02:
    NIST CSF:
      - PR.AC-6
```

### Command
```bash
npm run map -- --input examples/controls.yaml --mappings examples/mappings.yaml --output output
```

### Output: `output/coverage.csv`
```csv
Control ID,Control Name,NIST CSF,CIS Controls
SC-01,Asset inventory is documented,ID.AM-1; ID.AM-2,1.1; 1.2
SC-02,Access provisioning is controlled,PR.AC-1; PR.AC-4; PR.AC-6,5.1; 5.2
```

### Output: `output/coverage.md`
```md
| Control ID | Control Name | NIST CSF | CIS Controls |
| --- | --- | --- | --- |
| SC-01 | Asset inventory is documented | ID.AM-1; ID.AM-2 | 1.1; 1.2 |
| SC-02 | Access provisioning is controlled | PR.AC-1; PR.AC-4; PR.AC-6 | 5.1; 5.2 |
```

## Extension guidance
- Add or override mappings by providing a YAML file via `--mappings`.
- Use your own internal control IDs as keys.
- The tool merges arrays and removes duplicates.

## Limitations
- Framework references are illustrative only.
- No compliance claims or audit assertions are made.
- The output is intended for planning and communication, not certification.

## Ethical use
Use this tool to support transparent security planning and internal coordination. Do not represent the output as certified compliance or audit evidence.

## Development
### Requirements
- Node.js 20
- npm

### Install
```bash
npm install
```

### Build
```bash
npm run build
```

### Run
```bash
npm run map -- --input examples/controls.yaml --mappings examples/mappings.yaml --output output
```

### Test
```bash
npm test
```

### Lint
```bash
npm run lint
```
