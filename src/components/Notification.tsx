import { useAppSelector } from '../hooks/useReduxTypes';

const Notification = () => {
  const message = useAppSelector(({ message }) => {
    if (message[0] && message[0].type === 'ERROR') {
      return message[0].content;
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