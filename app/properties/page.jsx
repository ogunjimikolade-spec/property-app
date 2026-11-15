import Link from "next/link"
 import properties from '@/properties.json';
import PropertyCard from "@/component/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import SearchBar from "@/component/SearchBar";
import Pagination from "@/component/Pagination";



export default async function PropertiesPage({searchParams}) {
  await connectDB();

  const params = await searchParams;
  const page = parseInt(params.page) || 1;
  const pageSize = parseInt(params.pageSize) || 6;

  const skip = (page - 1) * pageSize;
  const total = await Property.countDocuments({});
  const properties = await Property.find({}).lean().skip(skip).limit(pageSize);
  return (
    <>
    <div>
     <SearchBar />  

    {/* <!-- All Listings --> */}
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* <!-- Listing Card --> */}
          
         { properties.length === 0 ? (
              <h1>No property found </h1>
            ) : (
             properties.map((property, index) => (
                <PropertyCard key={index} property={property} />
              ))
            )} 
       
        </div>
      </div>
    </section>

    {/* <!-- Pagination --> */}
    <section className="bg-blue-700 py-4">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start"
      >
        {/* <!-- Form Component --> */}
        <form
          className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center"
        >
          <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
            <label htmlFor="location" className="sr-only">Location</label>
            <input
              type="text"
              id="location"
              placeholder="Enter Location (City, State, Zip, etc"
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="w-full md:w-2/5 md:pl-2">
            <label htmlFor="property-type" className="sr-only">Property Type</label>
            <select
              id="property-type"
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="All">All</option>
              <option value="Apartment">Apartment</option>
              <option value="Studio">Studio</option>
              <option value="Condo">Condo</option>
              <option value="House">House</option>
              <option value="Cabin Or Cottage">Cabin or Cottage</option>
              <option value="Loft">Loft</option>
              <option value="Room">Room</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button
            type="submit"
            className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Search
          </button>
        </form>
      </div>
    </section>
      <Pagination  page={parseInt(page)} pageSize={parseInt(pageSize)} totalItems={total} />
    </div>
    </>
  )
}