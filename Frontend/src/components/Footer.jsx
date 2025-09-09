// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Column 1 */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">About Us</h3>
                        <p className="text-sm">
                            Welcome to JobFinder, your go-to portal for finding your dream job.
                            We connect top talent with the best companies worldwide.
                        </p>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="text-sm space-y-2">
                            <li><a href="/" className="hover:underline">Home</a></li>
                            <li><a href="/jobs" className="hover:underline">Browse Jobs</a></li>
                            <li><a href="/about" className="hover:underline">About Us</a></li>
                            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contact</h3>
                        <p className="text-sm">
                            Email: support@jobfinder.com
                        </p>
                        <p className="text-sm">
                            Phone: +1 234 567 890
                        </p>
                        <p className="text-sm">
                            Address: 123 JobFinder Lane, WorkCity, World 56789
                        </p>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
                    &copy; {new Date().getFullYear()} JobFinder. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;