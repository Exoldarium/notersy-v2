import NoteEditor from './NoteEditor';
import SingleCategoryStyles from './styles/SingleCategoryStyles';

import { BaseCategoryEntry } from '../types';

interface Props {
  singleCategory: BaseCategoryEntry;
  noteEditorActive: boolean;
}

const SingleCategory = ({ singleCategory, noteEditorActive }: Props) => {
  console.log('single category', singleCategory);
  return (
    <>
      {noteEditorActive && <NoteEditor />}
      <SingleCategoryStyles>
        Note {singleCategory.id}
      </SingleCategoryStyles>
    </>
  );
};

export default SingleCategory;