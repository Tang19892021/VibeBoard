import { VercelConfig } from '@vercel/config';

export const config: VercelConfig = {
  framework: 'nextjs',
  buildCommand: 'npm run build',
  outputDirectory: '.next',
  installCommand: 'npm install',
  envPrefix: 'NEXT_PUBLIC_',
};

export default config;
