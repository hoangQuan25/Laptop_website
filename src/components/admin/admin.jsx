import React from 'react'
import './admin.css'

const DashboardBox = ({ title, value }) => {
  return (
    <div className="dashboard-box">
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
};

const Admin = () => {
  return (
    <div className="admin-dashboard">
      <DashboardBox title="Products" value="16 Products" />
      <DashboardBox title="Customers" value="12 Customers" />
      <DashboardBox title="Revenue" value="215,000,000 VND" />
    </div>
  );
};

export default Admin;