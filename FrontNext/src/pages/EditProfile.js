import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { updateUser } from './service/userService';  // Adjust path to your service function
import axios from 'axios';  // To consume the getUserById service

export default function EditProfile() {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone_nbr: '',
        address: '',
        dateNaissance: ''
    });
    const router = useRouter();
    const { id } = router.query;  // Extract user ID from URL

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/api/users/${id}`);  // Consume the getUserById service
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        if (id) {
            fetchUserData();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const EditProfileData = {
            email: userData.email,
            name: userData.name,
            phone_nbr: userData.phone_nbr,
            dateNaissance: userData.dateNaissance,
            address: userData.address
        };

        try {
            const result = await updateUser(id, EditProfileData);  // Pass the user ID
            alert(result.msg || 'Profile updated successfully!');
            router.push('/Profile');  // Navigate to the profile page
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error: ' + (error.response?.data?.msg || 'Something went wrong.'));
        }
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={userData.name}
                        disabled
                        className="mt-2 p-2 border rounded-md"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        disabled
                        className="mt-2 p-2 border rounded-md"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold">Phone Number:</label>
                    <input
                        type="tel"
                        name="phone_nbr"
                        value={userData.phone_nbr}
                        onChange={handleChange}
                        required
                        className="mt-2 p-2 border rounded-md"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold">Date of Birth:</label>
                    <input
                        type="date"
                        name="dateNaissance"
                        value={userData.dateNaissance}
                        onChange={handleChange}
                        className="mt-2 p-2 border rounded-md"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold">Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={userData.address}  
                        onChange={handleChange}
                        required
                        className="mt-2 p-2 border rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}
