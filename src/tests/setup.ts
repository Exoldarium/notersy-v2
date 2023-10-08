import { beforeAll, vi } from 'vitest';

beforeAll(() => {
  const chromeMock = {
    storage: {
      sync: {
        get: vi.fn(),
        set: vi.fn(),
      }
    }
  };

  vi.stubGlobal('chrome', chromeMock);
});