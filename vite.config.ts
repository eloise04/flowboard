import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig(() => {
  const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
  const base = repositoryName ? `/${repositoryName}/` : '/'

  return {
    base,
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] })
    ],
    // Vitest config should be under 'test' key in a separate export or using 'vitest' property
    // See https://vitest.dev/config/
  }
})

export const test = {
  globals: true,
  environment: 'jsdom',
  setupFiles: './src/test/setup.ts',
  coverage: {
    provider: 'v8',
    reporter: ['text', 'json', 'html', 'lcov'],
    exclude: [
      'node_modules/',
      'src/test/',
      'dist/',
      '**/*.d.ts',
      '**/*.config.*'
    ]
  }
}
