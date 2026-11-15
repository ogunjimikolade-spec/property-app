import Image from 'next/image'
import ProfileImage from './ProfileImage';


const PropertyImages = ({ images = [] }) => {
  if (!images || images.length === 0) return null;

  return (
    <section className="bg-blue-50 p-4">
      {images?.length === 1 ? (
        <Image
          src={images[0]}
          alt=""
          className="object-cover h-100 w-full mx-auto rounded-xl"
          width={1000}
          height={400}
          priority
        />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {images?.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt=""
              className={`${images.length === 3 && index === 2 ? 'col-span-2' : 'col-span-1'} object-cover h-100 w-full mx-auto rounded-xl`}
              width={1000}
              height={400}
              priority
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default PropertyImages
