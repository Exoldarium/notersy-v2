export interface BaseNoteEntry {
  id: string;
  title: string;
  content: string;
  date: string;
}

export interface BaseCategoryEntry {
  id: string;
  title: string;
  notes: BaseNoteEntry[]
}

export type NewNoteEntry = Omit<BaseNoteEntry, 'id'>;
export type NewCategoryEntry = Omit<BaseCategoryEntry, 'id'>;
// export type Storage = typeof chrome.storage.sync;