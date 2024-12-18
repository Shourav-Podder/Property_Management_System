import React from 'react';
import Image from 'next/image'; // Import next/image for handling images
import houseImage1 from '../assets/country-cottage-woodall-3-front-exterior__99723.original.jpg';
import houseImage2 from '../assets/hero-image.jpg';
import houseImage3 from '../assets/pexels-binyaminmellish-186077.jpg';

const properties = [
    {
        id: 1,
        image: houseImage1,
        title: 'BANANI PLOT',
        description: 'Nibh praesent tristique magna sit amet purus grav ida quis blandit. Quam lacus suspendisse faucibus.',
        price: '5 cr.',
    },
    {
        id: 2,
        image: houseImage2,
        title: 'DHANMONDI HOUSE',
        description: 'Nibh praesent tristique magna sit amet purus grav ida quis blandit. Quam lacus suspendisse faucibus.',
        price: '8 cr.',
    },
    {
        id: 3,
        image: houseImage3,
        title: 'GULSHAN VILLA',
        description: 'Nibh praesent tristique magna sit amet purus grav ida quis blandit. Quam lacus suspendisse faucibus.',
        price: '15 cr.',
    },
];

const FeaturedProperties = () => {
    return (
        <section className="featured-properties px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32 2xl:px-36 pt-16 pb-8">
            <p className='text-black flex justify-start font-bold text-2xl'>-----Featured Properties</p>
            <div className='flex justify-between items-center'>
            <h2 className="text-black font-bold text-4xl mb-6">OUR BEST COLLECTION</h2>
            <button className={`border border-black bg-white text-black px-6 py-3 hover:bg-gray-400`}>View All</button>
            </div>
            <div className="properties-grid">
                {properties.map((property) => (
                    <div className="property-card" key={property.id}>
                        {/* Use next/image for image handling */}
                        <Image
                            src={property.image}
                            alt={property.title}
                            className="property-image"
                            width={300}
                            height={200}
                            objectFit="cover"
                        />
                        <h3 className="property-title">{property.title}</h3>
                        <p className="property-description">{property.description}</p>
                        <div className="property-footer">
                            <span className="property-price">{property.price}</span>
                            <a href="#" className="view-details">
                                View Details
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedProperties;
