import DOMPurify from 'dompurify';

import { SingleNoteStyles } from './styles/SingleNoteStyles';

import { BaseCategoryEntry, BaseNoteEntry } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { updateExistingNote } from '../reducers/categoryReducer';
import { setEditorActive } from '../reducers/editorActiveReducer';
import { setEditorOnNote } from '../reducers/editorOnNoteReducer';
import { parseToString } from '../utils/parseData';
import { addChecked, updateChecked } from '../reducers/checkboxReducer';

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
  const checkbox = useAppSelector(({ checkbox }) => {
    return checkbox;
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

  // TODO
  // try to extract this function because it's used twice
  const setChecboxChecked = (e: React.MouseEvent<HTMLInputElement>) => {
    // the ids will be stored or filtered from the state depending if they are checked or not
    if (e.currentTarget.checked) {
      const checked = {
        id: parseToString(e.currentTarget.id)
      };

      dispatch(addChecked(checked));
    } else {
      dispatch(updateChecked(checkbox.filter(item => item.id !== e.currentTarget.id)));
    }
  };

  console.log(note, 'note');

  return (
    <SingleNoteStyles>
      <div dangerouslySetInnerHTML={render} />
      <button type="button" onClick={editNoteOnClick}>Edit</button>
      <form>
        <input
          type="checkbox"
          id={note.id}
          name="checked"
          onClick={setChecboxChecked}
        />
      </form>
    </SingleNoteStyles>
  );
};