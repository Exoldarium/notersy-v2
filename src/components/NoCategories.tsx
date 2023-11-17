import { useAppDispatch } from "../hooks/useReduxTypes";
import { addNewCategory } from "../reducers/categoryReducer";
import { BaseCategoryEntry } from "../types";
import { NoCategoriesStyles } from "./styles/CategoryStyles";

interface Props {
  categories: BaseCategoryEntry[];
}

export const NoCategories = ({ categories }: Props) => {
  const dispatch = useAppDispatch();

  if (categories.length === 0) {
    return (
      <NoCategoriesStyles>
        <p>Welcome to Notersy!</p>
        <p>Create a category to start or select and add the text from the page!</p>
        <button
          type="button"
          onClick={() => dispatch(addNewCategory([]))}
        >
          Create
        </button>
      </NoCategoriesStyles>
    );
  }
};