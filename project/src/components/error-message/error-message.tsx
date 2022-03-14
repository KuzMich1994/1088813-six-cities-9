import React from 'react';
import {useAppSelector} from '../../hooks';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector((state) => state.error);

  if (error) {
    return (
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: 'red',
        color: 'white',
        padding: '10px',
      }}
      >
        {error}
      </div>
    );
  }

  return null;
}

export default ErrorMessage;
