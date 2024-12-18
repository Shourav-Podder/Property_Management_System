import React, { useEffect, useState } from 'react';
import { SellerAPI } from '@/APIcalling/sellerAPI';
import { ISellerPropertyToSell, ISellerPropertyToUpdate } from '@/APIcalling/userInterface';
import CommunityComponentCSS from '../../style/Home.module.css';

const RejectedProperty = () => {
    const [properties, setProperties] = useState<ISellerPropertyToSell[]>([]);
    const [propertiesToBeSold, setPropertiesToBeSold] = useState<ISellerPropertyToSell[]>([]);
    const [status, setStatus] = useState<string>('All');

    const [rejectionMessage, setRejectionMessage] = useState('');

    useEffect(() => {
        SellerAPI.handleGetSellerPropertiesFromDB().then(res => {
            // Only pending post will be shown here...............................................

            const pendingProperties = res.data.filter((property: ISellerPropertyToUpdate) => property.condition === 'rejected');
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

    return (
        <div>

            {
                propertiesToBeSold.length < 1 ? <div className='w-full h-full mt-12'>
                    <span className="loading loading-bars loading-lg flex justify-center items-center"></span>
                </div> : <div>

                    <div>
                        <div className='grid md:flex justify-between items-center my-4'>

                            <div className='flex gap-x-2'>
                                <input onChange={(e) => setStatus(e.target.value)} value='All' type="radio" name="radio-2" className="radio radio-warning" checked={status === 'All'} />
                                <h1 className='font-bold text-black'>All</h1>
                            </div>

                            <div className='flex gap-x-2'>
                                <input onChange={(e) => setStatus(e.target.value)} value='For Sell' type="radio" name="radio-2" className="radio radio-warning" />
                                <h1 className='font-bold text-black'>For Sale</h1>
                            </div>

                            <div className='flex gap-x-2'>
                                <input onChange={(e) => setStatus(e.target.value)} value='For Rent' type="radio" name="radio-2" className="radio radio-warning" />
                                <h1 className='font-bold text-black'>For Rent</h1>
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

                                    <div className="card-actions justify-end">
                                        <button onClick={() => {
                                            setRejectionMessage(property?.rejectionMessage)
                                            const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null;
                                            if (modal) {
                                                modal.showModal();
                                            } else {
                                                console.error('Modal element with ID "my_modal_2" not found.');
                                            }
                                        }} className={`btn border-0 btn-md w-full normal-case ${CommunityComponentCSS.orderExtraItemButton}`}>Rejection Reason</button>
                                    </div>
                                </div>
                            </div>
                            )
                        }

                    </div>

                </div>

            }

            <dialog id="my_modal_3" className="modal">
                <div className="modal-box ">
                    <h1 className='mb-4 flex justify-center'>Reason for rejection</h1>
                    <p className='text-red-500 flex justify-center'>{rejectionMessage}</p>
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

export default RejectedProperty;
