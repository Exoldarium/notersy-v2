import { beforeAll, vi } from 'vitest';

// mock chrome methods
beforeAll(() => {
  const chromeMock = {
    storage: {
      sync: {
        get: vi.fn((keys) => {
          const result: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            [key: string]: any;
          } = [];

          result[keys] = [
            {
              id: '123',
              active: true,
              title: 'New Category',
              date: 'Sat Oct 07 2023 18:36:08',
              unixTime: 1696749517,
              notes: []
            }
          ];

          return result;
        }),
        set: vi.fn(),
      }
    }
  };

  vi.stubGlobal('chrome', chromeMock);
});