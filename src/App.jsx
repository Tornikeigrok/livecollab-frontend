import React from 'react';
import LoginPage from './Components/LoginPage';
import HomePage from './Components/HomePage';
import { Routes, Route } from 'react-router';
import { UserProvider } from './Components/InfoContext';
import { DocumentContentProvider } from './Components/DocumentContent';
import './Components/SocketContext'; // Just import it to initialize
import WelcomePage from './Components/WelcomePage';
import DocumentPage from './Components/DocumentPage';
function App() {
  return (
    <UserProvider>
      <DocumentContentProvider>
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path="/LoginPage" element={<LoginPage />}/>
          <Route path="/HomePage" element={<HomePage />}/>
          <Route path="/DocumentPage" element={<DocumentPage />}/>
        </Routes>
      </DocumentContentProvider>
    </UserProvider>
  );
}

export default App;

