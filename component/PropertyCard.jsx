import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  } from "react-icons/fa";
import { FaLocationDot, FaMoneyBill1 } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

const PropertyCard = ({ property }) => {
  if (!property) return null;
  const { rates } = property;

  const rateDisplay = () => {
    if (rates.monthly) {
      return `N${rates.monthly}/mon`;
    } else if (rates.weekly) {
      return `N${rates.weekly}/wk`;
    } else if (rates.nightly) {
      return `N${rates.nightly}/night`;
    }
  };
  return (
    <div className="rounded-xl shadow-md relative">
      <Image
        src={
          !property.images?.[0]
            ? "/images/properties/a1.jpg"
            : property.images[0].startsWith("http")
              ? property.images[0]
              : `/images/properties/${property.images[0]}`
        }
        alt={property?.name || "property"}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto rounded-t-xl"
      />
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{property.type}</div>
          <h3 className="text-xl font-bold">{property.name}</h3>
        </div>
        <h3 className="absolute top-2.5 right-2.5 bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          {rateDisplay()}
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className="inline mr-2" /> {property.beds}
            <span className="md:hidden lg:inline">Beds</span>
          </p>
          <p>
            <FaBath className="inline mr-2" />
            {property.baths}
            <span className="md:hidden lg:inline">Baths</span>
          </p>
          <p>
            <FaRulerCombined className="inline mr-2" />
            {property.square_feet}
            <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          {rates.monthly && (
            <p>
              <FaMoneyBill className="inline mr-2" /> Monthly
            </p>
          )}
          {rates.weekly && (
            <p>
              <FaMoneyBill1 className="inline mr-2" /> Weekly
            </p>
          )}
          {rates.nightly && (
            <p>
              <FaMoneyBill1 className="inline mr-2" />
              mightly
            </p>
          )}
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaLocationDot className="fa-solid fa-location-dot text-lg text-orange-700" />
            <span className="text-orange-700">
              {""}
              {property.location.city} {property.location.state} {""}{" "}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-9 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
