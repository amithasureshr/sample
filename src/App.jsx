import React from "react";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";
import "./App.css";

const App = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <UserManagement />
      <RoleManagement />
    </div>
  );
};

export default App;