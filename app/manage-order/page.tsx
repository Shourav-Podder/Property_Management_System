"use client";
import React, { useEffect, useState } from "react";

const ManageOrder = () => {
    const [orders, setOrders] = useState<any[]>([]); // State to store the orders

    useEffect(() => {
        // Fetch orders from localStorage when the component mounts
        const storedOrders = localStorage.getItem("order");
        if (storedOrders) {
            setOrders(JSON.parse(storedOrders));
        }
    }, []);

    return (
        <div className="px-4 sm:px-6 md:px-8  lg:px-12 xl:px-16 2xl:px-20 py-8 h-screen">
            <div>
                <div className="overflow-x-auto">
                    <table className="table bg-gray-400 text-black">
                        {/* Head */}
                        <thead>
                            <tr className="text-black">
                                <th>SL</th>
                                <th>Property Name</th>
                                <th>Property Id</th>
                                <th>User Name</th>
                                <th>Email</th>
                                <th>Transaction ID</th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map((order, index) => (
                                    <tr key={index} className="bg-gray-300">
                                        <th>{index + 1}</th>
                                        <td>{order.singleProperty?.propertyName || "N/A"}</td>
                                        <td>{order.singleProperty?._id || "N/A"}</td>
                                        <td>{order.user?.data?.name || "N/A"}</td>
                                        <td>{order.user?.data?.email || "N/A"}</td>
                                        <td>{order.trxId || "N/A"}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center text-black">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageOrder;
