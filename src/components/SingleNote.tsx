import SingleNoteStyles from './styles/SingleNoteStyles';
import { BaseNoteEntry } from '../types';

interface Props {
  note: BaseNoteEntry;
}

const SingleNote = ({ note }: Props) => {
  console.log(note, 'note');
  return (
    <SingleNoteStyles>
      {note.content}
    </SingleNoteStyles>
  );
};

export default SingleNote;