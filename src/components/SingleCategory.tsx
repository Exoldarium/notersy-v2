import { useAppDispatch } from '../hooks/useReduxTypes';
import { setNotificationMesage } from '../reducers/messageReducer';
import { BaseCategoryEntry } from '../types';

interface Props {
  singleCategory: BaseCategoryEntry | null;
}

const SingleCategory = ({ singleCategory }: Props) => {
  const dispatch = useAppDispatch();

  if (!singleCategory) {
    void dispatch(setNotificationMesage({
      type: 'ERROR',
      content: 'Invalid note'
    }));
  }

  if (singleCategory) {
    console.log('single category', singleCategory);
    return (
      <div>
        Note {singleCategory.id}
      </div>
    );
  }
};

export default SingleCategory;