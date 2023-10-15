import { useAppSelector } from '../hooks/useReduxTypes';

// TODO:
// message should be visible when an error happens

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