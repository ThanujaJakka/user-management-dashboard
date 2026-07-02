import { useEffect, useState } from "react";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "./services/api";

import UserTable from "./components/UserTable";
import SearchBar from "./components/SearchBar";
import UserForm from "./components/UserForm";
import Pagination from "./components/Pagination";
import FilterPopup from "./components/FilterPopup";

import "./styles/App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [showFilter, setShowFilter] = useState(false);

  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    loadUsers();
  }, []);
  useEffect(() => {
  setCurrentPage(1);
}, [searchTerm, filters]);

  // Fetch Users
  const loadUsers = async () => {
  try {
    setLoading(true);

    const response = await getUsers();

    const departments = [
      "IT",
      "HR",
      "Finance",
      "Sales",
      "Marketing",
    ];

    const formattedUsers = response.data.map((user, index) => {
      const names = user.name.split(" ");

      return {
        id: user.id,
        firstName: names[0],
        lastName: names.slice(1).join(" "),
        email: user.email,
        department: departments[index % departments.length],
      };
    });

    setUsers(formattedUsers);
  } catch (error) {
    alert("Failed to load users.");
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  // Search + Filter + Sort
  const filteredUsers = users
    .filter((user) => {
      const searchMatch =
        `${user.firstName} ${user.lastName} ${user.email} ${user.department}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const firstNameMatch = user.firstName
        .toLowerCase()
        .includes(filters.firstName.toLowerCase());

      const lastNameMatch = user.lastName
        .toLowerCase()
        .includes(filters.lastName.toLowerCase());

      const emailMatch = user.email
        .toLowerCase()
        .includes(filters.email.toLowerCase());

      const departmentMatch =
        filters.department === "" ||
        user.department === filters.department;

      return (
        searchMatch &&
        firstNameMatch &&
        lastNameMatch &&
        emailMatch &&
        departmentMatch
      );
    })
    .sort((a, b) => {
      if (!sortField) return 0;

      const valueA = a[sortField].toLowerCase();
      const valueB = b[sortField].toLowerCase();

      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / pageSize)
  );

  const startIndex = (currentPage - 1) * pageSize;

  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + pageSize
  );

  // Add / Edit
  const handleSaveUser = async (user) => {
    try {
      if (editUser) {
        await updateUser(editUser.id, user);

        const updatedUsers = users.map((u) =>
          u.id === editUser.id
            ? { ...user, id: editUser.id }
            : u
        );

        setUsers(updatedUsers);
        setEditUser(null);
      } else {
        const response = await addUser(user);

        const nextId =
  users.length > 0
    ? Math.max(...users.map((u) => u.id)) + 1
    : 1;

const newUser = {
  ...response.data,
  id: nextId,
};

        setUsers([...users, newUser]);
      }

      setShowForm(false);
    } catch (error) {
      alert("Operation failed.");
      console.error(error);
    }
  };

  // Edit
  const handleEditUser = (user) => {
    setEditUser(user);
    setShowForm(true);
  };

  // Delete
  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(id);

      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      alert("Delete failed.");
      console.error(error);
    }
  };

  // Sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(
        sortOrder === "asc" ? "desc" : "asc"
      );
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="app">
      <h1>User Management Dashboard</h1>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="top-buttons">
        <button
          className="add-btn"
          onClick={() => {
            setEditUser(null);
            setShowForm(true);
          }}
        >
          + Add User
        </button>

        <button
          className="filter-btn"
          onClick={() => setShowFilter(true)}
        >
          Filter
        </button>
      </div>

      {showForm && (
        <UserForm
          onSave={handleSaveUser}
          onCancel={() => {
            setShowForm(false);
            setEditUser(null);
          }}
          editUser={editUser}
        />
      )}

      {showFilter && (
        <FilterPopup
          filters={filters}
          setFilters={setFilters}
          onClose={() => setShowFilter(false)}
        />
      )}

      <UserTable
        users={paginatedUsers}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onSort={handleSort}
      />

      <Pagination
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;