import { useAppDispatch } from '../hooks/useReduxTypes';
import { setNotificationMesage } from '../reducers/notificationReducer';
import { BaseCategoryEntry } from '../types';

interface Props {
  singleCategory: BaseCategoryEntry | null;
}

const SingleCategory = ({ singleCategory }: Props) => {
  const dispatch = useAppDispatch();

  if (!singleCategory) {
    void dispatch(setNotificationMesage('Invalid note'));
  }

  if (singleCategory) {
    return (
      <div>
        Note {singleCategory.id}
      </div>
    );
  }
};

export default SingleCategory;