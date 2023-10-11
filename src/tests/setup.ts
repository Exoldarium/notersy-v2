import { beforeAll, vi } from 'vitest';

// mock chrome methods
beforeAll(() => {
  const chromeMock = {
    storage: {
      sync: {
        get: vi.fn((keys) => {
          const result: {
            [key: string]: string;
          } = {};
          result[keys] = 'testValue';

          return result;
        }),
        set: vi.fn(),
      }
    }
  };

  vi.stubGlobal('chrome', chromeMock);
});