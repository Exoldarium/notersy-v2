import { useAppSelector } from '../hooks/useReduxTypes';

const Notification = () => {
  const notification = useAppSelector(({ notification }) => {
    return notification;
  });

  return (
    <div>{notification}</div>
  );
};

export default Notification;