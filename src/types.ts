export interface BaseNoteEntry {
  id: string;
  title?: string;
  content: string;
  dateAdded: string;
  dateModified: string;
  unixTimeModified: number;
  unixTimeAdded: number;
  url: string;
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

export type Sorting = "default" | "added" | "modified";
