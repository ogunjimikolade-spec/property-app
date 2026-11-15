import {notfound} from "next/navigation";
import HeaderImage from "@/component/HeaderImage";
import SearchBar from "@/component/SearchBar";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import Link from "next/link";
import PropertyImages from "@/component/PropertyImages";
import Sidebar from "@/component/Sidebar";
import {
  FaArrowLeft,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTimes,
  FaCheck,
  FaMapMarker,
} from "react-icons/fa";

async function PropertyPage({ params }) {
  await connectDB();
  const { id } = await params;
  // const cat = await searchParams;

  
  const propertyDoc = await Property.findById(id).lean();
  
  if (!propertyDoc) {
    return notfound();
  }
  const property = JSON.parse(JSON.stringify(propertyDoc));
  return (
    <>
      {/* <!-- Search --> */}

      <SearchBar />

      {/* <!-- Property Header Image --> */} 
       {/* <section>
        <div className="container-xl m-auto">
          <div className="grid grid-cols-1">
            <img
              src={`/images/properties/${property.images[0]}`}
              alt=""
              className="object-cover h-100 w-full"
              width="1800"
            />
          </div>
        </div>
      </section> */}
     <HeaderImage image={propertyDoc.images?.[0]} />
      {/* <!-- Go Back --> */}
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <i className="fas fa-arrow-left mr-2"></i> Back to Properties
          </Link>
        </div>
      </section>

      {/* <!-- Property Info --> */}
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-6">
            <main className="md:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">{property.type}</div>
                <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <i className="fa-solid fa-location-dot text-lg text-orange-700 mr-2"></i>
                  <p className="text-orange-700">
                    {property.location.street}, {property.location.city}{" "}
                    {property.location.state}
                  </p>
                </div>

                <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
                  Rates & Options
                </h3>
                <div className="flex flex-col md:flex-row justify-around">
                  <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                    <div className="text-gray-500 mr-2 font-bold">Nightly</div>
                     {
                      property.rates.nightly ? (
                        <div className="text-2xl font-bold text-blue-500">
                      N{property.rates.nightly.toLocaleString()}
                    </div>
                      ) : (
                        <FaTimes className=" text-red-700"/>
                      )
                    }

                  </div>
                  <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                    <div className="text-gray-500 mr-2 font-bold">Weekly</div>
                    {
                      property.rates.weekly ? (
                        <div className="text-2xl font-bold text-blue-500">
                      N{property.rates.weekly.toLocaleString()}
                    </div>
                      ) : (
                        <FaTimes className=" text-red-700"/>
                      )
                    }
                   
                  </div>
                  <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
                    <div className="text-gray-500 mr-2 font-bold">Monthly</div>
                    {
                      property.rates.monthly ? (
                       <div className="text-2xl font-bold text-blue-500">
                      N{property.rates.monthly.toLocaleString()}
                    </div>
                      ) : (
                        <FaTimes className=" text-red-700"/>     
                      )
                    }
                    
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-bold mb-6">
                  Description & Details
                </h3>
                <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
                  <p>
                    <FaBed className="fa-solid inline mr-2" /> {property.beds}
                    <span className="hidden sm:inline">Beds</span>
                  </p>
                  <p>
                    <FaBath className="fa-solid inline mr-2 "/> {property.baths}
                    <span className="hidden sm:inline">Baths</span>
                  </p>
                  <p>
                    <FaRulerCombined className="fa-solid inline mr-2"/>
                    {property.square_feet}{" "}
                    <span className="hidden sm:inline">sqft</span>
                  </p>
                </div>
                <p className="text-gray-500 mb-4">{property.description}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-bold mb-6">Amenities</h3>

                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none">
                  {property.amenities.map((amenity, index) =>(
                       <li key={index}>
                    <FaCheck className=" text-green-600 mr-2 inline-block"/>
                    {amenity}
                  </li>
                  ))}
                 
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <div id="map"></div>
              </div>
            </main>

            {/* <!-- Sidebar --> */}
           <Sidebar property={property} />
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
}

export default PropertyPage;
