import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const InfoPage = () => {
  const { type } = useParams(); // Gets 'terms', 'privacy', or 'contact' from URL

  const content = {
    terms: {
      title: "Terms of Service",
      text: "Welcome to Pitch Master. By using our services, you agree to build fair squads and respect the tactical decisions of others. Do not abuse the transfer market algorithm."
    },
    privacy: {
      title: "Privacy Policy",
      text: "We value your privacy. Your team tactics, scout reports, and locker room secrets are safe with us. We do not sell your formation data to rival clubs."
    },
    contact: {
      title: "Contact Us",
      text: "Need help with your squad? Found a bug in the pitch? Email our support team at support@pitchmaster.com or visit our HQ at the Digital Stadium."
    }
  };

  const data = content[type] || content.terms;

  return (
    <div className="flex flex-col min-h-screen bg-background-dark font-display text-white">
      <Navbar />
      
      <main className="flex-grow px-4 py-20 flex justify-center">
        <div className="max-w-2xl w-full bg-surface-dark border border-border-light p-8 rounded-xl shadow-2xl h-fit">
          <h1 className="text-3xl font-bold mb-6 text-primary">{data.title}</h1>
          <p className="text-gray-300 leading-relaxed text-lg mb-8">
            {data.text}
          </p>
          <Link to="/">
            <button className="px-6 py-2 border border-white/20 rounded hover:bg-white/10 transition-colors">
              &larr; Back to Pitch
            </button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InfoPage;