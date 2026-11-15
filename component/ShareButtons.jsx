// "use client";
// import { FaFacebook, FaWhatsapp } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";

// const ShareButtons = ({ property }) => {
//   const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
//   const text = `${property.name} - Check out this property`;

//   return (
//     <>
//       <h3 className="text-xl font-bold text-center pt-2">
//         Share This Property:
//       </h3>
//       <div className="flex gap-3 justify-center pb-5">
//         <a
//           href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80"
//         >
//           <FaFacebook size={20} />
//         </a>

//         <a
//           href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(text)}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80"
//         >
//           <FaXTwitter size={20} />
//         </a>

//         <a
//           href={`https://wa.me/?text=${encodeURIComponent(text + " " + shareUrl)}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80"
//         >
//           <FaWhatsapp size={20} />
//         </a>
//       </div>
//     </>
//   );
// };

// export default ShareButtons;

"use client";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon
} from "react-share";

const ShareButtons = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        Share This Property
      </h3>
      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton
          url={shareUrl}
          title={property.name}
          hashtag={`#${property.type.replace(/\s/g, "")}ForRent`}
        >
          <FacebookIcon size={40} round />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={property.name}
          hashtags={[`${property.type.replace(/\s/g, "")}ForRent`]}
        >
          <TwitterIcon size={40} round />
        </TwitterShareButton>

        <WhatsappShareButton
          url={shareUrl}
          title={property.name}
          separator=":: "
        >
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>

         <EmailShareButton
          url={shareUrl}
          subject={property.name}
          body={``}
        >
          <EmailIcon size={40} round />
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareButtons;

