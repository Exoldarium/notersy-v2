import DOMPurify from 'dompurify';

import { SingleNoteStyles } from './styles/SingleNoteStyles';

import { BaseCategoryEntry, BaseNoteEntry } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { updateExistingNote } from '../reducers/categoryReducer';
import { setEditorActive } from '../reducers/editorActiveReducer';
import { setEditorOnNote } from '../reducers/editorOnNoteReducer';

// TODO:
// clicking edit button should bring the note editor to that note
// edited note should be automatically saved either when user clicks save or when the user clicks some other element

interface Props {
  note: BaseNoteEntry;
  singleCategory: BaseCategoryEntry;
}

export const SingleNote = ({ note, singleCategory }: Props) => {
  const categories = useAppSelector(({ categories }) => {
    return categories;
  });
  const dispatch = useAppDispatch();

  // sanitize note content before setting it to innerHTML
  const clean = DOMPurify.sanitize(note.content);
  const render = {
    __html: clean
  };

  const editNoteOnClick = () => {
    const noteToEdit: BaseNoteEntry = {
      ...note,
      edit: true
    };

    void dispatch(updateExistingNote(categories, singleCategory, noteToEdit));
    dispatch(setEditorActive(false)); // close the editor that's used for adding new notes, if it's open
    dispatch(setEditorOnNote(true));
  };

  console.log(note, 'note');

  return (
    <SingleNoteStyles>
      <div dangerouslySetInnerHTML={render} />
      <button type="button" onClick={editNoteOnClick}>Edit</button>
    </SingleNoteStyles>
  );
};