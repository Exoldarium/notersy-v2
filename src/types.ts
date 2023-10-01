export interface BaseNoteEntry {
  id: string;
  title: string;
  content: string;
  date: string;
}

export interface BaseCategoryEntry {
  id: string;
  title: string;
  notes: BaseNoteEntry[];
}

export interface BaseStorageEntry {
  storedData: BaseCategoryEntry[];
}

export type NewNoteEntry = Omit<BaseNoteEntry, 'id'>;
export type NewCategoryEntry = Omit<BaseCategoryEntry, 'id'>;