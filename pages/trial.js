import { useState, useEffect } from 'react';

function MyPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Make a GET request when the component mounts
    fetch('http://localhost:8000/polls/') // Replace with your API route or URL
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((responseData) => {
        // Set the data in the state
        setData(responseData);
      })
      .catch((error) => {
        // Handle errors
        setError(error);
      });
  }, []);

  return (
    <div>
      <h1>Data from API:</h1>
      {error ? (
        <p>Error: {error.message}</p>
      ) : (
        data && (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        )
      )}
    </div>
  );
}

export default MyPage;
