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
import { ListPlus, Lock, Plus } from "lucide-react";
const AddMetadata = lazy(() => import("../pages/AddMetadata"));
const AddCategoriesSubcategoriesPage = lazy(() => import("../pages/AddCategoriesSubcategories"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Products = lazy(() => import("../pages/Products"));
const Customers = lazy(() => import("../pages/Customers"));
const Orders = lazy(() => import("../pages/Orders"));
const Inventory = lazy(() => import("../pages/Inventory"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const UserProfile = lazy(() => import("../pages/UserProfile"));
const WarehouseOnboarding = lazy(() => import("../pages/AddWarehouse"));
const OperationsOnboardingForm = lazy(() => import("../pages/RegisterOperations"));
const CategoriesAndSubcategories = lazy(() => import("../pages/CategorySubcategoryAssortment"));
const ChangePassword = lazy(() => import("../pages/ChangePassword"));
const InventoryRequest = lazy(() => import("../pages/InventoryRequests"));

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
    path: "/inventory-request",
    component: InventoryRequest,
    access: [ "operations"],
  },
  {
    path: "/products",
    component: Products,
    access: ["seller"],
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
    component: AddMetadata,
    access: ["operations"],
  },
  {
    path: "/categories",
    component: AddCategoriesSubcategoriesPage,
    access: ["operations"],
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
    access: ["seller", "admin", "operations"],
  },
  {
    path: "/categories-and-subcategories",
    component: CategoriesAndSubcategories,
    access: ["seller"],
  },
  {
    path: "/change-password",
    component: ChangePassword,
    access: ["operations", "admin"],
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
    path: "/inventory-request",
    icon: Storefront,
    name: "Inventory Request",
    access: ["operations"],
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
    icon: ListPlus,
    name: "Add Metadata",
    access: ["operations"],
  },
  {
    path: "/categories",
    icon: Plus,
    name: "Add Category",
    access: ["operations"],
  },
  {
    path: "/warehouse-onboarding",
    icon: Warehouse,
    name: "Add Warehouse",
    access: ["admin"],
  },
  {
    path: "/operations-onboarding-form",
    icon: Plus,
    name: "Add Operational Guy",
    access: ["admin"],
  },
  {
    path: "/categories-and-subcategories",
    icon: Category,
    name: "Category Assortment",
    access: ["seller"],
  },
  {
    path: "/change-password",
    icon: Lock,
    name: "ChangePassword",
    access: ["operations", "admin"],
  },
];

export { routes, sidebarRoutes };
