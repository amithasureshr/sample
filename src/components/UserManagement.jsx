import React, { useState, useEffect } from "react";
import { api } from "../services/api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    api.getUsers().then(setUsers);
    api.getRoles().then(setRoles);
  }, []);

  const handleAddUser = () => {
    const name = prompt("Enter user name:");
    const role = prompt("Enter user role:");
    const status = prompt("Enter user status (Active/Inactive):");
    api.addUser({ name, role, status }).then((newUser) => {
      setUsers((prev) => [...prev, newUser]);
    });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const saveEditUser = () => {
    if (editingUser) {
      api.editUser(editingUser.id, editingUser).then((updatedUser) => {
        setUsers((prev) =>
          prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
        setEditingUser(null);
      });
    }
  };

  const handleDeleteUser = (id) => {
    api.deleteUser(id).then(() => {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    });
  };

  return (
    <div>
      <h2>User Management</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.role} ({user.status})
            <button onClick={() => handleEditUser(user)}>Edit</button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddUser}>Add User</button>
      {editingUser && (
        <div>
          <h3>Edit User</h3>
          <input
            type="text"
            value={editingUser.name}
            onChange={(e) =>
              setEditingUser({ ...editingUser, name: e.target.value })
            }
            placeholder="Name"
          />
          <select
            value={editingUser.role}
            onChange={(e) =>
              setEditingUser({ ...editingUser, role: e.target.value })
            }
          >
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
          <select
            value={editingUser.status}
            onChange={(e) =>
              setEditingUser({ ...editingUser, status: e.target.value })
            }
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button onClick={saveEditUser}>Save</button>
          <button onClick={() => setEditingUser(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
