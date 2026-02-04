import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';

export async function readYamlFile<T>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, 'utf8');
  return yaml.load(raw) as T;
}

export async function ensureDir(dirPath: string): Promise<void> {
  await fs.mkdir(dirPath, { recursive: true });
}

export async function writeFile(filePath: string, contents: string): Promise<void> {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, contents, 'utf8');
}
