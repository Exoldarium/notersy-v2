export interface BaseNoteEntry {
  edit: boolean;
  id: string;
  title?: string;
  content: string;
  date: string;
  unixTime: number;
}

export interface BaseCategoryEntry {
  active: boolean;
  id: string;
  title: string;
  date: string;
  unixTime: number;
  notes: BaseNoteEntry[];
}

export interface BaseStoredNoteContent {
  id: string;
  content: string;
}

export interface BaseStorageEntry {
  storedData: BaseCategoryEntry[];
}

export interface StoredNoteContent {
  storedNoteContent: BaseStoredNoteContent;
}

export interface Message {
  type: string;
  content: string;
}

export interface Checked {
  id: string,
}
