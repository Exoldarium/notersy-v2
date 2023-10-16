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
  const editorOnNote = useAppSelector(({ editNote }) => {
    return editNote;
  });

  console.log('single category', singleCategory);

  return (
    <>
      {editorActive && <NoteEditor singleCategory={singleCategory} />}
      {editorOnNote ?
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