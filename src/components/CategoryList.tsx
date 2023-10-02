import { BaseCategoryEntry } from '../types';
import CategoryStyles from './styles/CategoryStyles';

interface Props {
  category: BaseCategoryEntry
}

const CategoryList = ({ category }: Props) => {
  return (
    <CategoryStyles>
      {/* <Link to={`/categories/${category.id}`}>
      </Link> */}
      {category.title}
    </CategoryStyles>
  );
};

export default CategoryList;
