import { v4 as uuidv4 } from 'uuid';
import { setStorage } from "./services/storageService";
import { BaseCategoryEntry, BaseNoteEntry } from "./types";
import { getDate } from "./utils/helpers";
import { parseStorage, parseToString } from "./utils/parseData";
import { toNewCategoryEntry, toNewNoteEntry } from "./utils/parseStorageEntry";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    "title": "Notersy",
    "contexts": ["selection"],
    "id": "menuItemId",
  });
  chrome.contextMenus.create({
    "title": "Add a new note",
    "contexts": ["selection"],
    "parentId": "menuItemId",
    "id": "addNoteId"
  });
});

chrome.contextMenus.onClicked.addListener((text) => {
  void (async () => {
    const { storedData } = await parseStorage('storedData');
    const findActiveCategory = storedData.find(category => category.active);
    const newNoteEntry: BaseNoteEntry = {
      id: uuidv4(),
      title: 'New Category',
      dateAdded: getDate(),
      unixTimeAdded: Date.now(),
      dateModified: getDate(),
      unixTimeModified: Date.now(),
      content: parseToString(text.selectionText),
    };

    if (!findActiveCategory) {
      const newCategoryEntry: BaseCategoryEntry = {
        id: uuidv4(),
        active: true,
        title: 'New Category',
        dateAdded: getDate(),
        unixTimeAdded: Date.now(),
        dateModified: getDate(),
        unixTimeModified: Date.now(),
        notes: [newNoteEntry],
      };
      const parsedCategoryEntry = toNewCategoryEntry(newCategoryEntry);

      void setStorage('storedData', storedData.concat(parsedCategoryEntry));
    } else {
      const parsedNoteEntry = toNewNoteEntry(newNoteEntry);

      // add a new note to the notes array and create an updated category
      const notes = findActiveCategory.notes.concat(parsedNoteEntry);
      const categoryWithNotes: BaseCategoryEntry = {
        ...findActiveCategory,
        notes,
      };

      // filter the category that we are updating with a new note
      const updatedCategories = storedData.filter(category => category.id !== categoryWithNotes.id);

      void setStorage('storedData', updatedCategories.concat(categoryWithNotes));
    }
  })();
});