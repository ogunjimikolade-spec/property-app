import BookmarkButton from "./BookmarkButton";
import ShareButtons from "./ShareButtons";
import PropertyContactForm from "./PropertyContactForm";

const Sidebar = ({ property }) => {
  return (
    <aside className="space-y-4">
      <BookmarkButton property={property} />
      <ShareButtons property={property} />
      <PropertyContactForm property={property} />
    </aside>
  );
};

export default Sidebar;
