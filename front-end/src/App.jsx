import './App.css';
import Form from './component/Form';
import UserList from './component/UserList';
import { useState, useEffect } from 'react';

function App() {
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [refreshUserList, setRefreshUserList] = useState(false);

  const handleCreateUser = () => {
    setIsCreatingUser(true);
  };

  const handleUserCreated = () => {
    setIsCreatingUser(false);
    setRefreshUserList(prev => !prev); // Toggle to refresh user list
  };

  const handleToggleForm = () => {
    setIsCreatingUser(prev => !prev); // Toggle between Form and UserList
  };

  return (
    <>
      <h1>Registration System</h1>
      <button onClick={handleToggleForm}>
        {isCreatingUser ? "Back to User List" : "Register"}
      </button>
      {isCreatingUser ? (
        <Form onUserCreated={handleUserCreated} />
      ) : (
        <UserList refresh={refreshUserList} />
      )}
    </>
  );
}

export default App;
