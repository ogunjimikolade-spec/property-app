import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyEditForm from "@/component/PropertyEditForm";

const PropertyEditPage = async ({ params }) => {
  await connectDB();
  const {id} = await params;
  const propertyDoc = await Property.findById(id).lean();

  if (!propertyDoc) {
    return <div>Property not found</div>;
  }
const property = JSON.parse(JSON.stringify(propertyDoc));
  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <PropertyEditForm property={property} />
      </div>
    </section>
  );
};

export default PropertyEditPage;
