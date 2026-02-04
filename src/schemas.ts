import { z } from 'zod';

export const controlSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional()
});

export const controlsInputSchema = z.object({
  controls: z.array(controlSchema).min(1)
});

const mappingEntrySchema = z.record(z.array(z.string().min(1)));

export const mappingsInputSchema = z.object({
  mappings: z.record(mappingEntrySchema)
});
