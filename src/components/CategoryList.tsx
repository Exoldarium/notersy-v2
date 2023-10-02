import { Link } from 'react-router-dom';
import { BaseCategoryEntry } from '../types';
import CategoryStyles from './styles/CategoryStyles';

interface Props {
  category: BaseCategoryEntry
}

const CategoryList = ({ category }: Props) => {
  return (
    <CategoryStyles>
      <Link to={`/categories/${category.id}`}>
        {category.title}
      </Link>
    </CategoryStyles>
  );
};

export default CategoryList;
