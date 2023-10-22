import { NoteEditor } from './NoteEditor';

import { BaseCategoryEntry } from '../types';
import { useAppSelector } from '../hooks/useReduxTypes';
import { SingleNote } from './SingleNote';

interface Props {
  singleCategory: BaseCategoryEntry;
}

export const SingleCategory = ({ singleCategory }: Props) => {
  const clickedNote = useAppSelector(({ clickedNote }) => {
    return clickedNote;
  });
  const editorActive = useAppSelector(({ editorActive }) => {
    return editorActive;
  });

  console.log('single category has rendered');

  return (
    <>
      {singleCategory.notes.map(note =>
        <SingleNote
          note={note}
          key={note.id}
          singleCategory={singleCategory}
          editable={clickedNote === note.id}
        />
      )}
      {editorActive && <NoteEditor singleCategory={singleCategory} />}
    </>
  );
};