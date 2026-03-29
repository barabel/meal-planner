import { useState } from 'react';

function App() {
  const [nodeVersion, setNodeVersion] = useState<string | undefined>(undefined);

  const updateNodeVersion = async () => setNodeVersion(await backend.nodeVersion('Hello from App.tsx!'));

  return (
    <button onClick={updateNodeVersion}>
      Node version is
      {' '}
      {nodeVersion}
    </button>
  );
}

export default App;
