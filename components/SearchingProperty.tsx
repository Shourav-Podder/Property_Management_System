import React from 'react';
import { FcElectricity } from "react-icons/fc";
import { CiDollar } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { MdOutlineSecurity } from "react-icons/md";


const SearchingComponent = () => {
    return (
        <div className="z-50 relative flex justify-center mt-[-100px] px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32 2xl:px-36">
            <div className="bg-white p-6 shadow-lg rounded-xl w-full mx-8">
                {/* Toggle Buttons */}
                <div className="flex justify-start mb-4">
                    <button className="px-6 py-2 text-white bg-black rounded-l-lg">BUY</button>
                    <button className="px-6 py-2 bg-white border border-black text-black rounded-r-lg">RENT</button>
                </div>

                {/* Main Search Card */}
                <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                    {/* Location Section */}
                    <div className="flex items-center space-x-2 border-r pr-4">
                        <div className="text-xl">
                            <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Location</p>
                            <p className="text-black font-medium">Dhaka, Bangladesh</p>
                        </div>
                    </div>

                    {/* Property Type Section */}
                    <div className="flex items-center space-x-2 border-r px-4">
                        <div className="text-xl">
                            <i className="fas fa-home"></i>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Property Type</p>
                            <p className="text-black font-medium">DELUX</p>
                        </div>
                    </div>

                    {/* Price Section */}
                    <div className="flex items-center space-x-2 pr-4">
                        <div className="text-xl">
                            <i className="fas fa-tags"></i>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Price</p>
                            <p className="text-black font-medium">100000-500000 ৳</p>
                        </div>
                    </div>

                    {/* Search Button */}
                    <button className="px-6 py-2 text-white bg-black rounded-lg">Search</button>
                </div>

                {/* Features Section */}
                <div className="grid grid-cols-4 gap-4 mt-8">
                    {/* Feature Item */}
                    <div className="flex flex-col items-center space-y-2">
                        <div className="p-4 bg-white shadow-lg rounded-lg">
                            <span><FcElectricity size={30}></FcElectricity></span>
                        </div>
                        <p className="font-medium">High Quality</p>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                        <div className="p-4 bg-white shadow-lg rounded-lg">
                            <span><CiDollar size={30}></CiDollar></span>
                        </div>
                        <p className="font-medium">Best Price</p>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                        <div className="p-4 bg-white shadow-lg rounded-lg">
                            <span><CiLight size={30}></CiLight></span>
                        </div>
                        <p className="font-medium">Luxury</p>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                        <div className="p-4 bg-white shadow-lg rounded-lg">
                            <span><MdOutlineSecurity size={30}></MdOutlineSecurity></span>
                        </div>
                        <p className="font-medium">Secured</p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SearchingComponent;
