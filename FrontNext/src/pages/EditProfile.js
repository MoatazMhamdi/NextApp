import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { signupUser } from './service/userService';  // Adjust path to your service function

export default function Profile() {
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone_nbr: '',
        address: '',
        dateNaissance: ''
    });

    const router = useRouter();

    useEffect(() => {
        if (session) {
            setUserData({
                name: session.user.name || '',
                email: session.user.email || '',
                phone_nbr: session.user.phone_nbr || '',
                address: session.user.address || '',
                dateNaissance: session.user.dateNaissance || ''
            });
        }
    }, [session]);

    const navigateToEditProfile = () => {
        router.push('/Profile');  // Navigate to the edit profile page
    };
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
            const result = await updateUser(EditProfileData);
            alert(result.msg || 'Profile added successfully!');
        } catch (error) {
            console.error('Error adding profile:', error.response || error);
            alert('Error: ' + (error.response?.data?.msg || 'Something went wrong.'));
        }
    };

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (!session) {
        return <p>You are not logged in.</p>;
    }

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6">User Profile</h1>
            <form onSubmit={handleSubmit}  className="space-y-4">
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
            </form>

            <button
                onClick={navigateToEditProfile}
                className="mt-4 bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
            >
                Edit Profile
            </button>
        </div>
    );
}
