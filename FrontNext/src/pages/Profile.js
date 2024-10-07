import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Profile() {
    const { data: session } = useSession();
    const router = useRouter();
    const [userData, setUserData] = useState({
        phone_nbr: '',
        address: '',
        dateNaissance: ''
    });
    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' }); // Redirects to the home page after signing out
    };

    // Use an external service to generate a random avatar based on the user's name or email
    const avatarUrl = `https://ui-avatars.com/api/?name=${session?.user?.name || 'User'}&background=random`;

    useEffect(() => {
        if (session) {
            setUserData({
                phone_nbr: session.user.phone_nbr || '',
                address: session.user.address || '',
                dateNaissance: session.user.dateNaissance || ''
            });
        }
    }, [session]);

    const handleEdit = () => {
        router.push('/EditProfile');
    };

    return (
        <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
            <div className="flex flex-col items-center">
                <img
                    src={avatarUrl}
                    alt="Profile Avatar"
                    className="w-24 h-24 rounded-full mb-4"
                />
                <h2 className="text-xl font-semibold">{session?.user?.name || 'Name'}</h2>
                <p className="text-gray-600 mb-2">{session?.user?.email || 'Email'}</p>

                <button
                    onClick={handleEdit}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Edit Profile
                </button>
            <div>
            <button
                    onClick={handleSignOut}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                    Log out
                </button>
            </div>
            </div>
        </div>
    );
}
