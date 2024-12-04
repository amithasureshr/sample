import React, { useState, useEffect } from "react";
import { api } from "../services/api";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [editingRole, setEditingRole] = useState(null);

  useEffect(() => {
    api.getRoles().then(setRoles);
  }, []);

  const handleAddRole = () => {
    const name = prompt("Enter role name:");
    const permissions = prompt("Enter permissions (comma-separated):").split(",");
    api.addRole({ name, permissions }).then((newRole) => {
      setRoles((prev) => [...prev, newRole]);
    });
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
  };

  const saveEditRole = () => {
    if (editingRole) {
      api.editRole(editingRole.id, editingRole).then((updatedRole) => {
        setRoles((prev) =>
          prev.map((role) => (role.id === updatedRole.id ? updatedRole : role))
        );
        setEditingRole(null);
      });
    }
  };

  return (
    <div>
      <h2>Role Management</h2>
      
      <ul>
        {roles.map((role) => (
          <li key={role.id}>
            {role.name} - {role.permissions.join(", ")}
            <button onClick={() => handleEditRole(role)}>Edit</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRole}>Add Role</button>
      {editingRole && (
        <div>
          <h3>Edit Role</h3>
          <input
            type="text"
            value={editingRole.name}
            onChange={(e) =>
              setEditingRole({ ...editingRole, name: e.target.value })
            }
            placeholder="Role Name"
          />
          <textarea
            value={editingRole.permissions.join(", ")}
            onChange={(e) =>
              setEditingRole({
                ...editingRole,
                permissions: e.target.value.split(","),
              })
            }
            placeholder="Permissions (comma-separated)"
          />
          <button onClick={saveEditRole}>Save</button>
          <button onClick={() => setEditingRole(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;
