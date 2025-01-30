import React, { useEffect, useState } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    education: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch("http://localhost:3001/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setFormData(user);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setErrorMessage("");
    try {
      await fetch(`http://localhost:3001/delete-user/${id}`, {
        method: "DELETE",
      });
      fetchUsers(); // Refresh the user list
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Error deleting user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      await fetch(`http://localhost:3001/update-user/${editingUser}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setEditingUser(null);
      setFormData({
        name: "",
        email: "",
        password: "",
        mobile: "",
        education: "",
      });
      fetchUsers(); // Refresh the user list
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      {loading && <p>Loading...</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editingUser && (
        <form onSubmit={handleUpdate}>
          <h3>Edit User</h3>
          <label>
            Name:
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </label>
          <br />
          <label>
            Mobile No:
            <input
              type="tel"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            />
          </label>
          <br />
          <label>
            Education:
            <input
              type="text"
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
            />
          </label>
          <br />
          <button type="submit">Update User</button>
        </form>
      )}
    </div>
  );
}

export default UserList;
