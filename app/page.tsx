import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
            {/* Header */}
            <header className="bg-blue-600 dark:bg-blue-800 text-white p-6 shadow-md">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                    PServer Hub
                </h1>
                <p className="mt-2 text-lg sm:text-xl max-w-xl">
                    Your gateway to the PServer newspaper and community resources.
                </p>
            </header>

            {/* Main section */}
            <main className="flex flex-col flex-1 items-center justify-center p-8 sm:p-16 gap-12">
                {/* Hero image */}
                <Image
                    src="/server-hub.svg" // replace with your own hero image
                    alt="PServer Hub illustration"
                    width={400}
                    height={250}
                    priority
                />

                {/* Call-to-actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/newspaper"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition"
                    >
                        Enter Newspaper
                    </Link>
                    <Link
                        href="/community"
                        className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900 transition"
                    >
                        Community Hub
                    </Link>
                </div>

                {/* Short description / updates */}
                <div className="mt-8 text-center sm:text-left max-w-2xl text-gray-700 dark:text-gray-300">
                    <p className="mb-2">
                        Stay updated with the latest articles, announcements, and guides
                        from PServer. Everything you need, right at your fingertips.
                    </p>
                    <p>
                        Access news, join discussions, or explore the community resources
                        by clicking the buttons above.
                    </p>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p>&copy; {new Date().getFullYear()} PServer. All rights reserved.</p>
                <div className="flex gap-4">
                    <Link
                        href="https://nextjs.org"
                        className="hover:underline"
                        target="_blank"
                    >
                        Next.js
                    </Link>
                    <Link
                        href="https://vercel.com"
                        className="hover:underline"
                        target="_blank"
                    >
                        Vercel
                    </Link>
                </div>
            </footer>
        </div>
    );
}
