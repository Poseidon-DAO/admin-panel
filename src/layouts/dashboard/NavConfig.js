// component
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: "Accessibility",
    path: "/app/accessibility",
    icon: getIcon("akar-icons:key"),
  },
  {
    title: "Polls",
    path: "/app/polls",
    icon: getIcon("mdi:vote-outline"),
  },
  {
    title: "Token",
    path: "/app/token",
    icon: getIcon("bi:coin"),
  },
];

export default navConfig;
