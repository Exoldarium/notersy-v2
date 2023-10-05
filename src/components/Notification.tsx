import { useAppSelector } from '../hooks/useReduxTypes';

const Notification = () => {
  const message = useAppSelector(({ message }) => {
    if (message && message.type === 'ERROR') {
      return message.content;
    }

    return null;
  });

  if (message) {
    return (
      <div>{message}</div>
    );
  }
};

export default Notification;