import { useState, useEffect } from 'react'; 
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axiosInstance from 'axios'; // Import axios instance

const PARIS_COORDINATES = { lat: 48.8566, lng: 2.3522 }; // Coordinates for the center of Paris

// Function to calculate distance between two points (Haversine formula)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
};

export default function Form() {
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState({
        phone_nbr: '',
        address: '',
        dateNaissance: ''
    });
    const [addressSuggestions, setAddressSuggestions] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (session) {
            setUserData({
                phone_nbr: session.user.phone_nbr || '',
                address: session.user.address || '',
                dateNaissance: session.user.dateNaissance || ''
            });
        }
    }, [session]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        if (name === 'address') {
            fetchAddressSuggestions(value);
        }
    };

    const fetchAddressSuggestions = async (query) => {
        if (query.length < 3) {
            setAddressSuggestions([]);
            return;
        }

        try {
            const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}`);
            const data = await response.json();
            const validAddresses = [];

            for (const feature of data.features) {
                const { geometry } = feature;
                const userCoordinates = {
                    lat: geometry.coordinates[1],
                    lng: geometry.coordinates[0],
                };

                const distance = calculateDistance(
                    userCoordinates.lat,
                    userCoordinates.lng,
                    PARIS_COORDINATES.lat,
                    PARIS_COORDINATES.lng
                );

                if (distance > 50) {
                    validAddresses.push(feature.properties.label);
                }
            }

            setAddressSuggestions(validAddresses);
        } catch (error) {
            console.error('Error fetching address data:', error);
            setErrorMessage("An error occurred while fetching address suggestions.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const signupData = {
            email: session.user.email,
            name: session.user.name,
            phone_nbr: userData.phone_nbr,
            dateNaissance: userData.dateNaissance,
            address: userData.address
        };

        try {
            const result = await axiosInstance.post('http://localhost:4000/user/signup', signupData);
            alert(result.msg || 'Profile added successfully!');
            router.push('/Profile');  // Navigate to the edit profile page
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
            <h1 className="text-2xl font-bold mb-6">Additional User Information</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={session?.user?.name || ''}
                        disabled
                        className="mt-2 p-2 border rounded-md"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={session?.user?.email || ''}
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
                    {addressSuggestions.length > 0 && (
                        <ul className="bg-white border border-gray-300 mt-1 rounded-md">
                            {addressSuggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    className="p-2 cursor-pointer hover:bg-gray-200"
                                    onClick={() => setUserData((prev) => ({ ...prev, address: suggestion }))}
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                    Add Profile
                </button>
            </form>
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </div>
    );
}
