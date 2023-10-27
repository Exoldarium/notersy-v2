export interface BaseNoteEntry {
  id: string;
  title?: string;
  content: string;
  dateAdded: string;
  dateModified: string;
  unixTimeModified: number;
  unixTimeAdded: number;
}

export interface BaseCategoryEntry {
  active: boolean;
  id: string;
  title: string;
  dateAdded: string;
  dateModified: string;
  unixTimeAdded: number;
  unixTimeModified: number;
  notes: BaseNoteEntry[];
}

export interface BaseStoredNoteContent {
  id: string;
  content: string;
}

export interface BaseStorageEntry {
  storedData: BaseCategoryEntry[];
}
export interface Message {
  type: string;
  content: string;
}

export interface Checked {
  id: string,
}
