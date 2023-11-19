import { NoteEditor } from './NoteEditor';
import { BaseCategoryEntry, Sorting } from '../types';
import { SingleNote } from './SingleNote';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { CategorySortingStyles, NoCategoriesStyles } from './styles/CategoryStyles';
import { setEditorActive } from '../reducers/editorActiveReducer';

interface Props {
  singleCategory: BaseCategoryEntry;
  sortNotes: Sorting;
  setSortNotes: React.Dispatch<React.SetStateAction<Sorting>>;
}

export const NoteList = ({ singleCategory, sortNotes, setSortNotes }: Props) => {
  const editorActive = useAppSelector(({ editorActive }) => {
    return editorActive;
  });
  const clickedNote = useAppSelector(({ clickedNote }) => {
    return clickedNote;
  });

  const dispatch = useAppDispatch();

  if (singleCategory.notes.length === 0 && !editorActive) {
    return (
      <NoCategoriesStyles>
        <p>Nothing here yet!</p>
        <p>Create a new note or select and add the text from the page!</p>
        <button
          type="button"
          onClick={() => dispatch(setEditorActive(true))}
        >
          Create
        </button>
      </NoCategoriesStyles>
    );
  } else {
    return (
      <>
        {sortNotes !== 'default' &&
          <CategorySortingStyles>
            <p style={{ fontSize: '13px', margin: '0.4rem 0 0 0.4rem' }}>
              {sortNotes === 'added' ?
                `Sorting by date ${sortNotes}` : `Sorting by last ${sortNotes}`
              }
            </p>
            <button
              type="button"
              onClick={() => setSortNotes('default')}
              data-testid="close-sorting"
            >
              x
            </button>
          </CategorySortingStyles>
        }
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
  }
};