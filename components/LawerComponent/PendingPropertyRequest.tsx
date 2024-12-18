'use client'

import React, { useEffect, useState } from 'react';

import { SellerAPI } from '@/APIcalling/sellerAPI';
import { ISellerPropertyToUpdate } from '@/APIcalling/userInterface';
import { LawerAPI } from '@/APIcalling/lawerAPI';

const PerndingPropertyRequest: React.FC = () => {
    const [properties, setProperties] = useState<ISellerPropertyToUpdate[]>([]);
    const [documentURL, setDocumentUrl] = useState<string | string[]>('');
    const [rejectId, setRejectedId] = useState('');
    const [rejectionMEssage, setRejectionMessage] = useState('');

    useEffect(() => {
        SellerAPI.handleGetSellerPropertiesFromDB().then(res => {
            const pendingProperties = res.data.filter((property: ISellerPropertyToUpdate) => property.condition === 'pending');
            setProperties(pendingProperties);
        });
    }, []);

    const openModal = (url: string[]) => {
        console.log(url);
        setDocumentUrl(url);
        const modal = document.getElementById('my_modal_2') as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
            document.body.classList.add('modal-open'); // Disable body scrolling
        }
    };

    const closeModal = () => {
        const modal = document.getElementById('my_modal_2') as HTMLDialogElement | null;
        if (modal) {
            setDocumentUrl('');
            modal.close();
            document.body.classList.remove('modal-open'); // Enable body scrolling
        }
    };

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % documentURL.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? documentURL.length - 1 : prevIndex - 1
        );
    };
    console.log(documentURL);

    return (
        <div style={{
            borderRadius: "5px",
            background: "white",
            backgroundSize: "100%",
            backgroundRepeat: "repeat",
        }} className='my-[20px] w-full '>
            <div className={`overflow-x-auto ${documentURL ? 'hidden' : 'block'}`}>
                <table className="w-full divide-y divide-gray-200">
                    <thead className="text-black">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium ">SL</th>
                            <th className="px-6 py-3 text-left text-sm font-medium ">Property Name</th>
                            <th className="px-6 py-3 text-left text-sm font-medium ">Price</th>
                            <th className="px-6 py-3 text-left text-sm font-medium ">Type</th>
                            <th className="px-6 py-3 text-left text-sm font-medium ">Size</th>
                            <th className="px-6 py-3 text-left text-sm font-medium ">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-medium ">Building Year</th>
                            <th className="px-6 py-3 text-left text-sm font-medium ">Action</th>
                            <th className="px-6 py-3 text-left text-sm font-medium ">Document</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-black">
                        {
                            properties?.map((property, index) => <tr key={index}>
                                <td className="px-6 py-4 text-sm ">{index + 1}</td>
                                <td className="px-6 py-4 text-sm ">
                                    <div className='flex gap-x-2 items-center'>
                                        <img
                                            className="w-[60px] h-[45px] rounded-sm"
                                            src={property?.image[0]}
                                            alt=""
                                        />
                                        <span>{property?.propertyName}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm ">{property?.price}</td>
                                <td className="px-6 py-4 text-sm ">{property?.propertyType}</td>
                                <td className="px-6 py-4 text-sm ">{property?.size}</td>
                                <td className="px-6 py-4 text-sm ">{property?.status}</td>
                                <td className="px-6 py-4 text-sm ">{property?.year}</td>
                                <td className="px-6 py-4 text-sm ">
                                    <div className="flex gap-x-4">
                                        <button
                                            className="bg-green-500 text-white font-medium py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-all"
                                            onClick={() => {
                                                const storedData = localStorage.getItem("legalEstateUser");
                                                if (storedData) {
                                                  console.log("Raw data from localStorage:", storedData); // Debugging log
                                              
                                                  try {
                                                    const userData = JSON.parse(storedData); // Parse the JSON
                                                    const approvedByLawerName = userData?.data?.name;
                                                    const approvedByLawerEmail = userData?.data?.email;
                                                    LawerAPI?.handleGetAndUpdateSellerProperty({
                                                      id: property?._id,
                                                      condition: "approved",
                                                      approvedByLawerName,
                                                      approvedByLawerEmail,
                                                    });
                                                    window.location.reload(); 
                                                  } catch (error) {
                                                    console.error("Error parsing localStorage data:", error);
                                                  }
                                                } else {
                                                  console.error("No data found in local storage");
                                                }
                                              }}
                                              
                                        >
                                            Approved
                                        </button>

                                        <button
                                            className="bg-red-500 text-white font-medium py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all"
                                            onClick={() => {
                                                setRejectedId(property?._id)
                                                const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null;
                                                if (modal) {
                                                    modal.showModal();
                                                } else {
                                                    console.error('Modal element with ID "my_modal_2" not found.');
                                                }
                                            }}

                                        // onClick={() => {
                                        //     LawerAPI?.handleGetAndUpdateSellerProperty({ id: property?._id, condition: 'rejected' });
                                        //     window?.location?.reload();
                                        // }}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <button
                                        className="bg-red-500 text-white font-medium py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all"
                                        onClick={() => openModal(property?.image)}
                                    >
                                        Check Document
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>


            <dialog id="my_modal_2" className={`modal`}>
                <div className="modal-box bg-transparent shadow-none relative">
                    {/* Close Button */}
                    <button
                        className="absolute top-2 right-2 bg-red-500 text-white font-medium py-1 px-2 rounded hover:bg-red-600"
                        onClick={closeModal}
                    >
                        Close
                    </button>

                    {/* Left Arrow */}
                    <button
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full hover:bg-gray-700"
                        onClick={handlePrevious}
                    >
                        &larr;
                    </button>

                    {/* Image */}
                    <img
                        className="w-full h-auto rounded-sm"
                        src={documentURL[currentIndex]}
                        alt={`Document ${currentIndex + 1}`}
                    />

                    {/* Right Arrow */}
                    <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full hover:bg-gray-700"
                        onClick={handleNext}
                    >
                        &rarr;
                    </button>
                </div>

                <form
                    method="dialog"
                    className="modal-backdrop bg-black bg-opacity-50"
                    onClick={closeModal}
                />
            </dialog>



            <dialog id="my_modal_3" className="modal">
                <div className="modal-box ">
                    <h1 className='mb-4'>Type your remark</h1>
                    <input style={{
                        borderRadius: "4px",
                        background: 'white',
                    }}
                        placeholder="Type your remark"
                        className="w-full h-[45px] focus:outline-none border-0 pl-1 text-black bg-white"
                        type='text'
                        name=""
                        id=""
                        onChange={(e) => setRejectionMessage(e.target.value)}
                    />
                    <div className='flex justify-end mt-4'>
                        {
                            rejectionMEssage && <button
                                className="bg-red-500 text-white font-medium py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all"
                                onClick={() => {
                                    LawerAPI?.handleGetAndUpdateSellerProperty({ id: rejectId, condition: 'rejected', rejectionMessage: rejectionMEssage });
                                    window?.location?.reload();
                                }}
                                disabled={!rejectionMEssage}
                            >
                                Reject
                            </button>
                        }

                    </div>
                </div>
                <form method="dialog" className="modal-backdrop" onClick={() => {
                    const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null;
                    if (modal) {
                        modal.close();
                    } else {
                        console.error('Modal element with ID "my_modal_2" not found.');
                    }
                }}>
                    <button>close</button>
                </form>
            </dialog>


        </div>
    );
};

export default PerndingPropertyRequest;
