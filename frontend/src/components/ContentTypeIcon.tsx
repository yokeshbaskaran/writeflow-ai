import {
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoInstagram,
  IoDocumentTextOutline,
  IoGlobeOutline,
  IoBriefcaseOutline,
} from "react-icons/io5";
import { MdOutlinePostAdd } from "react-icons/md";

type ContentTypeProps = {
  type: string;
};

const contentTypeIcons = {
  "General post": {
    icon: <MdOutlinePostAdd size={30} />,
    bg: "bg-purple-600",
  },

  "LinkedIn Post": {
    icon: <IoLogoLinkedin size={30} />,
    bg: "bg-blue-700",
  },

  "Blog Post": {
    icon: <IoDocumentTextOutline size={30} />,
    bg: "bg-green-600",
  },

  "Twitter (X) post": {
    icon: <IoLogoTwitter size={30} />,
    bg: "bg-black",
  },

  "Instagram Captions": {
    icon: <IoLogoInstagram size={30} />,
    bg: "bg-pink-600",
  },

  "SEO titles": {
    icon: <IoGlobeOutline size={30} />,
    bg: "bg-orange-500",
  },

  "Resume Bullet Points": {
    icon: <IoBriefcaseOutline size={30} />,
    bg: "bg-slate-700",
  },
};

const ContentTypeIcon = ({ type }: ContentTypeProps) => {
  const typeData =
    contentTypeIcons[type as keyof typeof contentTypeIcons] ||
    contentTypeIcons["General post"];

  return (
    <>
      <div className={`p-2 text-white rounded-xl ${typeData.bg}`}>
        {typeData.icon}
      </div>
    </>
  );
};

export default ContentTypeIcon;
