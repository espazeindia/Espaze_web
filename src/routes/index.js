import { lazy } from "react";
import { GridView, Inventory2Outlined, SupervisorAccountOutlined,ShoppingCart,Storefront} from "@mui/icons-material";
const ProductOnboarding = lazy(() => import("../pages/ProductOnboarding"));
const CategoriesPage = lazy(() => import("../pages/CategoriesPage"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Products = lazy(() => import("../pages/Products"));
const Customers = lazy(() => import("../pages/Customers"));
const Orders = lazy(() => import("../pages/Orders"));
const Inventory= lazy(() => import("../pages/Inventory"));


const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
    access : ["admin","seller"]
  },
  {
    path: "/inventory",
    component : Inventory,
    access : ["admin","seller"]
  },
  {
    path: "/products",
    component: Products,
    access : ["admin","seller"]
  },
  {
    path: "/customers",
    component: Customers,
    access : ["admin","seller"]
  },
  {
    path: "/orders",
    component: Orders,
    access : ["admin","seller"]
  },
  {
    path: "/product-onboarding",
    component : ProductOnboarding,
    access : ["operations"]
  },
   {
    path: "/categoriespage/:categoryId",
    component: CategoriesPage,
    access: ["operations"]
  },

];

const sidebarRoutes = [
  {
    path: "/dashboard",
    icon: GridView, 
    name: "Dashboard", 
    access : ["admin","seller"]
  },
  {
    icon: Inventory2Outlined,
    name: "Products",
    path: "/products",
    access : ["admin","seller"]
  },
  {
    path : "/inventory",
    icon: Storefront ,
    name : "Inventory",
    access : ["admin","seller"]
  },
  {
    path: "/customers",
    icon: SupervisorAccountOutlined,
    name: "Customers",
    access : ["admin","seller"]
  },
  {
    path: "/orders",
    icon: ShoppingCart,
    name: "Orders",
    access : ["admin","seller"]
  },
  {
    path : "/product-onboarding",
    icon: ShoppingCart,
    name : "Onboarding",
    access : ["operations"]
  },
 {
  path: "/categoriespage/:categoryId",
  icon: ShoppingCart,
  name : "Category",
  access: ["operations"]  
},
];


export { routes, sidebarRoutes };
