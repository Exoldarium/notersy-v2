export interface BaseNoteEntry {
  id: number;
  title: string;
  content: string;
  date: string;
}

export interface BaseCategoryEntry {
  id: number;
  title: string;
  notes: BaseNoteEntry[]
}

// export type Storage = {
//   [key: string]: BaseCategoryEntry[]
// };

export type NewNoteEntry = Omit<BaseNoteEntry, 'id'>;
export type NewCategoryEntry = Omit<BaseCategoryEntry, 'id'>;
// export type Storage = typeof chrome.storage.sync;