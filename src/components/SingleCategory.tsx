import { NoteEditor } from './NoteEditor';
import { BaseCategoryEntry } from '../types';
import { useAppSelector } from '../hooks/useReduxTypes';
import { SingleNote } from './SingleNote';

interface Props {
  singleCategory: BaseCategoryEntry;
}

export const SingleCategory = ({ singleCategory }: Props) => {
  const editorActive = useAppSelector(({ editorActive }) => {
    return editorActive;
  });

  const sortedNotes = singleCategory.notes
    .slice()
    .sort((a, b) => a.unixTime - b.unixTime);

  console.log('single category has rendered');

  return (
    <>
      {sortedNotes.map(note =>
        <SingleNote
          note={note}
          key={note.id}
          singleCategory={singleCategory}
        />
      )}
      {editorActive && <NoteEditor singleCategory={singleCategory} />}
    </>
  );
};