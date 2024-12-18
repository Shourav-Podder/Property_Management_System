'use client'

import React, { useState } from 'react';

import CommunityComponentCSS from '../../style/Home.module.css';
import HomeComponentCss from '../../style/ComponentStyle.module.css';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import { SellerAPI } from '@/APIcalling/sellerAPI';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const propertTypes = [
    'Apartment',
    'Townhouse',
    'Single-Family Home',
    'Multi-Family Home',
    'Villa',
    'Penthouse',
    'Duplex',
    'Bungalow',
    'Cottage',
    'Farmhouse',
    'Ranch',
    'Mansion',
    'Studio',
    'Loft',
    'Commercial Property',
    'Retail Space',
    'Office Building',
    'Warehouse',
    'Land', 'Industrial Property','Vacation Home','Mobile Home']

const SellProperty: React.FC = () => {

    // The states
    const [propertyName, setPropertyName] = useState('');
    const [price, setPrice] = useState('');
    const [location, setlocation] = useState('');
    const [bedrooms, setBedrooms] = useState('0');
    const [bahtrooms, setBathrooms] = useState('0');
    const [size, setSize] = useState('');
    const [year, setYear] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [status, setStatus] = useState('');
    const [description, setPropertyDescription] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [picture, setPicture] = useState<File | null>(null);
    const [hostedImage, setHostedImage] = useState<string[]>([]);

    


    const handlePropertySelling = async () => {
        const sellerOwner = localStorage.getItem('legalEstateUser');
        let parsedSellerOwner = null;
    
        if (sellerOwner) {
            parsedSellerOwner = JSON.parse(sellerOwner);
        } else {
            console.error('No legalEstateUser found in localStorage');
            return;  
        }
    
        const userData = {
            propertyName: propertyName,
            price: price,
            location: location,
            bedrooms: bedrooms,
            bahtrooms: bahtrooms,
            size: size,
            year: year,
            propertyType: propertyType,
            status: status,
            description: description,
            contactNumber: contactNumber,
            image: hostedImage,
            propertyOwner: parsedSellerOwner.data._id,
            condition: 'pending'
        };
    
        await SellerAPI.handleCreateSellerPropertyToDB(userData).then((res) => {
            if(res){
                toast.success('Successfully uploaded', {
                    autoClose: 2000,
                  });
            }
            console.log(res);
        });
    };
    


    // Hosting the image to the third party. 
    if (picture) {
        const formDataImage = new FormData();
        formDataImage.append("image", picture);
        fetch('https://api.imgbb.com/1/upload?key=1f2e07ae412954d520f52351b07dee66', {
            method: 'POST',
            body: formDataImage,
        })
            .then((res) => res.json())
            .then((result) => {
                setHostedImage((prevImages) => [...prevImages, result.data.display_url]);
            });
        setPicture(null);
    }

    const handleRemoveImage = (getImage: string) => {
        const restImage = hostedImage.filter(img => img !== getImage);
        setHostedImage(restImage);
    }
       
    return (
        <div style={{
            borderRadius: "5px",
            background: "black",
            backgroundSize: "100%",
            border: '1px solid white',
            backgroundRepeat: "repeat",
        }} className='mt-[20px] md:w-[70%] lg:w-[60%] w-full'>

            <div className='mb-6'>
                <h2 className='text-2xl mb-2 lg:text-5xl pt-2 md:text-3xl text-white flex justify-center'>Property Details</h2>
            </div>

            <div className='p-1 sm:p-2 md:p-3 lg:p-4 xl:p-5'>
                <div>
                    <h1 className='mb-1'>Property name<span className='text-red-700 text-xl pt-1'> *</span></h1>
                    <div className={`flex items-center`}>
                        <input onChange={(e) => setPropertyName(e.target.value)}
                            style={{
                                borderRadius: "4px",
                                background: 'white',
                            }}
                            placeholder="e.g: Shourav Kuthir"
                            className="w-full h-[45px] focus:outline-none border-0 pl-1 text-black"
                            type="text"
                            name=""
                            id=""
                        />
                    </div>
                </div>


                <div className='my-2'>
                    <h1 className='mb-1'>Property Location<span className='text-red-700 text-xl pt-1'> *</span></h1>
                    <div className={`flex items-center`}>
                        <input onChange={(e) => setlocation(e.target.value)}
                            style={{
                                borderRadius: "4px",
                                background: 'white',
                            }}
                            placeholder="e.g: Mirpur 10"
                            className="w-full h-[45px] focus:outline-none border-0 pl-1 text-black"
                            type="email"
                            name=""
                            id=""
                        />
                    </div>
                </div>


                <div className='my-2'>
                    <h1 className='mb-1'>Property Price<span className='text-red-700 text-xl pt-1'> *</span></h1>
                    <div className={`flex items-center`}>
                        <input onChange={(e) => setPrice(e.target.value)}
                            style={{
                                borderRadius: "4px",
                                background: 'white',
                            }}
                            placeholder="e.g: 120000 Taka"
                            className="w-full h-[45px] focus:outline-none border-0 pl-1 text-black"
                            type="number"
                            name=""
                            id=""
                        />
                    </div>
                </div>


                {/* Address */}
                <div className='my-2'>
                    <h1 className='mb-1'>No. of Bedrooms<span className='text-red-700 text-xl pt-1'> *</span></h1>
                    <div className={`flex items-center`}>
                        <input onChange={(e) => setBedrooms(e.target.value)}
                            style={{
                                borderRadius: "4px",
                                background: 'white',
                            }}
                            placeholder="e.g: 5 bedrooms"
                            className="w-full h-[45px] focus:outline-none border-0 pl-1 text-black"
                            type="text"
                            name=""
                            id=""
                        />
                    </div>
                </div>


                <div className='my-2'>
                    <h1 className='mb-1'>Bathrooms<span className='text-red-700 text-xl pt-1'> *</span></h1>
                    <div className={`flex items-center`}>
                        <input onChange={(e) => setBathrooms(e.target.value)}
                            style={{
                                borderRadius: "4px",
                                background: 'white',
                            }}
                            placeholder="e.g: 5 bathrooms"
                            className="w-full h-[45px] focus:outline-none border-0 pl-1 text-black"
                            type="text"
                            name=""
                            id=""
                        />
                    </div>
                </div>


                <div className='my-2'>
                    <h1 className='mb-1'>Size of sq ft<span className='text-red-700 text-xl pt-1'> *</span></h1>
                    <div className={`flex items-center`}>
                        <input onChange={(e) => setSize(e.target.value)}
                            style={{
                                borderRadius: "4px",
                                background: 'white',
                            }}
                            placeholder="e.g: 1500 sq ft"
                            className="w-full h-[45px] focus:outline-none border-0 pl-1 text-black"
                            type="text"
                            name=""
                            id=""
                        />
                    </div>
                </div>



                <div className='my-2'>
                    <h1 className='mb-1'>Property Building year<span className='text-red-700 text-xl pt-1'> *</span></h1>
                    <div className={`flex items-center`}>
                        <input onChange={(e) => setYear(e.target.value)}
                            style={{
                                borderRadius: "4px",
                                background: 'white',
                            }}
                            placeholder="e.g: 2002"
                            className="w-full h-[45px] focus:outline-none border-0 pl-1 text-black"
                            type="text"
                            name=""
                            id=""
                        />
                    </div>
                </div>



                <div className='my-2'>
                    <h1 className='mb-1'>Type of Property<span className='text-red-700 text-xl pt-1'> *</span></h1>
                    <div className={`flex items-center`}>
                        <select onChange={(e)=> setPropertyType(e.target.value)}  style={{
                                borderRadius: "4px",
                                
                            }} className="select select-primary w-full h-[45px] focus:outline-none border-0 pl-1 text-white">
                                {
                                    propertTypes.map((property: string, index)=> <option key={index}>{property}</option>)
                                }                            
                        </select>
                    </div>
                </div>


                <div className='mt-4'>
                    <h1 className='mb-1'>Description of Property <span className='text-red-700 text-xl pt-1'> *</span></h1>
                    <div style={{
                        borderRadius: "4px",
                        background: 'white',
                    }} className={`flex items-center`} >
                        <textarea style={{
                        borderRadius: "4px",
                        background: 'white',
                    }} onChange={(e) => setPropertyDescription(e.target.value)}
                            placeholder="Type more about your property"
                            className="w-full h-[75px] focus:outline-none border-0 pl-1 text-black bg-white"
                            name=""
                            id=""
                        />

                    </div>
                </div>




                <div className='mt-4'>
                    <h1 className='mb-1'>Contact Number <span className='text-red-700 text-xl pt-1'> *</span></h1>
                    <div style={{
                        borderRadius: "4px",
                        background: 'white',
                    }} className={`flex items-center`} >
                        <input style={{
                        borderRadius: "4px",
                        background: 'white',
                    }} onChange={(e) => setContactNumber(e.target.value)}
                            placeholder="Type your contact number"
                            className="w-full h-[45px] focus:outline-none border-0 pl-1 text-black bg-white"
                            type='number'
                            name=""
                            id=""
                        />

                    </div>
                </div>

                {/* Role */}

                <div className='grid md:flex justify-between items-center my-4 gap-y-2'>
                    <h1 className='mb-1'>Status of property<span className='text-red-700 text-xl pt-1'> *</span></h1>

                    <div className='flex gap-x-2'>
                        <input onChange={(e) => setStatus(e.target.value)} value='For Sell' type="radio" name="radio-2" className="radio radio-warning" />
                        <h1 className=''>For Sale</h1>
                    </div>

                    <div className='flex gap-x-2'>
                        <input onChange={(e) => setStatus(e.target.value)} value='For Rent' type="radio" name="radio-2" className="radio radio-warning" />
                        <h1 className=''>For Rent</h1>
                    </div>

                </div>


                {/* The iamge upload  */}
                <div className='flex items-center'>
                    <div className='w-full'>
                        <span>Upload Property Picture</span>

                        <div className='flex justify-between items-center my-2'>
                            <div className=''>
                                <div
                                    style={{
                                        borderRadius: '8px',
                                        border: '1px solid rgba(18, 18, 18, 0.16)',
                                        background: 'purple',
                                        color: 'black'
                                    }}
                                    className={`$${HomeComponentCss.customInputImageUpload} w-[120px] h-[120px] hover:cursor-pointer`}
                                >

                                    <input
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files.length > 0) {
                                                setPicture(e.target.files[0]);
                                            }
                                        }}
                                        style={{ position: "absolute", opacity: "0" }}
                                        type="file"
                                        className="h-[120px]"
                                    />

                                    <span className='flex justify-center mt-[32px]'><AiOutlineCloudUpload size={35} color={'white'}></AiOutlineCloudUpload></span>
                                    <p className="flex justify-center text-white">
                                        Click to upload
                                    </p>
                                </div>
                            </div>

                            <div className='grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 m-[24px]'>
                            {
                                hostedImage?.map((image, index) => <div key={index} style={{ position: 'relative' }}>
                                    <span onClick={() => handleRemoveImage(image)} style={{ position: 'absolute', top: '5px', right: '5px' }}><RxCross1 size={25} color={'red'}></RxCross1></span>
                                    <img
                                        className="w-[120px] h-[120px] rounded-sm"
                                        src={image}
                                        alt=""
                                    />
                                </div>)
                            }
                        </div>
                        </div>

                    </div>

                </div>

                <div className='my-4 flex justify-end'>
                    <button onClick={handlePropertySelling} className={`btn border-0 btn-md w-[200px] normal-case ${CommunityComponentCSS.orderExtraItemButton}`}>Submit Property</button>
                </div>

                <div className='flex justify-center'>
                    <p className='text-white'>A lawer will review your property and then it will be published. </p>
                </div>

            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default SellProperty;
