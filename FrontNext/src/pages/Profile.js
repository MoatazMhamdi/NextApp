import { useEffect, useState } from 'react';
import axios from './service/axios';

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);  // Control modal visibility
    const [selectedUser, setSelectedUser] = useState(null);  // The user to be edited
    const [editFormData, setEditFormData] = useState({
        name: '',
        email: '',
        phone_nbr: '',
        dateNaissance: '',
        address: ''
    });

    // Fetch the list of users
    const fetchUsers = async () => {
        try {
            const response = await axios.get('/user/All');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Open the modal and populate form with selected user data
    const handleEditClick = (user) => {
        setSelectedUser(user);  // Save the selected user
        setEditFormData({       // Pre-fill the form with the user's data
            name: user.name,
            email: user.email,
            phone_nbr: user.phone_nbr,
            dateNaissance: user.dateNaissance,
            address: user.address
        });
        setShowEditModal(true);  // Show the modal
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        setEditFormData({
            ...editFormData,
            [e.target.name]: e.target.value
        });
    };

    // Submit the updated user data
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/user/edit/${selectedUser._id}`, editFormData);  // Update user
            fetchUsers();  // Refresh the user list after updating
            setShowEditModal(false);  // Hide the modal after submitting
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-semibold mb-6 text-center">User Profiles</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {users.map((user) => (
                    <div key={user._id} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex flex-col items-center">
                            <img
                                src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                                alt="Profile Avatar"
                                className="w-24 h-24 rounded-full mb-4"
                            />
                            <h2 className="text-xl font-semibold">{user.name}</h2>
                            <p className="text-gray-600 mb-2">{user.email}</p>
                            <p className="text-gray-600 mb-2">{user.phone_nbr}</p>
                            <p className="text-gray-600 mb-4">{user.address}</p>

                            <button
                                onClick={() => handleEditClick(user)}  // Open the modal on click
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tailwind Modal for editing user */}
            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editFormData.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editFormData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone_nbr"
                                    value={editFormData.phone_nbr}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Date of Birth</label>
                                <input
                                    type="text"
                                    name="dateNaissance"
                                    value={editFormData.dateNaissance}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={editFormData.address}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}  // Close modal
                                    className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
