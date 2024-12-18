import React, { useEffect, useState } from 'react';
import { SellerAPI } from '@/APIcalling/sellerAPI';
import { ISellerPropertyToSell, ISellerPropertyToUpdate } from '@/APIcalling/userInterface';
import CommunityComponentCSS from '../../style/Home.module.css';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '@/constants/routeConstant';

const CheckoutProperty = () => {
    const router = useRouter();
    const [properties, setProperties] = useState<ISellerPropertyToSell[]>([]);
    const [propertiesToBeSold, setPropertiesToBeSold] = useState<ISellerPropertyToSell[]>([]);
    const [status, setStatus] = useState<string>('All');

    const [singleProperty, setSingleProperty] = useState<ISellerPropertyToSell | undefined>();

    useEffect(() => {
        SellerAPI.handleGetSellerPropertiesFromDB().then(res => {
            // Only approved post will be shown here...............................................
            const pendingProperties = res.data.filter((property: ISellerPropertyToUpdate) => property.condition === 'approved');
            setProperties(pendingProperties);
            setPropertiesToBeSold(pendingProperties);
        });
    }, []);

    useEffect(() => {
        if (status === 'All') {
            setPropertiesToBeSold(properties);
        } else if (status === 'For Sell') {
            const sellableProperty = properties.filter(sell => sell.status === 'For Sell');
            setPropertiesToBeSold(sellableProperty);
        } else {
            const rentableProperty = properties.filter(rent => rent.status === 'For Rent');
            setPropertiesToBeSold(rentableProperty);
        }
    }, [status])

    console.log(properties);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex(currentIndex + 1)
    };

    const handlePrevious = () => {
        setCurrentIndex(currentIndex - 1);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [trxId, setTrxId] = useState("");

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleTrxIdSubmit = async () => {
        const storedUserData = localStorage.getItem("legalEstateUser");
    
        if (!storedUserData) {
            alert("No user data found in local storage.");
            return;
        }
    
        try {
            const userData = JSON.parse(storedUserData);
            const orderPayload = {
                singleProperty: singleProperty,
                trxId: trxId,
                user: userData,
            };
    
            // Check if "order" array exists in localStorage
            const storedOrders = localStorage.getItem("order");
            let orderArray = [];
    
            if (storedOrders) {
                orderArray = JSON.parse(storedOrders);
            }
    
            // Add the new order to the array
            orderArray.push(orderPayload);
    
            // Save the updated order array back to localStorage
            localStorage.setItem("order", JSON.stringify(orderArray));
            alert("Order placed successfully!");
    
            if (trxId) {
                console.log("Order Payload:", orderPayload); // Replace with actual API call
                setIsModalOpen(false);
            } else {
                alert("Please provide a transaction ID.");
            }
        } catch (error) {
            console.error("Error parsing data:", error);
            alert("Invalid data in local storage.");
        }
    };
    

    return (
        <div>
            {
                singleProperty ? <div className="container mx-auto px-4 py-8">
                    <div className="">
                        <p className='text-xl font-bold text-red-600 mb-4 cursor-pointer' onClick={() => setSingleProperty(undefined)}>{"<--"} Back</p>
                        <div className="flex justify-between items-center mb-2">

                            <p
                                className="hover:cursor-pointer font-bold"
                                onClick={handlePrevious}
                            >
                                Previous
                            </p>
                            <p
                                className="hover:cursor-pointer font-bold"
                                onClick={handleNext}
                            >
                                Next
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img
                                className="w-full h-hull object-cover"
                                src={singleProperty.image[currentIndex]} // Display the image based on the current index
                                alt={singleProperty.propertyName}
                            />
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold mb-2">{singleProperty.propertyName}</h2>
                                <p className="text-gray-600 mb-4">{singleProperty.description}</p>

                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
                                    <div>
                                        <span className="font-bold">Location:</span> {singleProperty.location}
                                    </div>
                                    <div>
                                        <span className="font-bold">Price:</span> ${singleProperty.price}
                                    </div>
                                    <div>
                                        <span className="font-bold">Bedrooms:</span> {singleProperty.bedrooms}
                                    </div>
                                    <div>
                                        <span className="font-bold">Bathrooms:</span> {singleProperty.bahtrooms}
                                    </div>
                                    <div>
                                        <span className="font-bold">Size:</span> {singleProperty.size} sq.ft.
                                    </div>
                                    <div>
                                        <span className="font-bold">Year Built:</span> {singleProperty.year}
                                    </div>
                                    <div>
                                        <span className="font-bold">Property Type:</span> {singleProperty.propertyType}
                                    </div>
                                    <div>
                                        <span className="font-bold">Status:</span> {singleProperty.status}
                                    </div>



                                </div>

                                <div className="mb-4">
                                    <p className="font-bold text-gray-700">Contact Information:</p>
                                    <p>{singleProperty.contactNumber}</p>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <img
                                        className="w-12 h-12 rounded-full"
                                        src={singleProperty?.propertyOwner?.photo}
                                        alt={singleProperty?.propertyOwner?.name}
                                    />
                                    <div>
                                        <p className="font-bold text-gray-900">{singleProperty?.propertyOwner?.name}</p>
                                        <p className="text-gray-600">{singleProperty?.propertyOwner?.email}</p>
                                    </div>
                                </div>

                                <div className="my-4">
                                    <div className='flex gap-x-2 items-center'>
                                        <div>
                                            <p className='font-bold'>Approved by: {singleProperty?.approvedByLawerName}</p>
                                            <p>Email: {singleProperty?.approvedByLawerEmail}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex justify-end'>
                                    <button onClick={handleOpenModal} className={`btn btn-md border border-black w-32 normal-case ${CommunityComponentCSS.orderExtraItemButton}`}>Buy Now</button>
                                </div>

                            </div>
                        </div>
                    </div>
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                <h2 className="text-lg font-bold mb-4">Payment Details</h2>

                                {/* Bkash Merchant Number */}
                                <p className="mb-4">
                                    <strong>Bkash Merchant Number:</strong> 01786310451
                                </p>

                                {/* Transaction ID Input */}
                                <label htmlFor="trxId" className="block text-sm font-medium mb-2">
                                    Enter Transaction ID: {trxId}
                                </label>
                                <input
                                    id="trxId"
                                    type="text"
                                    value={trxId}
                                    onChange={(e) => setTrxId(e.target.value)}
                                    className="w-full p-2 border rounded mb-4"
                                    placeholder="e.g., 12345678"
                                />

                                {/* Modal Actions */}
                                <div className="flex justify-end space-x-4">
                                    <button
                                        className="btn btn-sm border text-red-500"
                                        onClick={handleCloseModal}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-sm bg-green-600 text-white"
                                        onClick={handleTrxIdSubmit}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                    : <div>

                        {
                            propertiesToBeSold.length < 1 ? <div className='w-full h-full mt-12'>
                                <span className="loading loading-bars loading-lg flex justify-center items-center"></span>
                            </div> : <div>

                                <div>
                                    <div className='grid md:flex justify-between items-center my-4'>

                                        <div className='flex gap-x-2'>
                                            <input onChange={(e) => setStatus(e.target.value)} value='All' type="radio" name="radio-2" className="radio radio-warning" checked={status === 'All'} />
                                            <h1 className='text-black font-bold'>All</h1>
                                        </div>

                                        <div className='flex gap-x-2'>
                                            <input onChange={(e) => setStatus(e.target.value)} value='For Sell' type="radio" name="radio-2" className="radio radio-warning" />
                                            <h1 className='text-black font-bold'>For Sale</h1>
                                        </div>

                                        <div className='flex gap-x-2'>
                                            <input onChange={(e) => setStatus(e.target.value)} value='For Rent' type="radio" name="radio-2" className="radio radio-warning" />
                                            <h1 className='text-black font-bold'>For Rent</h1>
                                        </div>

                                    </div>
                                </div>


                                <div className='grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4'>
                                    {
                                        propertiesToBeSold.map((property: ISellerPropertyToSell, index: number) => <div key={index} className="card bg-base-100 image-full w-96 shadow-xl">
                                            <figure>
                                                <img className="h-full w-full object-cover"
                                                    src={property.image[0]}
                                                    alt={property.propertyName} />
                                            </figure>
                                            <div className="card-body">
                                                <h2 className="card-title text-xl font-semibold">{property.propertyName}</h2>

                                                <p className="mb-2">{property.description}</p>

                                                <div className="mb-2">
                                                    <span className="font-bold">Location:</span> {property.location}
                                                </div>

                                                <div className="mb-2">
                                                    <span className="font-bold">Price:</span> ${property.price}
                                                </div>

                                                <div className="mb-2 flex items-center justify-between gap-x-2">
                                                    <p className='border border-white flex justify-between px-2'><span className="font-bold">Bedrooms:</span> {property.bedrooms}</p>
                                                    <p className='border border-white flex justify-between px-2'><span className="font-bold">Bathrooms:</span> {property.bahtrooms}</p>

                                                </div>

                                                <div className="mb-2">
                                                    <span className="font-bold">Size:</span> {property.size} sq.ft.
                                                </div>

                                                <div className="mb-2">
                                                    <span className="font-bold">Year Built:</span> {property.year}
                                                </div>

                                                <div className="mb-2">
                                                    <span className="font-bold">Property Type:</span> {property.propertyType}
                                                </div>

                                                <div className="mb-2">
                                                    <span className="font-bold">Status:</span> {property.status}
                                                </div>

                                                <div className="mb-2">
                                                    <span className="font-bold">Contact:</span> {property.contactNumber}
                                                </div>

                                                <div className="mb-4">
                                                    <div className='flex gap-x-2 items-center'>
                                                        <img className="h-8 w-8 rounded-full"
                                                            src={property?.propertyOwner?.photo}
                                                            alt={property?.propertyName} />

                                                        <div>
                                                            <p className='font-bold'>{property?.propertyOwner?.name}</p>
                                                            <p>{property.propertyOwner?.email}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mb-4">
                                                    <div className='flex gap-x-2 items-center'>
                                                        <div>
                                                            <p className='font-bold'>Approved by: {property?.approvedByLawerName}</p>
                                                            <p>Email: {property?.approvedByLawerEmail}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="card-actions justify-end">
                                                    <button onClick={() => {
                                                        setSingleProperty(property)
                                                    }} className={`btn border-0 btn-md w-full normal-case ${CommunityComponentCSS.orderExtraItemButton}`}>Explore</button>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    }

                                </div>

                            </div>

                        }

                    </div>
            }



        </div>

    );
};

export default CheckoutProperty;
