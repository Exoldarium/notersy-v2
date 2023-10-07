import { BaseCategoryEntry } from '../types';

interface Props {
  singleCategory: BaseCategoryEntry;
}

const SingleCategory = ({ singleCategory }: Props) => {
  console.log('single category', singleCategory);
  return (
    <div>
      Note {singleCategory.id}
    </div>
  );
};

export default SingleCategory;