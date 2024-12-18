export interface IUserData {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  role: string;
}

export interface IUserLoginData {
  email: string,
  password: string
}






// Interface for the seller

export interface IPropertyOwner {
  _id: string;
  name: string;
  email: string;
  phone: number;
  address: string;
  photo: string;
}

export interface ISellerPropertyToSell {
  propertyName: string;
  price: string;
  location: string;
  bedrooms: string;
  bahtrooms: string;
  size: string;
  year: string;
  propertyType: string;
  status: string;
  description: string;
  contactNumber: string;
  image: string[];
  propertyOwner: IPropertyOwner;
  rejectionMessage: string;
  approvedByLawerName: string;
  approvedByLawerEmail: string;
}


export interface ISellerPropertyToSell {
  propertyName: string;
  price: string;
  location: string;
  bedrooms: string;
  bahtrooms: string;
  size: string;
  year: string;
  propertyType: string;
  status: string;
  description: string;
  contactNumber: string;
  image: string[];
  propertyOwner: {
    _id: string;
    name: string;
    email: string;
    phone: number;
    address: string;
    photo: string;
  };
  rejectionMessage: string;
  _id: string;
  approvedByLawerName: string;
  approvedByLawerEmail: string;
}



export interface ISellerPropertyToUpdate {
  propertyName: string;
  price: string;
  location: string;
  bedrooms: string;
  bahtrooms: string;
  size: string;
  year: string;
  propertyType: string;
  status: string;
  description: string;
  contactNumber: string;
  image: string[];
  propertyOwner: {
    _id: string;
    name: string;
    email: string;
    phone: number;
    address: string;
    photo: string;
  };
  _id: string;
  condition: string;
  approvedByLawerName: string;
  approvedByLawerEmail: string;
}



// Admin interface

// Interface for a single user object
export interface User {
  _id: string;         // MongoDB Object ID
  name: string;        // Name of the user
  email: string;       // User's email address
  phone: number;       // User's phone number
  address: string;     // Address of the user
  role: string;        // Role of the user (e.g., Seller, Buyer, Admin, Lawer)
  password: string;    // Password of the user
  photo: string;       // URL of the user's photo
  __v: number;         // Version key from MongoDB
}

// Interface for the API response
export interface UserResponseForAdmin {
  status: string;      // Status of the API response (e.g., "success")
  data: User[];        // Array of users
}
