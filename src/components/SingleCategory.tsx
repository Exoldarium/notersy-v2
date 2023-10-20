import { NoteEditor } from './NoteEditor';
import { SingleNote } from './SingleNote';

import { BaseCategoryEntry } from '../types';
import { useAppSelector } from '../hooks/useReduxTypes';

interface Props {
  singleCategory: BaseCategoryEntry;
}

export const SingleCategory = ({ singleCategory }: Props) => {
  const editorActive = useAppSelector(({ editorActive }) => {
    return editorActive;
  });

  const noteToBeEdited = singleCategory.notes.find(note => note.edit);
  const sortedNotes = singleCategory.notes
    .slice()
    .sort((a, b) => b.unixTime - a.unixTime);

  console.log('single category', singleCategory);

  return (
    <>
      {editorActive && !noteToBeEdited && <NoteEditor singleCategory={singleCategory} />}
      {sortedNotes.map(note =>
        <SingleNote
          note={note}
          key={note.id}
          singleCategory={singleCategory}
        />
      )}
    </>
  );
};