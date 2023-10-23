import { beforeAll, vi } from 'vitest';

// mock chrome methods
beforeAll(() => {
  const chromeMock = {
    storage: {
      sync: {
        get: vi.fn((keys: string) => {
          const result: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            [key: string]: any;
          } = [];

          result[keys] = 'testValue';

          return result;
        }),
        set: vi.fn(),
      }
    }
  };

  vi.stubGlobal('chrome', chromeMock);
});