// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'app',
    path: '/app/dashboard',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'user',
    path: '/app/user',
    icon: getIcon('eva:people-fill'),
  },
];

export default navConfig;
