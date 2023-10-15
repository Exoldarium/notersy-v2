import DOMPurify from 'dompurify';

import SingleNoteStyles from './styles/SingleNoteStyles';
import { BaseNoteEntry } from '../types';

interface Props {
  note: BaseNoteEntry;
}

const SingleNote = ({ note }: Props) => {
  console.log(note, 'note');

  // sanitize note content before setting it to innerHTML
  const clean = DOMPurify.sanitize(note.content);
  const render = {
    __html: clean
  };

  return (
    <SingleNoteStyles >
      <div dangerouslySetInnerHTML={render} />
    </SingleNoteStyles>
  );
};

export default SingleNote;