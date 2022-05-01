// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Multi Signature',
    path: '/app/multisig',
    icon: getIcon('la:file-signature'),
  },
  {
    title: 'Accessibility',
    path: '/app/accessibility',
    icon: getIcon('akar-icons:key'),
  },
];

export default navConfig;
