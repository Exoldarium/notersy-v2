import { useAppSelector } from '../hooks/useReduxTypes';
import { NotificationStyles } from './styles/NotificationStyles';

export const Notification = () => {
  const message = useAppSelector(({ message }) => {
    if (message && message.type === 'ERROR') {
      return message.content;
    }

    return null;
  });

  if (message) {
    return (
      <NotificationStyles>
        <p>
          {message}
        </p>
      </NotificationStyles>
    );
  }
};