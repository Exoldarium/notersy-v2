import { BaseCategoryEntry } from '../types';

const getDate = () => {
  const epoch = Date.now();
  const date = new Date(epoch).toString();

  return date.substring(0, 24);
};

const setNoteEditPropertyToFalse = (category: BaseCategoryEntry) => {
  const setNotesToFalse = category.notes.map(note => {
    return {
      ...note,
      edit: false,
    };
  });

  const categoryWithUpdatedNotes = {
    ...category,
    notes: setNotesToFalse
  };

  return categoryWithUpdatedNotes;
};

export {
  getDate,
  setNoteEditPropertyToFalse
};