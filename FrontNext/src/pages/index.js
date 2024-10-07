import { signIn } from "next-auth/react";
import { FcGoogle } from 'react-icons/fc';  // Import Google icon from react-icons

export default function SignIn() {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    const handleGoogleSignIn = () => {
        console.log("handleGoogleSignIn called"); // Debugging to check if function is called
        console.log("Google Client ID:", clientId); // Debugging client ID
        signIn("google", { callbackUrl: '/Form' });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold text-center mb-2">Se connecter</h1>
                <p className="text-gray-700 text-center mb-4">Welcome to our mini app, would you enjoy it?</p>
                
                {/* Divider line */}
                <hr className="my-6 border-t border-gray-300" />
                
                <div className="flex justify-center">
                    <button
                        onClick={handleGoogleSignIn}
                        className="flex items-center bg-white text-blue-500 border border-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition"
                    >
                        <FcGoogle className="mr-2" /> {/* Google icon */}
                        Se connecter avec Google
                    </button>
                </div>
            </div>
        </div>
    );
}
