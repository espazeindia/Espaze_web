import { lazy } from "react";
import { GridView, Inventory2Outlined, SupervisorAccountOutlined,ShoppingCart,Storefront} from "@mui/icons-material";
const ProductOnboarding = lazy(() => import("../pages/ProductOnboarding"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
// const Attributes = lazy(() => import("@/pages/Attributes"));
// const ChildAttributes = lazy(() => import("@/pages/ChildAttributes"));
const Products = lazy(() => import("../pages/Products"));
// const ProductDetails = lazy(() => import("@/pages/ProductDetails"));
// const Category = lazy(() => import("@/pages/Category"));
// const ChildCategory = lazy(() => import("@/pages/ChildCategory"));
// const Staff = lazy(() => import("@/pages/Staff"));
const Customers = lazy(() => import("../pages/Customers"));
// const CustomerOrder = lazy(() => import("@/pages/CustomerOrder"));
const Orders = lazy(() => import("../pages/Orders"));
const Inventory= lazy(() => import("../pages/Inventory"));
// const OrderInvoice = lazy(() => import("@/pages/OrderInvoice"));
// const Coupons = lazy(() => import("@/pages/Coupons"));
// const Page404 = lazy(() => import("@/pages/404"));
// const ComingSoon = lazy(() => import("@/pages/ComingSoon"));
// const EditProfile = lazy(() => import("@/pages/EditProfile"));
// const Languages = lazy(() => import("@/pages/Languages"));
// const Currencies = lazy(() => import("@/pages/Currencies"));
// const Setting = lazy(() => import("@/pages/Setting"));
// const StoreHome = lazy(() => import("@/pages/StoreHome"));
// const StoreSetting = lazy(() => import("@/pages/StoreSetting"));
// const Notifications = lazy(() => import("@/pages/Notifications"));

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
  //   {
  //     path: "/attributes",
  //     component: Attributes,
  //   },
  //   {
  //     path: "/attributes/:id",
  //     component: ChildAttributes,
  //   },
  //   {
  //     path: "/product/:id",
  //     component: ProductDetails,
  //   },
  //   {
  //     path: "/categories",
  //     component: Category,
  //   },
  //   {
  //     path: "/languages",
  //     component: Languages,
  //   },
  //   {
  //     path: "/currencies",
  //     component: Currencies,
  //   },

  //   {
  //     path: "/categories/:id",
  //     component: ChildCategory,
  //   },
  //
  //   {
  //     path: "/customer-order/:id",
  //     component: CustomerOrder,
  //   },
  //   {
  //     path: "/our-staff",
  //     component: Staff,
  //   },
  //
  //   {
  //     path: "/order/:id",
  //     component: OrderInvoice,
  //   },
  //   {
  //     path: "/coupons",
  //     component: Coupons,
  //   },
  //   { path: "/settings", component: Setting },
  //   {
  //     path: "/store/customization",
  //     component: StoreHome,
  //   },
  //   {
  //     path: "/store/store-settings",
  //     component: StoreSetting,
  //   },
  //   {
  //     path: "/404",
  //     component: Page404,
  //   },
  //   {
  //     path: "/coming-soon",
  //     component: ComingSoon,
  //   },
  //   {
  //     path: "/edit-profile",
  //     component: EditProfile,
  //   },
  //   {
  //     path: "/notifications",
  //     component: Notifications,
  //   },
];

const sidebarRoutes = [
  {
    path: "/dashboard", // the url
    icon: GridView, // icon
    name: "Dashboard", // name that appear in Sidebar
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
  //   routes: [
  //     {
  //       path: "/products",
  //       name: "Products",
  //     },
  //     {
  //       path: "/categories",
  //       name: "Categories",
  //     },
  //     {
  //       path: "/attributes",
  //       name: "Attributes",
  //     },
  //     {
  //       path: "/coupons",
  //       name: "Coupons",
  //     },
  //   ],
  // },

  

  // {
  //   path: "/our-staff",
  //   icon: FiUser,
  //   name: "OurStaff",
  // },

  // {
  //   path: "/settings?settingTab=common-settings",
  //   icon: FiSettings,
  //   name: "Settings",
  // },
  // {
  //   icon: FiGlobe,
  //   name: "International",
  //   routes: [
  //     {
  //       path: "/languages",
  //       name: "Languages",
  //     },
  //     {
  //       path: "/currencies",
  //       name: "Currencies",
  //     },
  //   ],
  // },
  // {
  //   icon: FiTarget,
  //   name: "OnlineStore",
  //   routes: [
  //     {
  //       name: "ViewStore",
  //       path: "/store",
  //       outside: "store",
  //     },

  //     {
  //       path: "/store/customization",
  //       name: "StoreCustomization",
  //     },
  //     {
  //       path: "/store/store-settings",
  //       name: "StoreSettings",
  //     },
  //   ],
  // },

  // {
  //   icon: FiSlack,
  //   name: "Pages",
  //   routes: [
  //     // submenu

  //     {
  //       path: "/404",
  //       name: "404",
  //     },
  //     {
  //       path: "/coming-soon",
  //       name: "Coming Soon",
  //     },
  //   ],
  // },
];

const routeAccessList = [
  { label: "Dashboard", value: "dashboard" },
  { label: "Products", value: "products" },
  { label: "Categories", value: "categories" },
  { label: "Attributes", value: "attributes" },
  { label: "Coupons", value: "coupons" },
  { label: "Customers", value: "customers" },
  { label: "Orders", value: "orders" },
  { label: "Staff", value: "our-staff" },
  { label: "Settings", value: "settings" },
  { label: "Languages", value: "languages" },
  { label: "Currencies", value: "currencies" },
  { label: "ViewStore", value: "store" },
  { label: "StoreCustomization", value: "customization" },
  { label: "StoreSettings", value: "store-settings" },
  { label: "Product Details", value: "product" },
  { label: "Order Invoice", value: "order" },
  { label: "Edit Profile", value: "edit-profile" },
  {
    label: "Customer Order",
    value: "customer-order",
  },
  { label: "Notification", value: "notifications" },
  { label: "Coming Soon", value: "coming-soon" },
];

export { routeAccessList, routes, sidebarRoutes };
