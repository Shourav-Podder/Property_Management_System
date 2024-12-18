"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AdminAPI } from "@/APIcalling/adminAPI";
import Image from "next/image";

export interface UserResponseForAdmin {
    _id: string;
    email: string;
    name: string;
    password: string;
    phone?: number; // Optional if not always present
    address?: string;
    photo?: string;
    role?: string;
    __v?: number;
}




const ManageUser = () => {
    const [users, setUsers] = useState<UserResponseForAdmin[]>([]);
    useEffect(() => {
        AdminAPI.getAllUserForAdmin().then(res => {
            setUsers(res?.data)
        });
    }, []);

    console.log(users);

    const [deleteUserId, setDeleteUserId] = useState('');

    const handleDeleteUser = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/user/delete-user`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json", // Ensure the server knows it's JSON data
                },
                body: JSON.stringify({ userId: deleteUserId }), // Sending the userId in the request body
            });
    
            if (response) {
                setUsers((prevUsers) => prevUsers.filter((user) => user._id !== deleteUserId));
                const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null;
                if (modal) {
                    modal.close();
                }
                toast.success("User deleted successfully!");
            } else {
                toast.error("Failed to delete user");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("An error occurred while deleting the user");
        }
    };
    

    return (
        <div className="px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32 2xl:px-36 py-8 ">
            <div>
                <div className="overflow-x-auto">
                    <table className="table bg-gray-400 text-black">
                        {/* head */}
                        <thead>
                            <tr className="text-black">
                                <th>SL</th>
                                <th>User</th>
                                <th>Contact</th>
                                <th>Role</th>
                                <th>Address</th>
                                <th>Action Button</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index} className="bg-gray-300">
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex gap-x-4">
                                        <img src={user?.photo} alt="Product Image" className='w-12 h-12 rounded-md' />
                                           
                                            <div>
                                                <p className=" font-bold">{user?.name}</p>
                                                <p>{user?.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user?.phone}</td>
                                    <td>{user?.role}</td>
                                    <td>{user?.address}</td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                setDeleteUserId(user?._id);
                                                const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null;
                                                if (modal) {
                                                    modal.showModal();
                                                } else {
                                                    console.error("Modal element not found!");
                                                }
                                            }}
                                            type="button"
                                            className="w-32 bg-red-600 hover:bg-red-500 text-white py-2 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>

            <dialog id="my_modal_3" className="modal">
                <div className="modal-box bg-black">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg flex justify-center text-white">Are you sure? </h3>
                    <button onClick={handleDeleteUser}
                        type="button"
                        className="w-full mt-4 bg-red-600 hover:bg-red-500 text-white py-2 rounded">
                        Delete
                    </button>
                    <p className="py-4 flex justify-center">Press ESC key or click on ✕ button to close</p>
                </div>
            </dialog>
<ToastContainer></ToastContainer>
        </div>
    );
};

export default ManageUser;
