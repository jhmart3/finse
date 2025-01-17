import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <div>
      <h1>Hello from React!</h1>
    </div>
  );
}

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(<App />);