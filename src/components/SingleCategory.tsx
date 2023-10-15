import NoteEditor from './NoteEditor';
import SingleNote from './SingleNote';

import { BaseCategoryEntry } from '../types';
import { useAppSelector } from '../hooks/useReduxTypes';

interface Props {
  singleCategory: BaseCategoryEntry;
}

const SingleCategory = ({ singleCategory }: Props) => {
  const editorActive = useAppSelector(({ editorActive }) => {
    return editorActive;
  });
  const editNote = useAppSelector(({ editNote }) => {
    return editNote;
  });

  // const editedNote = singleCategory.notes.find(note => note.edit);

  // if (!editedNote) return null;

  console.log('single category', singleCategory);

  return (
    <>
      {editorActive && <NoteEditor singleCategory={singleCategory} />}
      {editNote ?
        <NoteEditor singleCategory={singleCategory} /> :
        singleCategory.notes.map(note => (
          <SingleNote
            note={note}
            key={note.id}
            singleCategory={singleCategory}
          />
        ))
      }
    </>
  );
};

export default SingleCategory;