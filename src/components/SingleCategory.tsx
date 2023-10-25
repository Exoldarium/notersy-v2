import { NoteEditor } from './NoteEditor';
import { BaseCategoryEntry } from '../types';
import { SingleNote } from './SingleNote';
import { useAppSelector } from '../hooks/useReduxTypes';

interface Props {
  singleCategory: BaseCategoryEntry;
}

export const SingleCategory = ({ singleCategory }: Props) => {
  const editorActive = useAppSelector(({ editorActive }) => {
    return editorActive;
  });
  const clickedNote = useAppSelector(({ clickedNote }) => {
    return clickedNote;
  });

  const sortedNotes = singleCategory.notes
    .slice()
    .sort((a, b) => a.unixTime - b.unixTime);

  console.log('single category has rendered');

  return (
    <>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {sortedNotes.map(note =>
          <SingleNote
            note={note}
            key={note.id}
            singleCategory={singleCategory}
            editable={clickedNote === note.id}
          />
        )}
      </ul>
      {editorActive && <NoteEditor singleCategory={singleCategory} />}
    </>
  );
};