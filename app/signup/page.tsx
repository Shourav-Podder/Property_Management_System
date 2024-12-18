"use client"

import { motion } from 'framer-motion'
import SignUpForm from '@/components/Authentication/SignUpForm';

export default function Home() {
  return (
    <motion.div className="h-full" initial={{ y: "-200vh" }} animate={{ y: "0%" }} transition={{ duration: 1 }}>
      <div className="flex justify-center px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 bg-black pb-8">
       <SignUpForm></SignUpForm>
      </div>
    </motion.div>
  );
}