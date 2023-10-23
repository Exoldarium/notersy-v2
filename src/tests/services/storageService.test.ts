import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { getStorage, setStorage } from '../../services/storageService';

describe('Chrome Extension Storage', () => {
  const mockCategory = [
    {
      id: '123',
      active: true,
      title: 'New Category',
      date: 'Sat Oct 07 2023 18:36:08',
      unixTime: 1696749517,
      notes: [
        {
          id: '321',
          edit: false,
          title: 'New note',
          date: 'Sat Oct 08 2023 18:36:08',
          unixTime: 1696749515,
          content: 'some content'
        },
        {
          id: '4321',
          edit: false,
          title: 'another note',
          date: 'Sat Oct 09 2023 18:36:08',
          unixTime: 1696749514,
          content: 'some other content'
        }
      ]
    }
  ];

  beforeEach(() => {
    global.chrome = globalThis.chrome;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('chrome.storage.sync.set works with correct values', async () => {
    await setStorage('testKey', mockCategory);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(chrome.storage.sync.set).toHaveBeenCalledWith({ 'testKey': mockCategory });
  });

  test('chrome.storage.sync.get works with correct values', async () => {
    const mockRes = await chrome.storage.sync.get('testKey');
    const res = await getStorage('testKey');

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(chrome.storage.sync.get).toHaveBeenCalledWith('testKey');
    expect(res.testKey).toBe(mockRes.testKey);
  });
});