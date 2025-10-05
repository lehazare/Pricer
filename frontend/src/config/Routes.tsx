// src/config/navItems.ts

import Home from "../pages/home/Home"
import Aboutme from "../pages/about/Aboutme"
import AlgoTrading from "../pages/algo-trading/AlgoTrading"
import Autocall from "../pages/pricer/products/Autocall/Autocall"
import Vanille from "../pages/pricer/products/Vanilla/Vanilla"
import Asian from "../pages/pricer/products/Asian/Asian"
import Snake from "../pages/games/Snake"
import Crosswords from "../pages/games/CrossWords"

export const navItems = [
  { label: "Home", to: "/", component: <Home /> },
  { 
    label: "Pricer", 
    to: "/pricer",
    children: [
      { label: "Vanilla", to: "/pricer/vanilla", component: <Vanille /> },
      { label: "Asian", to: "/pricer/asian", component: <Asian /> },
      { label: "Autocall", to: "/pricer/autocall", component: <Autocall /> },

    ]
  },
  { label: "Algo Trading", to: "/algo", component: <AlgoTrading /> },
  { 
    label: "Games", 
    to: "/games",
    children: [
      { label: "Snake", to: "/games/snake", component: <Snake /> },
      { label: "Crosswords Generator", to: "/games/crosswords", component: <Crosswords /> }
    ]
  },
  { label: "About Me", to: "/about", component: <Aboutme /> },
]
