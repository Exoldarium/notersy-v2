import { useAppDispatch } from "../hooks/useReduxTypes";
import { addNewCategory } from "../reducers/categoryReducer";
import { BaseCategoryEntry } from "../types";

interface Props {
  categories: BaseCategoryEntry[];
}

export const NoCategories = ({ categories }: Props) => {
  const dispatch = useAppDispatch();

  if (categories.length === 0) {
    return (
      <div>
        <p>This is Notersy!</p>
        <p>Create a category to start!</p>
        <button
          type="button"
          onClick={() => dispatch(addNewCategory([]))}
        >
          Create
        </button>
      </div>
    );
  }
};