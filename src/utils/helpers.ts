import { BaseCategoryEntry } from '../types';

const getDate = (): string => {
  const epoch = Date.now();
  const date = new Date(epoch).toString();

  return date.substring(0, 24);
};

// TODO: write tests for this
const setNoteEditPropertyToFalse = (category: BaseCategoryEntry): BaseCategoryEntry => {
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