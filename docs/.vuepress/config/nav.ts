// nav 配置, 即上方导航栏

import { NavItem } from "vuepress/config";

export default <Array<NavItem>>[
  { text: "泰罗GO", link: "/" },
  {
    text: '我的收藏',
    link: "/pages/2d6556/"
  },
  {
    text: "所有文章",
    link: "/archives/"
  },
];
