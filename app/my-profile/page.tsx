"use client";

import { UserAPI } from "@/APIcalling/userAPI";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Define the User interface
interface User {
    address: string;
    lawerCode: string;
    email: string;
    name: string;
    password: string;
    phone: string;
    photo: string;
    role: string;
    __v: number;
    _id: string;
}

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [editing, setEditing] = useState(false); 
    const [updatedUser, setUpdatedUser] = useState<User | null>(null);

    useEffect(() => {
        const value = localStorage.getItem("legalEstateUser");
        if (value) {
            const parsedValue = JSON.parse(value);
            // Extract the data object if the status is success
            if (parsedValue?.data) {
                setUser(parsedValue.data);
                setUpdatedUser(parsedValue.data); // Initialize the updatedUser state
            }
        }
    }, []);

    console.log(user); 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (updatedUser) {
            setUpdatedUser({
                ...updatedUser,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleUpdate = async () => {
        if (updatedUser) {
            setUser(updatedUser);
            localStorage.setItem(
                "legalEstateUser",
                JSON.stringify({ status: "success", data: updatedUser })
            );
            setEditing(false);
            //   Backend functionality for update
            await UserAPI.handleUserUpdate(updatedUser?._id, updatedUser).then(res => {
                if (res) {
                    toast.success('Profil updated successfully.', {
                        autoClose: 2000,
                    });
                }
            })
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-400 text-lg">Loading user data...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-10 px-4">
            <div className="max-w-3xl mx-auto bg-black shadow-lg rounded-lg shadow-black">
                {/* Profile Header */}
                <div className="flex p-6 border-b gap-6">
                    
                    <img
                        src={user.photo}
                        alt={`${user.name} profile picture`}
                        className="rounded-full w-24 h-24"
                    />
                    <div>
                        <h1 className="text-2xl font-bold mt-4 text-white">{user.name}</h1>
                        <p className="text-white text-sm">Role: {user.role === 'Lawer' ? `Lawyer | code: ${user?.lawerCode}` : user.role}</p>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <h2 className="text-white font-semibold">Name</h2>
                            {editing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={updatedUser?.name || ""}
                                    onChange={handleInputChange}
                                    className="bg-gray-800 text-white border border-gray-700 rounded px-2 py-1 w-full"
                                />
                            ) : (
                                <p className="text-gray-300">{user.name}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <h2 className="text-white font-semibold">Email</h2>
                            <p className="text-gray-300">{user.email}</p>
                        </div>

                        {/* Phone */}
                        <div>
                            <h2 className="text-white font-semibold">Phone</h2>
                            {editing ? (
                                <input
                                    type="text"
                                    name="phone"
                                    value={updatedUser?.phone || ""}
                                    onChange={handleInputChange}
                                    className="bg-gray-800 text-white border border-gray-700 rounded px-2 py-1 w-full"
                                />
                            ) : (
                                <p className="text-gray-300">{user.phone}</p>
                            )}
                        </div>

                        {/* Address */}
                        <div>
                            <h2 className="text-white font-semibold">Address</h2>
                            {editing ? (
                                <input
                                    type="text"
                                    name="address"
                                    value={updatedUser?.address || ""}
                                    onChange={handleInputChange}
                                    className="bg-gray-800 text-white border border-gray-700 rounded px-2 py-1 w-full"
                                />
                            ) : (
                                <p className="text-gray-300">{user.address}</p>
                            )}
                        </div>

                        {/* Role */}
                        <div>
                            <h2 className="text-white font-semibold">Role</h2>
                            {editing ? (
                                <input
                                    type="text"
                                    name="role"
                                    value={updatedUser?.role || ""}
                                    onChange={handleInputChange}
                                    className="bg-gray-800 text-white border border-gray-700 rounded px-2 py-1 w-full"
                                />
                            ) : (
                                <p className="text-gray-300">{user.role === 'Lawer' ? 'Lawyer' : user.role}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <h2 className="text-white font-semibold">Password</h2>
                            {editing ? (
                                <input
                                    type="password"
                                    name="password"
                                    value={updatedUser?.password || ""}
                                    onChange={handleInputChange}
                                    className="bg-gray-800 text-white border border-gray-700 rounded px-2 py-1 w-full"
                                />
                            ) : (
                                <p className="text-gray-300">••••••••</p>
                            )}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex justify-end gap-4">
                        {editing ? (
                            <>
                                <button
                                    onClick={() => setEditing(false)}
                                    className="bg-red-600 text-white px-4 py-1 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdate}
                                    className="bg-green-600 text-white px-4 py-1 rounded"
                                >
                                    Update
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setEditing(true)}
                                className="bg-blue-600 text-white px-4 py-1 rounded"
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
}
