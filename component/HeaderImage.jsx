const HeaderImage = ({ image }) => {
  return (
    <div>
      <img
        src={
          !image
            ? "/images/properties/a1.jpg"
            : image.startsWith("http")
            ? image
            : `/images/properties/${image}`
        }
        alt="Property"
        className="w-full h-100 object-cover"
      />
    </div>
  );
};

export default HeaderImage;
