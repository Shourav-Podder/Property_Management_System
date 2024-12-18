"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ISellerPropertyToUpdate } from "@/APIcalling/userInterface";
import { SellerAPI } from "@/APIcalling/sellerAPI";
import { LawerAPI } from "@/APIcalling/lawerAPI";

interface User {
    _id: string;
    email: string;
    name: string;
    password: string;
}



const ManageProperty = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [deleteUserId, setDeleteUserId] = useState('');

    useEffect(() => {
        fetch(`/all-user`)
            .then(res => res.json())
            .then(data => setUsers(data.users))
    }, [])

    const [properties, setProperties] = useState<ISellerPropertyToUpdate[]>([]);
    useEffect(() => {
        SellerAPI.handleGetSellerPropertiesFromDB().then(res => {
            // Filter the pending posts (properties with condition 'pending')
            const pendingProperties = res.data.filter((property: ISellerPropertyToUpdate) => property.condition === 'approved');
            setProperties(pendingProperties);
        });
    }, []);

    const handleDeleteUser = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/property/delete-property`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json", // Ensure the server knows it's JSON data
                },
                body: JSON.stringify({ userId: deleteUserId }), // Sending the userId in the request body
            });
    
            if (response) {
                setProperties((prevUsers) => prevUsers.filter((user) => user._id !== deleteUserId));
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
        <div className="px-4 sm:px-6 md:px-8  lg:px-12 xl:px-16 2xl:px-20 py-8">
            <div>
                <div className="overflow-x-auto">
                    <table className="table bg-gray-400 text-black">
                        {/* head */}
                        <thead>
                            <tr className="text-black">
                                <th>SL</th>
                                <th>Property</th>
                                <th>Uploader</th>
                                <th>Condition</th>
                                <th>Status</th>
                                <th>Location</th>
                                <th>Approved By</th>
                                <th>Price</th>
                                <th>Action Button</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                properties.map((user, index) => <tr key={index} className="bg-gray-300">
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex gap-x-4">
                                            <img src={user?.image[0]} alt="Product Image" className='w-12 h-12 rounded-md' />

                                            <div>
                                                <p className=" font-bold">{user?.propertyName}</p>
                                                <p>{user?.propertyType}</p>
                                            </div>
                                        </div>

                                    </td>

                                    <td>
                                        <div className="flex gap-x-4">
                                            <img src={user?.propertyOwner?.photo} alt="Product Image" className='w-12 h-12 rounded-md' />

                                            <div>
                                                <p className=" font-bold">{user?.propertyOwner?.name}</p>
                                                <p>{user?.propertyOwner?.email}</p>
                                            </div>
                                        </div>

                                    </td>
                                    <td>{user?.condition}</td>
                                    <td>{user?.status}</td>
                                    <td>{user?.location}</td>
                                    <td><div>
                                        <h1>{user?.approvedByLawerName}</h1>
                                        <h1>{user?.approvedByLawerEmail}</h1>
                                    </div></td>
                                    <td>{user?.price}</td>
                                    <td>
                                        <div className="flex gap-x-2">
                                           
                                            <button onClick={() => {
                                                    LawerAPI?.handleGetAndUpdateSellerProperty({id: user?._id, condition: 'rejected'})
                                                    window?.location?.reload();
                                                }}
                                                type="button"
                                                className="w-32 bg-yellow-600 hover:bg-yellow-500 text-white py-2 rounded">
                                                Reject
                                            </button>


                                            <button onClick={() => {
                                                setDeleteUserId(user?._id);
                                                const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null;
                                                if (modal) {
                                                    modal.showModal();
                                                } else {
                                                    console.error("Modal element not found!");
                                                }
                                            }}
                                                type="button"
                                                className="w-32 bg-red-600 hover:bg-red-500 text-white py-2 rounded">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>)
                            }

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

        </div>
    );
};

export default ManageProperty;
