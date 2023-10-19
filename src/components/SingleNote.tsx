import DOMPurify from 'dompurify';

import { SingleNoteStyles } from './styles/SingleNoteStyles';

import { BaseCategoryEntry, BaseNoteEntry } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { updateExistingNote } from '../reducers/categoryReducer';
import { parseToString } from '../utils/parseData';
import { addCheckedId, updateCheckedId } from '../reducers/checkboxReducer';
import { NoteEditor } from './NoteEditor';

// TODO:
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

  const noteToBeEdited = singleCategory.notes.find(note => note.edit);

  // sanitize note content before setting it to innerHTML
  const clean = DOMPurify.sanitize(note.content);
  const render = {
    __html: clean
  };

  const allowNoteEditOnClick = () => {
    const noteToEdit: BaseNoteEntry = {
      ...note,
      edit: true
    };

    void dispatch(updateExistingNote(categories, singleCategory, noteToEdit));
  };

  const setChecboxChecked = (e: React.MouseEvent<HTMLInputElement>) => {
    // the ids will be stored or filtered from the state depending if they are checked or not
    if (e.currentTarget.checked) {
      const checked = {
        id: parseToString(e.currentTarget.id)
      };

      dispatch(addCheckedId(checked));
    } else {
      dispatch(updateCheckedId(checkbox.filter(item => item.id !== e.currentTarget.id)));
    }
  };

  console.log(note, 'note');

  return (
    <>
      <SingleNoteStyles>
        {noteToBeEdited?.id === note.id ?
          <NoteEditor singleCategory={singleCategory} /> :
          <div dangerouslySetInnerHTML={render} />
        }
      </SingleNoteStyles>
      <button type="button" onClick={allowNoteEditOnClick}>Edit</button>
      <form>
        <input
          type="checkbox"
          id={note.id}
          name="checked"
          onClick={setChecboxChecked}
        />
      </form>
    </>
  );
};