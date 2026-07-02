import { useState, useEffect } from "react";
import "../styles/Form.css";

function FilterPopup({
  filters,
  setFilters,
  onClose,
}) {
  const [tempFilters, setTempFilters] = useState(filters);

  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  const handleChange = (e) => {
    setTempFilters({
      ...tempFilters,
      [e.target.name]: e.target.value,
    });
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    onClose();
  };

  const clearFilters = () => {
    const empty = {
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    };

    setTempFilters(empty);
    setFilters(empty);
    onClose();
  };

  return (
    <div className="modal">
      <div className="form-container">
        <h2>Filter Users</h2>

        <input
          name="firstName"
          placeholder="First Name"
          value={tempFilters.firstName}
          onChange={handleChange}
        />

        <input
          name="lastName"
          placeholder="Last Name"
          value={tempFilters.lastName}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={tempFilters.email}
          onChange={handleChange}
        />

        <select
          name="department"
          value={tempFilters.department}
          onChange={handleChange}
        >
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
        </select>

        <div className="buttons">
          <button onClick={applyFilters}>
            Apply
          </button>

          <button onClick={clearFilters}>
            Clear
          </button>

          <button onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterPopup;