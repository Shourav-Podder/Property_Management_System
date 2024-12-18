// pages/contact.tsx
"use client"

import { BASE_URL } from '@/constants/routeConstant';
import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    setFormStatus('Sending...');
  
    try {
      const response = await fetch(`${BASE_URL}user/contact-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(response); 
      if (response.ok) {
        setFormStatus('Message sent successfully!');
      } else {
        const errorData = await response.json();
        console.error('Error details:', errorData);
        setFormStatus('There was an error sending your message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setFormStatus('There was an error sending your message. Please try again.');
    }
  };
  

  return (
    <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32 2xl:px-36 text-white py-6">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl">
          Have questions or want to learn more? Reach out to us, and we’ll get back to you as soon as possible.
        </p>
      </header>

      <section className="mt-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400"
              placeholder="Your email address"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-lg font-semibold mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400"
              placeholder="Your message here..."
              rows={6}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full p-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold"
            >
              Send Message
            </button>
          </div>
        </form>

        {formStatus && (
          <div className="mt-6 text-center text-lg">
            <p className={formStatus === 'Sending...' ? 'text-yellow-500' : 'text-green-500'}>
              {formStatus}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Contact;
