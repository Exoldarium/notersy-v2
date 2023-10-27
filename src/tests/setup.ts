import { beforeAll, vi } from 'vitest';

// mock chrome methods
beforeAll(() => {
  const chromeMock = {
    storage: {
      local: {
        get: vi.fn((keys: string) => {
          const result: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            [key: string]: any;
          } = [];

          result[keys] = [
            {
              id: '123',
              active: true,
              title: 'New Category',
              dateAdded: 'Sat Oct 07 2023 18:36:08',
              unixTimeAdded: 1696749517,
              dateModified: 'Sat Oct 08 2023 18:36:08',
              unixTimeModified: 1696749520,
              notes: [
                {
                  id: '321',
                  title: 'New note',
                  dateAdded: 'Sat Oct 08 2023 18:36:08',
                  unixTimeAdded: 1696749515,
                  content: 'some content',
                  dateModified: 'Sat Oct 08 2023 18:36:08',
                  unixTimeModified: 1696749520,
                },
                {
                  id: '4321',
                  title: 'another note',
                  dateAdded: 'Sat Oct 09 2023 18:36:08',
                  unixTimeAdded: 1696749514,
                  content: 'some other content',
                  dateModified: 'Sat Oct 08 2023 18:36:08',
                  unixTimeModified: 1696749520,
                }
              ]
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