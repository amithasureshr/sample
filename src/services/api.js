const mockDatabase = {
    users: [
      { id: 1, name: "John Doe", role: "Admin", status: "Active" },
      { id: 2, name: "Jane Smith", role: "Editor", status: "Inactive" },
    ],
    roles: [
      { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
      { id: 2, name: "Editor", permissions: ["Read", "Write"] },
    ],
  };
  
  // Simulated API calls
  export const api = {
    getUsers: () => Promise.resolve([...mockDatabase.users]),
    addUser: (user) => {
      const newUser = { ...user, id: Date.now() };
      mockDatabase.users.push(newUser);
      return Promise.resolve(newUser);
    },
    editUser: (userId, updates) => {
      const userIndex = mockDatabase.users.findIndex((user) => user.id === userId);
      if (userIndex > -1) {
        mockDatabase.users[userIndex] = { ...mockDatabase.users[userIndex], ...updates };
        return Promise.resolve(mockDatabase.users[userIndex]);
      }
      return Promise.reject("User not found");
    },
    deleteUser: (userId) => {
      mockDatabase.users = mockDatabase.users.filter((user) => user.id !== userId);
      return Promise.resolve();
    },
    getRoles: () => Promise.resolve([...mockDatabase.roles]),
    addRole: (role) => {
      const newRole = { ...role, id: Date.now() };
      mockDatabase.roles.push(newRole);
      return Promise.resolve(newRole);
    },
    editRole: (roleId, updates) => {
      const roleIndex = mockDatabase.roles.findIndex((role) => role.id === roleId);
      if (roleIndex > -1) {
        mockDatabase.roles[roleIndex] = { ...mockDatabase.roles[roleIndex], ...updates };
        return Promise.resolve(mockDatabase.roles[roleIndex]);
      }
      return Promise.reject("Role not found");
    },
  };
  