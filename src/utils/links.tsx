import { AreaChart, Layers, AppWindow } from 'lucide-react';

type NavLink = {
    href: string;
    label: string;
    icon: React.ReactNode;
}

const links: NavLink[] = [
    {
        href: '/stats',
        label: 'stats',
        icon: <AreaChart />,
    },
    {
        href: '/jobs',
        label: 'all jobs',
        icon: <AppWindow />,
    },
    {
        href: '/add-job',
        label: 'add job',
        icon: <Layers />,
    },
];

export default links;