import { BaseCategoryEntry } from '../types';
import CategoryStyles from './styles/CategoryStyles';

interface Props {
  category: BaseCategoryEntry
}

const Category = ({ category }: Props) => {
  return (
    <CategoryStyles>
      {category.title}
    </CategoryStyles>
  );
};

export default Category;
