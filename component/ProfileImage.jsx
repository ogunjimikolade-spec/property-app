import Image from "next/image";

const ProfileImage = ({ image }) => {
  return (
    <Image
      src={image || "/profile.png"}
      width={40}
      height={40}
      className="h-8 w-8 rounded-full"
      alt="profile"
    />
  );
};

export default ProfileImage;
