// pages/about.js

import Link from 'next/link';

const About = () => {
  return (
    <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32 2xl:px-36 text-white py-6">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-4">About Our Property Platform</h1>
        <p className="text-xl text-gray-500">
          Welcome to our platform, where buying, selling, and managing properties has never been easier.
        </p>
      </header>
      
      <section className="mt-12">
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg">
          Our platform aims to simplify the property transaction process by providing a seamless experience
          for buyers, sellers, and legal professionals. Whether you are looking to buy, sell, or facilitate transactions
          as a lawyer, our system is designed to make the process efficient, transparent, and secure.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold mb-4">How It Works</h2>
        <p className="text-lg mb-4">
          Our platform is divided into specialized panels to ensure that each user can easily navigate and manage their specific
          needs in the property process. Here’s a brief overview:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border p-6 rounded-lg shadow-md bg-white text-gray-900">
            <h3 className="text-2xl font-semibold mb-2">Admin Panel</h3>
            <p className="text-lg">
              The admin panel allows you to manage users, monitor transactions, and configure platform settings.
            </p>
          </div>

          <div className="border p-6 rounded-lg shadow-md bg-white text-gray-900">
            <h3 className="text-2xl font-semibold mb-2">Buyer Panel</h3>
            <p className="text-lg">
              The buyer panel allows potential buyers to browse properties, make offers, and complete transactions securely.
            </p>
          </div>

          <div className="border p-6 rounded-lg shadow-md bg-white text-gray-900">
            <h3 className="text-2xl font-semibold mb-2">Seller Panel</h3>
            <p className="text-lg">
              The seller panel provides sellers with tools to list properties, communicate with buyers, and track offers.
            </p>
          </div>

          <div className="border p-6 rounded-lg shadow-md bg-white text-gray-900">
            <h3 className="text-2xl font-semibold mb-2">Lawyer Panel</h3>
            <p className="text-lg">
              The lawyer panel ensures legal professionals can assist in reviewing contracts, verifying documents, and facilitating the transaction process.
            </p>
          </div>
        </div>
      </section>

      <footer className="mt-12 text-center">
        <p className="text-lg">
          For more information about our platform, please contact us or explore the <Link href="/contact" className="text-blue-500">Contact Us</Link> page.
        </p>
      </footer>
    </div>
  );
};

export default About;
