import { useState, useEffect } from "react";
import "../styles/Form.css";

function UserForm({ onSave, onCancel, editUser }) {
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    department: "IT",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (editUser) {
      setFormData(editUser);
    } else {
      setFormData(initialFormData);
    }
  }, [editUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // First Name Validation
    if (!formData.firstName.trim()) {
      alert("First Name is required");
      return;
    }

    // Last Name Validation
    if (!formData.lastName.trim()) {
      alert("Last Name is required");
      return;
    }

    // Email Validation
    if (!formData.email.trim()) {
      alert("Email is required");
      return;
    }

    // Email Format Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    onSave(formData);

    // Clear form only after adding a user
    if (!editUser) {
      setFormData(initialFormData);
    }
  };

  return (
    <div className="modal">
      <div className="form-container">

        <h2>
          {editUser ? "Edit User" : "Add New User"}
        </h2>

        <form onSubmit={handleSubmit}>

          <label>
            First Name <span style={{ color: "red" }}>*</span>
          </label>

          <input
            type="text"
            name="firstName"
            placeholder="Enter First Name"
            value={formData.firstName}
            onChange={handleChange}
          />

          <label>
            Last Name <span style={{ color: "red" }}>*</span>
          </label>

          <input
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />

          <label>
            Email <span style={{ color: "red" }}>*</span>
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Department</label>

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
          </select>

          <div className="buttons">
            <button type="submit">
              {editUser ? "Update User" : "Add User"}
            </button>

            <button
              type="button"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default UserForm;