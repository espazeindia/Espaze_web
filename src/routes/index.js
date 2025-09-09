import { lazy } from "react";
import {
  GridView,
  Inventory2Outlined,
  SupervisorAccountOutlined,
  ShoppingCart,
  Storefront,
  Warehouse,
  PlaylistAddCheck,
  Category,
  AssignmentTurnedIn,
  Person,
} from "@mui/icons-material";
const ProductOnboarding = lazy(() => import("../pages/ProductOnboarding"));
const CategoriesPage = lazy(() => import("../pages/CategoriesPage"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Products = lazy(() => import("../pages/Products"));
const Customers = lazy(() => import("../pages/Customers"));
const Orders = lazy(() => import("../pages/Orders"));
const Inventory = lazy(() => import("../pages/Inventory"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const CategorySelection = lazy(() => import("../components/CategorySelection"));
const OnboardingRack = lazy(() => import("../pages/OnboardingRack"));
const UserProfile = lazy(() => import("../pages/UserProfile"));
const WarehouseOnboarding = lazy(() => import("../pages/WarehouseOnboarding"));
const OperationsOnboardingForm = lazy(() => import("../pages/OperationsOnboardingForm"));

const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
    access: ["seller"],
  },

  {
    path: "/inventory",
    component: Inventory,
    access: ["seller"],
  },
  {
    path: "/products",
    component: Products,
    access: [ "seller"],
  },
  {
    path: "/customers",
    component: Customers,
    access: ["seller"],
  },
  {
    path: "/orders",
    component: Orders,
    access: ["seller"],
  },
  {
    path: "/product-onboarding",
    component: ProductOnboarding,
    access: ["operations"],
  },
  {
    path: "/categories",
    component: CategoriesPage,
    access: ["operations"],
  },
  {
    path: "/categoryselection",
    component: CategorySelection,
    access: ["seller"]
  },
 {
    path: "/OnboardingRack",
    component: OnboardingRack,
    access: ["operations"]
  },
  
  {
    path: "/product-details/:id",
    component: ProductDetails,
    access: ["operations", "seller"],
  },
  {
    path: "/warehouse-onboarding",
    component: WarehouseOnboarding,
    access: ["admin"],
  },
  {
    path: "/operations-onboarding-form",
    component: OperationsOnboardingForm,
    access: ["admin"],
  },
  {
    path: "/profile",
    component: UserProfile,
    access: ["seller","admin","operations"],
  },
];

const sidebarRoutes = [
  {
    path: "/dashboard",
    icon: GridView,
    name: "Dashboard",
    access: ["seller"],
  },
  {
    icon: Inventory2Outlined,
    name: "Products",
    path: "/products",
    access: ["seller"],
  },
  {
    path: "/inventory",
    icon: Storefront,
    name: "Inventory",
    access: ["seller"],
  },
  {
    path: "/customers",
    icon: SupervisorAccountOutlined,
    name: "Customers",
    access: ["seller"],
  },
  {
    path: "/orders",
    icon: ShoppingCart,
    name: "Orders",
    access: ["seller"],
  },
  {
    path: "/product-onboarding",
    icon: ShoppingCart,
    name: "Onboarding",
    access: ["operations"],
  },
  {
    path: "/categories",
    icon: ShoppingCart,
    name: "Category",
    access: ["operations"],
  },
  {
    path: "/warehouse-onboarding",
    icon: Warehouse,
    name: "Warehouse Information",
    access: ["admin"],
  },
  {
    path: "/operations-onboarding-form",
    icon: Person,
    name: "Operations Onboarding Form",
    access: ["admin"],
  },
{
  path: "/categoryselection",
  icon: ShoppingCart,
  name : "CategorySelection",
  access: ["seller"]  
},
 {
  path: "/OnboardingRack",
  icon: ShoppingCart,
  name : "OnboardingRack",
  access: ["operations"]  
},
];

export { routes, sidebarRoutes };
