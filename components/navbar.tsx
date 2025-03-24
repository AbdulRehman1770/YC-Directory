// // Import required modules for authentication and navigation
// import { auth, signIn, signOut } from "@/auth"; 
// import Image from "next/image"; 
// import Link from "next/link"; 

// export default async function NavBar() {
//     // Get the user session (check if user is logged in)
//     const session = await auth();

//     return (
//         <header className="px-5 py-3 bg-white shadow-sm font-work-sans font-weight-100">
//             <nav className="flex justify-between items-center">

//                 <Link href="/">
//                     <Image src="/logo.png" alt="logo" width={144} height={30} />
//                 </Link>

//                 <div className="flex items-center gap-5 text-black">

//                     {/* If user is logged in show content and logout button */}
//                     {session && session?.user ? (
//                         <>
//                             {/* Link to create a startup */}
//                             <Link href="/startup/create">
//                                 <span>create</span>
//                             </Link>

//                             {/* Logout Form: Calls signOut when submitted */}
//                             <form action={async () => {
//                                 "use server"; // Ensures this runs on the server
//                                 await signOut({ redirectTo: "/" }); // Logs the user out and redirects to home
//                             }}>
//                                 <button type="submit">Logout</button>
//                             </form>

//                             {/* Link to the user's profile page */}
//                             <Link href={`/user/${session?.user.id}`}>
//                                 <span>{session?.user?.name}</span>
//                             </Link>
//                         </>
//                     ) : (
//                         /* If user is NOT logged in, show login button */
//                         <form action={async () => {
//                             "use server"; // Ensures this runs on the server
//                             await signIn('github'); // Logs in with GitHub
//                         }}>
//                             <button type="submit">Login</button>
//                         </form>
//                     )}
//                 </div>
//             </nav>
//         </header>
//     );
// }

// user profile page new code link issue tha magar sahi hogya 
import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { LogOutIcon } from "lucide-react";
import { BadgePlusIcon } from "lucide-react";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "./ui/avatar";

export default async function NavBar() {
    const session = await auth();

    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans font-weight-100">
            <nav className="flex justify-between items-center">

                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={144} height={30} />
                </Link>

                <div className="flex items-center gap-5 text-black">

                    {session && session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span className="max-sm:hidden">create</span>
                                <BadgePlusIcon className="size-6 sm:hidden text-red-500" />


                            </Link>

                            <form action={async () => {
                                "use server";
                                await signOut({ redirectTo: "/" });
                            }}>
                                <button type="submit" className="max-sm:hidden">Logout</button>
                                <LogOutIcon className="size-6 sm:hidden text-red-500" />
                            </form>

                            <Link href={`/user/${session.user.id}`}>
                                <Avatar className="size-10">
                                    <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
                                    <AvatarFallback>AV</AvatarFallback>
                                </Avatar> {/* ✅ Correctly closed */}
                            </Link>

                        </>
                    ) : (
                        <form action={async () => {
                            "use server";
                            await signIn('github');
                        }}>
                            <button type="submit">Login</button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    );
}