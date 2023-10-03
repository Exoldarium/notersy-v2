import { BaseCategoryEntry } from '../types';

interface Props {
  singleCategory: BaseCategoryEntry | null;
}

const SingleCategory = ({ singleCategory }: Props) => {
  console.log(singleCategory);
  return (
    <div>
      Notes
    </div>
  );
};

export default SingleCategory;