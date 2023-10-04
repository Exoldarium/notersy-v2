export interface BaseNoteEntry {
  active: boolean;
  id: string;
  title: string;
  content: string;
  date: string;
}

export interface BaseCategoryEntry {
  active: boolean;
  id: string;
  title: string;
  date: string;
  notes: BaseNoteEntry[];
}

export interface BaseStorageEntry {
  storedData: BaseCategoryEntry[];
}

export interface Message {
  type: string;
  content: string;
}