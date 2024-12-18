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
import { BASE_URL } from "@/constants/routeConstant";

interface Message {
    _id: string;
    name: string;
    email: string;
    message: string;
    __v: number;
}



const ManageMessage = () => {
    const [totalMessage, setTotalMessage] = useState<Message[]>([]);
    useEffect(() => {
        fetch(`${BASE_URL}user/contact-message`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "success") {
                    setTotalMessage(data.data); // Update the state with the array of messages
                } else {
                    console.error("Failed to fetch messages:", data);
                }
            })
            .catch((error) => {
                console.error("Error fetching messages:", error);
            });
    }, []);

    return (
        <div className="px-4 sm:px-6 md:px-8  lg:px-12 xl:px-16 2xl:px-20 py-8 h-screen">
            <div>
                <div className="overflow-x-auto">
                    <table className="table bg-gray-400 text-black">
                        {/* head */}
                        <thead>
                            <tr className="text-black">
                                <th>SL</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Message</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                totalMessage.map((user, index) => <tr key={index} className="bg-gray-300">
                                    <th>{index + 1}</th>
                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <td>{user?.message}</td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default ManageMessage;
