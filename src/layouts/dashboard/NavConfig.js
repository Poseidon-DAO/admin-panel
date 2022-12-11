import Iconify from "../../components/Iconify";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: "Dashboard",
    path: "/app/dashboard",
    icon: getIcon("akar-icons:home"),
  },
  {
    title: "Accessibility",
    path: "/app/accessibility",
    icon: getIcon("akar-icons:key"),
  },
  // {
  //   title: "Polls",
  //   path: "/app/polls",
  //   icon: getIcon("mdi:vote-outline"),
  // },
  {
    title: "Transfer",
    path: "/app/transfer",
    icon: getIcon("bx:transfer"),
  },
  {
    title: "Airdrop",
    path: "/app/airdrop",
    icon: getIcon("bi:coin"),
  },
  {
    title: "Settings",
    path: "/app/settings",
    icon: getIcon("carbon:settings"),
  },
];

export default navConfig;
