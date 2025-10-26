import { Callout } from '@radix-ui/themes';
import { AlertTriangle } from 'lucide-react';

export const ErrorMessage = ({ message, onRetry }) => {
  return (
    <Callout.Root color="red" role="alert">
      <Callout.Icon>
        <AlertTriangle />
      </Callout.Icon>
      <Callout.Text>
        {message || 'An error occurred. Please try again.'}
        {onRetry && (
          <button onClick={onRetry} style={{ marginLeft: '8px', textDecoration: 'underline', cursor: 'pointer' }}>
            Retry
          </button>
        )}
      </Callout.Text>
    </Callout.Root>
  );
};
