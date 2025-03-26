
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SignUpForm from '@/components/auth/SignUpForm';

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-md">
          <SignUpForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUpPage;
