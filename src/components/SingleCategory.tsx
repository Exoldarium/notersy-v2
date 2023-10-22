import { NoteEditor } from './NoteEditor';

import { BaseCategoryEntry } from '../types';
import { useAppSelector } from '../hooks/useReduxTypes';
import { useState } from 'react';
import { SingleNote } from './SingleNote';

interface Props {
  singleCategory: BaseCategoryEntry;
}

export const SingleCategory = ({ singleCategory }: Props) => {
  const [clicked, setIsClicked] = useState('');  // track which of the notes is clicked
  const editorActive = useAppSelector(({ editorActive }) => {
    return editorActive;
  });

  const sortedNotes = singleCategory.notes
    .slice()
    .sort((a, b) => b.unixTime - a.unixTime);

  console.log('single category has rendered');

  return (
    <>
      {editorActive && <NoteEditor singleCategory={singleCategory} />}
      {sortedNotes.map(note =>
        <SingleNote
          note={note}
          key={note.id}
          singleCategory={singleCategory}
          editable={clicked === note.id}
          setIsClicked={setIsClicked}
        />
      )}
    </>
  );
};