import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import type { MenuProps } from "antd";
import { Button, Dropdown, Badge } from "antd";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { AppContext } from "../AppContext/Context";

// function classNames(...classes : string[]): string ) {
//   return classes.filter(Boolean).join(" ");
// }

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { openDrawer, showDrawer, cart } = useContext(AppContext); 


  const handleCategorySelect = (categoryName: any) => {
    navigate(`/category/${categoryName}`);
  };

  let items: MenuProps["items"] = [
    {
      key: "0",
      label: <div onClick={() => navigate("/")}>Home</div>,
    },
    {
      key: "1",
      label: (
        <div onClick={() => handleCategorySelect("electronics")}>
          Electronics
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div onClick={() => handleCategorySelect("jewelery")}>Jewelery</div>
      ),
    },
    {
      key: "3",
      label: (
        <div onClick={() => handleCategorySelect("men's clothing")}>
          Men's Clothing
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div onClick={() => handleCategorySelect("women's clothing")}>
          Women's Clothing
        </div>
      ),
    },
  ];

  items =
    location.pathname === "/"
      ? items.filter((item) => item?.key !== "0")
      : items;


  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                  <div
                    className="flex gap-1 flex-shrink-0 items-center cursor-pointer"
                    onClick={() => navigate("/")}
                  >
                    <i className="fa-solid fa-shirt text-white text-xl"></i>{" "}
                    <span className="text-white text-xl">E-Commerce</span>
                  </div>

                  <div className="block sm:hidden !important" onClick={showDrawer}>
                    <div className="flex flex-1"></div>
                    <Badge count={totalCount}>
                      <ShoppingCartOutlined className="text-white text-xl" />
                    </Badge>
                  </div>

                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex items-center space-x-4">
                      <Dropdown menu={{ items }} placement="bottomLeft">
                        <Button
                          type="primary"
                          className="border border-white hover:border-none"
                        >
                          Categories
                        </Button>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div className="w-20 text-center hidden sm:block" onClick={showDrawer}>
                  <Badge count={ totalCount} className="cursor-pointer">
                    <ShoppingCartOutlined className="text-white text-xl" />
                  </Badge>
                </div>
              </div>
            </div>

            {/* Profile dropdown */}
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                <Dropdown menu={{ items }} placement="bottomLeft">
                  <Button
                    block
                    type="primary"
                    className="border border-white hover:border-none"
                  >
                    Categories
                  </Button>
                </Dropdown>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}











// import { Disclosure } from "@headlessui/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import { useContext, useState } from "react";
// import type { MenuProps } from "antd";
// import { Button, Dropdown, Badge } from "antd";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { ShoppingCartOutlined } from "@ant-design/icons";
// import { AppContext } from "../AppContext/Context";

// // interface Item {
// //   key: string;
// //   label: JSX.Element;
// // }

// // function classNames(...classes: string[]): string {
// //   return classes.filter(Boolean).join(" ");
// // }

// export default function Navbar(): JSX.Element {
//   // const [isOpen, setIsOpen] = useState<boolean>(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { showDrawer, cart } = useContext(AppContext);

//   const handleCategorySelect = (categoryName: string): void => {
//     navigate(`/category/${categoryName}`);
//   };

//   let items: MenuProps["items"] = [
//     {
//       key: "0",
//       label: <div onClick={() => navigate("/")}>Home</div>,
//     },
//     {
//       key: "1",
//       label: (
//         <div onClick={() => handleCategorySelect("electronics")}>
//           Electronics
//         </div>
//       ),
//     },
//     {
//       key: "2",
//       label: (
//         <div onClick={() => handleCategorySelect("jewelery")}>Jewelery</div>
//       ),
//     },
//     {
//       key: "3",
//       label: (
//         <div onClick={() => handleCategorySelect("men's clothing")}>
//           Men's Clothing
//         </div>
//       ),
//     },
//     {
//       key: "4",
//       label: (
//         <div onClick={() => handleCategorySelect("women's clothing")}>
//           Women's Clothing
//         </div>
//       ),
//     },
//   ];

//   items =
//     location.pathname === "/"
//       ? items.filter((item) => item?.key !== "0")
//       : items;

//   const totalCount: number = cart.reduce((acc, item) => acc + item.quantity, 0);

//   return (
//     <>
//       <Disclosure as="nav" className="bg-gray-800">
//         {({ open }) => (
//           <>
//             <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//               <div className="relative flex h-16 items-center justify-between">
//                 <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//                   {/* Mobile menu button*/}
//                   <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
//                     <span className="absolute -inset-0.5" />
//                     <span className="sr-only">Open main menu</span>
//                     {open ? (
//                       <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//                     ) : (
//                       <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//                     )}
//                   </Disclosure.Button>
//                 </div>
//                 <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
//                   <div
//                     className="flex gap-1 flex-shrink-0 items-center cursor-pointer"
//                     onClick={() => navigate("/")}
//                   >
//                     <i className="fa-solid fa-shirt text-white text-xl"></i>{" "}
//                     <span className="text-white text-xl">E-Commerce</span>
//                   </div>

//                   <div className="block sm:hidden !important" onClick={showDrawer}>
//                     <div className="flex flex-1"></div>
//                     <Badge count={totalCount}>
//                       <ShoppingCartOutlined className="text-white text-xl" />
//                     </Badge>
//                   </div>

//                   <div className="hidden sm:ml-6 sm:block">
//                     <div className="flex items-center space-x-4">
//                       <Dropdown menu={{ items }} placement="bottomLeft">
//                         <Button
//                           type="primary"
//                           className="border border-white hover:border-none"
//                         >
//                           Categories
//                         </Button>
//                       </Dropdown>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="w-20 text-center hidden sm:block" onClick={showDrawer}>
//                   <Badge count={totalCount} className="cursor-pointer">
//                     <ShoppingCartOutlined className="text-white text-xl" />
//                   </Badge>
//                 </div>
//               </div>
//             </div>

//             {/* Profile dropdown */}
//             <Disclosure.Panel className="sm:hidden">
//               <div className="space-y-1 px-2 pb-3 pt-2">
//                 <Dropdown menu={{ items }} placement="bottomLeft">
//                   <Button
//                     block
//                     type="primary"
//                     className="border border-white hover:border-none"
//                   >
//                     Categories
//                   </Button>
//                 </Dropdown>
//               </div>
//             </Disclosure.Panel>
//           </>
//         )}
//       </Disclosure>
//     </>
//   );
// }

