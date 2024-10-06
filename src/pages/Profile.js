import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Profile() {
    const { data: session } = useSession();
    const router = useRouter();

    if (!session) {
        return <p>Access Denied. Please sign in first.</p>;
    }

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' }); // Redirects to the home page after signing out
    };

    return (
        <div>
            <h1>Welcome to your Profile</h1>
            <p>Logged in as: {session.user.email}</p>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
}
