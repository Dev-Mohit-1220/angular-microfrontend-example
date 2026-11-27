import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@shopsphere/contracts': new URL('./libs/contracts/src/public-api.ts', import.meta.url).pathname,
    },
  },
  test: {
    environment: 'jsdom',
    include: ['libs/**/*.spec.ts'],
    clearMocks: true,
    restoreMocks: true,
  },
});
