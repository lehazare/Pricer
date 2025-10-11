import Home from "../pages/home/Home"
import Aboutme from "../pages/about/Aboutme"
import Autocall from "../pages/pricer/products/Autocall/Autocall"
import Vanille from "../pages/pricer/products/Vanilla/Vanilla"
import Asian from "../pages/pricer/products/Asian/Asian"
import PricingApi from "../pages/apis/PricingApi"
import MarketDataApi from "../pages/apis/MarketDataApi"
import SchedulingApi from "../pages/apis/SchedulingApi"

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
  { label: "API's", to: "/apis",     
      children: [
      { label: "Pricing", to: "/apis/pricing", component: <PricingApi /> },
      { label: "Market Data", to: "/apis/marketdata", component: <MarketDataApi /> },
      { label: "Scheduling", to: "/apis/scheduling", component: <SchedulingApi /> },
    ] },
  { label: "About Me", to: "/about", component: <Aboutme /> },
]
