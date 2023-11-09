import { NoteEditor } from './NoteEditor';
import { BaseCategoryEntry, Sorting } from '../types';
import { SingleNote } from './SingleNote';
import { useAppSelector } from '../hooks/useReduxTypes';

interface Props {
  singleCategory: BaseCategoryEntry;
  sortNotes: Sorting;
}

export const SingleCategory = ({ singleCategory, sortNotes }: Props) => {
  const editorActive = useAppSelector(({ editorActive }) => {
    return editorActive;
  });
  const clickedNote = useAppSelector(({ clickedNote }) => {
    return clickedNote;
  });

  console.log('single category has rendered');

  return (
    <>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {((): JSX.Element[] => {
          switch (sortNotes) {
            case 'added':
              const sortByDateAdded = singleCategory.notes
                .slice()
                .sort((a, b) => b.unixTimeAdded - a.unixTimeAdded);

              return sortByDateAdded.map((note) => (
                <SingleNote
                  note={note}
                  key={note.id}
                  singleCategory={singleCategory}
                  editable={clickedNote === note.id}
                />
              ));
            case 'modified':
              const sortByDateModified = singleCategory.notes
                .slice()
                .sort((a, b) => b.unixTimeModified - a.unixTimeModified);

              return sortByDateModified.map((note) => (
                <SingleNote
                  note={note}
                  key={note.id}
                  singleCategory={singleCategory}
                  editable={clickedNote === note.id}
                />
              ));
            default:
              const sortMostRecentLast = singleCategory.notes
                .slice()
                .sort((a, b) => a.unixTimeAdded - b.unixTimeAdded);

              return sortMostRecentLast.map(note =>
                <SingleNote
                  note={note}
                  key={note.id}
                  singleCategory={singleCategory}
                  editable={clickedNote === note.id}
                />
              );
          }
        })()}
      </ul>
      {editorActive && <NoteEditor singleCategory={singleCategory} />}
    </>
  );
};