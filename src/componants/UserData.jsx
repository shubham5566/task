import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, addUser, editUser, deleteUser } from '../features/userSlice';

const UserData = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const { username } = useSelector((state) => state.auth); // Access logged-in username
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', phone: '', company: { name: '' }, website: '' });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  useEffect(() => {

    // Check if all required fields are filled to enable/disable the button

    setIsFormValid(

      currentUser.name.trim() !== '' &&

      currentUser.email.trim() !== '' &&

      currentUser.phone.trim() !== '' &&

      currentUser.company.name.trim() !== '' &&

      currentUser.website.trim() !== ''

    );

  }, [currentUser]);
  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form submit for adding or editing
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(editUser(currentUser));
      setIsEditing(false);
    } else {
      dispatch(addUser({ ...currentUser, id: Date.now() }));
    }
    setCurrentUser({ name: '', email: '', phone: '', company: { name: '' }, website: '' });
  };

  // Handle edit action
  const handleEdit = (user) => {
    setIsEditing(true);
    setCurrentUser(user);
  };

  // Handle delete action
  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-200">User Data</h2>
      
      {/* Display username if logged in */}
      {username && (
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Welcome, <span className="font-semibold">{username}</span>!
        </p>
      )}
      
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <form onSubmit={handleFormSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Name"
          value={currentUser.name}
          onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
          className="mr-2 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={currentUser.email}
          onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
          className="mr-2 p-2 border rounded"
        />
        <input
          type="tel"
          placeholder="Phone"
          value={currentUser.phone}
          onChange={(e) => setCurrentUser({ ...currentUser, phone: e.target.value })}
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Company Name"
          value={currentUser.company.name}
          onChange={(e) => setCurrentUser({ ...currentUser, company: { name: e.target.value } })}
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Website"
          value={currentUser.website}
          onChange={(e) => setCurrentUser({ ...currentUser, website: e.target.value })}
          className="mr-2 p-2 border rounded"
        />
        {/* <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {isEditing ? 'Update User' : 'Add User'}
        </button> */}
        <button

type="submit"

className={`bg-blue-500 text-white px-4 py-2 rounded ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}

disabled={!isFormValid} // Disable the button if form is not valid

>
{isEditing ? 'Update User' : 'Add User'}
</button>
      </form>

      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Company</th>
              <th className="p-2 border">Website</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="text-gray-900 dark:text-gray-200">
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.phone}</td>
                <td className="p-2 border">{user.company?.name}</td>
                <td className="p-2 border">{user.website}</td>
                <td className="p-2 border">
                  <button onClick={() => handleEdit(user)} className="mr-2 text-blue-500">Edit</button>
                  <button onClick={() => handleDelete(user.id)} className="text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserData;