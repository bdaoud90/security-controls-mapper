#!/usr/bin/env node
import { Command } from 'commander';
import path from 'path';
import { controlsInputSchema, mappingsInputSchema } from './schemas';
import { defaultMappings } from './mappings/default';
import { readYamlFile, writeFile } from './io';
import { buildCoverageRows, getFrameworks, mergeMappings } from './mapping';
import { renderCsv, renderMarkdown } from './output';
import { ControlsInput, MappingsInput } from './types';

const program = new Command();

program
  .name('security-controls-mapper')
  .description('Map internal security controls to illustrative framework references.')
  .version('0.1.0');

program
  .command('map')
  .description('Generate coverage matrix outputs from controls.yaml')
  .option('-i, --input <path>', 'Path to controls YAML file', 'controls.yaml')
  .option('-m, --mappings <path>', 'Optional YAML file with additional mappings')
  .option('-o, --output <dir>', 'Output directory', 'output')
  .action(async (options) => {
    const inputPath = path.resolve(options.input);
    const outputDir = path.resolve(options.output);

    const controlsRaw = await readYamlFile<ControlsInput>(inputPath);
    const controls = controlsInputSchema.parse(controlsRaw).controls;

    let userMappings: MappingsInput | undefined;
    if (options.mappings) {
      const mappingsRaw = await readYamlFile<MappingsInput>(path.resolve(options.mappings));
      userMappings = mappingsInputSchema.parse(mappingsRaw);
    }

    const mergedMappings = mergeMappings(defaultMappings, userMappings?.mappings);
    const frameworks = getFrameworks(mergedMappings);
    const rows = buildCoverageRows(controls, mergedMappings, frameworks);

    const csv = renderCsv(frameworks, rows);
    const markdown = renderMarkdown(frameworks, rows);

    await writeFile(path.join(outputDir, 'coverage.csv'), csv);
    await writeFile(path.join(outputDir, 'coverage.md'), markdown);

    // eslint-disable-next-line no-console
    console.log(`Wrote coverage outputs to ${outputDir}`);
  });

program.parseAsync(process.argv);
