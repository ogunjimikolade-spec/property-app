"use client";
import updateProperty from "@/app/actions/updateProperty";

const PropertyEditForm = ({ property }) => {
  const updatePropertyById = updateProperty.bind(null, property._id);

  return (
    <form action={updatePropertyById} className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
      <h2 className="text-3xl text-center font-semibold mb-6">Edit Property</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Property Type</label>
        <select name="type" defaultValue={property.type} className="border rounded w-full py-2 px-3" required>
          <option value="Apartment">Apartment</option>
          <option value="Condo">Condo</option>
          <option value="House">House</option>
          <option value="Cabin Or Cottage">Cabin or Cottage</option>
          <option value="Room">Room</option>
          <option value="Studio">Studio</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Listing Name</label>
        <input type="text" name="name" defaultValue={property.name} className="border rounded w-full py-2 px-3" required />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Description</label>
        <textarea name="description" defaultValue={property.description} className="border rounded w-full py-2 px-3" rows="4"></textarea>
      </div>

      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">Location</label>
        <input type="text" name="location.street" defaultValue={property.location.street} placeholder="Street" className="border rounded w-full py-2 px-3 mb-2" />
        <input type="text" name="location.city" defaultValue={property.location.city} placeholder="City" className="border rounded w-full py-2 px-3 mb-2" required />
        <input type="text" name="location.state" defaultValue={property.location.state} placeholder="State" className="border rounded w-full py-2 px-3 mb-2" required />
        <input type="text" name="location.zipcode" defaultValue={property.location.zipcode} placeholder="Zipcode" className="border rounded w-full py-2 px-3" />
      </div>

      <div className="mb-4 flex gap-4">
        <div className="w-1/3">
          <label className="block text-gray-700 font-bold mb-2">Beds</label>
          <input type="number" name="beds" defaultValue={property.beds} className="border rounded w-full py-2 px-3" required />
        </div>
        <div className="w-1/3">
          <label className="block text-gray-700 font-bold mb-2">Baths</label>
          <input type="number" name="baths" defaultValue={property.baths} className="border rounded w-full py-2 px-3" required />
        </div>
        <div className="w-1/3">
          <label className="block text-gray-700 font-bold mb-2">Sq Ft</label>
          <input type="number" name="square_feet" defaultValue={property.square_feet} className="border rounded w-full py-2 px-3" required />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Rates</label>
        <div className="flex gap-4">
          <input type="number" name="rates.weekly" defaultValue={property.rates.weekly} placeholder="Weekly" className="border rounded w-full py-2 px-3" />
          <input type="number" name="rates.monthly" defaultValue={property.rates.monthly} placeholder="Monthly" className="border rounded w-full py-2 px-3" />
          <input type="number" name="rates.nightly" defaultValue={property.rates.nightly} placeholder="Nightly" className="border rounded w-full py-2 px-3" />
        </div>
      </div>
       <div className="mb-4">
  <label className="block text-gray-700 font-bold mb-2">
    Amenities
  </label>
  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
    {[
      "Wifi", "Full kitchen", "Washer & Dryer", "Free Parking",
      "Swimming Pool", "Hot Tub", "24/7 Security", "Wheelchair Accessible",
      "Elevator Access", "Dishwasher", "Gym/Fitness Center", "Air Conditioning",
      "Balcony/Patio", "Smart TV", "Coffee Maker"
    ].map((amenity) => (
      <div key={amenity}>
        <input
          type="checkbox"
          id={`amenity_${amenity}`}
          name="amenities"
          value={amenity}
          className="mr-2"
          defaultChecked={property.amenities?.includes(amenity)}
        />
        <label htmlFor={`amenity_${amenity}`}>{amenity}</label>
      </div>
    ))}
  </div>
</div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Seller Info</label>
        <input type="text" name="seller_info.name" defaultValue={property.seller_info.name} placeholder="Name" className="border rounded w-full py-2 px-3 mb-2" />
        <input type="email" name="seller_info.email" defaultValue={property.seller_info.email} placeholder="Email" className="border rounded w-full py-2 px-3 mb-2" required />
        <input type="tel" name="seller_info.phone" defaultValue={property.seller_info.phone} placeholder="Phone" className="border rounded w-full py-2 px-3" />
      </div>

      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full">
        Update Property
      </button>
    </form>
  );
};

export default PropertyEditForm;
