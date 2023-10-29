import { NoteEditor } from './NoteEditor';
import { BaseCategoryEntry } from '../types';
import { SingleNote } from './SingleNote';
import { useAppSelector } from '../hooks/useReduxTypes';

interface Props {
  singleCategory: BaseCategoryEntry;
  sortNotes: string;
}

export const SingleCategory = ({ singleCategory, sortNotes }: Props) => {
  const editorActive = useAppSelector(({ editorActive }) => {
    return editorActive;
  });
  const clickedNote = useAppSelector(({ clickedNote }) => {
    return clickedNote;
  });

  const sortByDateAdded = singleCategory.notes.slice().sort((a, b) => b.unixTimeAdded - a.unixTimeAdded);
  const sortByDateModified = singleCategory.notes.slice().sort((a, b) => b.unixTimeModified - a.unixTimeModified);
  const sortMostRecentLast = singleCategory.notes.slice().sort((a, b) => a.unixTimeAdded - b.unixTimeAdded);

  const renderSortedNotes = () => {
    switch (sortNotes) {
      case 'dateAdded':
        return sortByDateAdded.map((note) => (
          <SingleNote
            note={note}
            key={note.id}
            singleCategory={singleCategory}
            editable={clickedNote === note.id}
          />
        ));
      case 'dateModified':
        return sortByDateModified.map((note) => (
          <SingleNote
            note={note}
            key={note.id}
            singleCategory={singleCategory}
            editable={clickedNote === note.id}
          />
        ));
      default:
        return sortMostRecentLast.map(note =>
          <SingleNote
            note={note}
            key={note.id}
            singleCategory={singleCategory}
            editable={clickedNote === note.id}
          />
        );
    }
  };

  console.log('single category has rendered');

  return (
    <>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {renderSortedNotes()}
      </ul>
      {editorActive && <NoteEditor singleCategory={singleCategory} />}
    </>
  );
};