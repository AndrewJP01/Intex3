import { useUser } from '../context/UserContext';

const TestContextDisplay = () => {
  const { userId } = useUser();

  return (
    <div style={{ padding: '1rem', color: 'white' }}>
      <h3>UserContext Test</h3>
      <p>
        <strong>ML User ID:</strong>{' '}
        {userId ?? 'Not logged in or not loaded yet'}
      </p>
    </div>
  );
};

export default TestContextDisplay;
