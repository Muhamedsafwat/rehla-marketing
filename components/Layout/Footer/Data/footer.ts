import { 
  HiOutlineHome,
  HiOutlineSparkles,
  HiOutlineChatBubbleOvalLeftEllipsis
} from "react-icons/hi2";
import { FaInstagram, FaLinkedinIn, FaFacebookF } from "react-icons/fa6";

import { HiOutlineUserGroup } from "react-icons/hi2";

export const contactData = {
  email: "info@rehlamarketing.com",
  phone: "+966 56 410 7629",
  rawPhone: "tel:+966564107629",
  rawEmail: "mailto:info@rehlamarketing.com"
};

export const socialsData = [
  { name: "Facebook", icon: FaFacebookF, url: "https://www.facebook.com/share/16xhjLWB9M/?mibextid=wwXIfr" },
  { name: "LinkedIn", icon: FaLinkedinIn, url: "https://www.linkedin.com/company/rehla-marketing-agency/" },
  { name: "Instagram", icon: FaInstagram, url: "https://www.instagram.com/rehlamarketing?igsh=bHQ0eDk3MXQwY2F0&utm_source=qr" },
];

export const navLinksData = [
  { labelEn: "Home", labelAr: "الرئيسية", icon: HiOutlineHome, href: "/" },
  { labelEn: "About Us", labelAr: "من نحن", icon: HiOutlineUserGroup, href: "/about" },
  { labelEn: "Services", labelAr: "خدماتنا", icon: HiOutlineSparkles, href: "/services" },
  { labelEn: "Contact Us", labelAr: "تواصل معنا", icon: HiOutlineChatBubbleOvalLeftEllipsis, href: "/contact", special: true },
];
