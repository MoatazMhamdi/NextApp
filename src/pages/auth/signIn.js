// SignIn.js
import { signIn } from "next-auth/react";

export default function SignIn() {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    const handleGoogleSignIn = () => {
        console.log("handleGoogleSignIn called"); // Vérifie si la fonction est appelée
        console.log("Google Client ID:", clientId); // Affiche le client ID
        signIn("google", { callbackUrl: '/Profile' });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6 text-center">Se connecter</h1>
                <div className="flex justify-center">
                    <button
                        onClick={handleGoogleSignIn}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Se connecter avec Google
                    </button>
                </div>
            </div>
        </div>
    );
}
