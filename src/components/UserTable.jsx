import "../styles/UserTable.css";

function UserTable({ users, onEdit, onDelete, onSort }) {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>ID</th>

          <th onClick={() => onSort("firstName")}>
            First Name ↕
          </th>

          <th onClick={() => onSort("lastName")}>
            Last Name ↕
          </th>

          <th onClick={() => onSort("email")}>
            Email ↕
          </th>

          <th onClick={() => onSort("department")}>
            Department ↕
          </th>

          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.length > 0 ? (
          users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>

              <td>
                <button
                  className="edit-btn"
                  onClick={() => onEdit(user)}
                >
                  ✏️ Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => onDelete(user.id)}
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="no-users">
              No users found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default UserTable;