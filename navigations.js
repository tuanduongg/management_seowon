import { ConfigRouter } from "ConfigRouter";

export const navigations = [
  { label: 'goods', type: 'label' },

  {
    name: 'management_goods',
    icon: 'assessment',
    children: [
      { name: 'sidebar-report', path: ConfigRouter.home, icon: 'assessment' },
      { name: 'model', icon: 'attachment', path: ConfigRouter.model },
      { name: 'time', icon: 'timer', path: ConfigRouter.time },
      { name: 'department', icon: 'ballot', path: ConfigRouter.department },
      { name: 'stage', icon: 'checklistrtl', path: ConfigRouter.stage },
    ],
  },
  { label: 'account', type: 'label' },
  // {
  //   name: 'Quản lý người dùng',
  //   icon: 'group',
  //   children: [
  //     { name: 'user', path: ConfigRouter.user, icon: 'person' },
  //   ],

  // },
  { name: 'account', path: ConfigRouter.user, icon: 'switch_account' },
  // { label: 'Components', type: 'label' },
  // {
  //   name: 'Components',
  //   icon: 'favorite',
  //   badge: { value: '30+', color: 'secondary' },
  //   children: [
  //     { name: 'Auto Complete', path: '/material/autocomplete', iconText: 'A' },
  //     { name: 'Buttons', path: '/material/buttons', iconText: 'B' },
  //     { name: 'Checkbox', path: '/material/checkbox', iconText: 'C' },
  //     { name: 'Dialog', path: '/material/dialog', iconText: 'D' },
  //     { name: 'Expansion Panel', path: '/material/expansion-panel', iconText: 'E' },
  //     { name: 'Form', path: '/material/form', iconText: 'F' },
  //     { name: 'Icons', path: '/material/icons', iconText: 'I' },
  //     { name: 'Menu', path: '/material/menu', iconText: 'M' },
  //     { name: 'Progress', path: '/material/progress', iconText: 'P' },
  //     { name: 'Radio', path: '/material/radio', iconText: 'R' },
  //     { name: 'Switch', path: '/material/switch', iconText: 'S' },
  //     { name: 'Slider', path: '/material/slider', iconText: 'S' },
  //     { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' },
  //     { name: 'Table', path: '/material/table', iconText: 'T' },
  //   ],
  // },
  // {
  //   name: 'Charts',
  //   icon: 'trending_up',
  //   children: [{ name: 'Echarts', path: '/charts/echarts', iconText: 'E' }],
  // },
  { label: 'profile', type: 'label' },
  { name: 'profile', path: ConfigRouter.profile, icon: 'account_circle' },
  // {
  //   name: 'Profile',
  //   icon: 'launch',
  //   type: 'extLink',
  //   path: 'http://demos.ui-lib.com/matx-react-doc/',
  // },
];
