import { MenuItem } from "./interface";

export const MENU_ITEMS: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard',
      roles: ['ADMIN']
    },
    {
      label: 'User Management',
      icon: 'user',
      route: '/dashboard/patient',
      roles: ['PATIENT']
    },
    {
        label: 'History',
        icon: 'user',
        route: '/dashboard/history',
        roles: ['PATIENT']
    },
    {
      label: 'Settings',
      icon: 'setting',
      route: '/settings',
      roles: ['DOCTOR', 'USER']
    }
  ];