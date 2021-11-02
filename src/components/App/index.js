import React from 'react'
import { AttachmentProvider } from '../AttachmentContext';
import { AppUI } from './AppUI'

function App() {
  return (
    <AttachmentProvider>
      <AppUI />
    </AttachmentProvider>
  );
}

export default App
