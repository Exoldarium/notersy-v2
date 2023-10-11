export interface BaseNoteEntry {
  active: boolean;
  id: string;
  title: string;
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