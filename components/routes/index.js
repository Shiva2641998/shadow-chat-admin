// 'use client'
// import { usePathname } from "next/navigation";
import appRoutes from "./appRoutes";
// import Link from "next/link";

// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import { Collapse, List, Menu } from "@mui/material";
// import { useState } from "react";

// export function Routes() {
//   const pathname = usePathname();
//   const lastRoute = pathname.split("/")[pathname.split("/")?.length - 1];
//   const [open, setOpen] = useState(true);

//   const handleClick = () => {
//     setOpen(!open);
//   };
//   return (
//     <div
//       className="join join-vertical w-full text-white"
//       style={{ listStyle: "none", padding: 0 }}
//     >
//       <h2 className="text-center my-4 text-2xl mb-8 text-secondaryBgColor font-bold">
//         Magin Chat
//       </h2>
//       <List>
//         {appRoutes.map((route, index) => (
//           <ListItem key={route} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {route.sidebarProps?.icon}
//               </ListItemIcon>
//               <ListItemText className="text-activeSecondaryBgColor" primary={route.sidebarProps.displayText} />
//             </ListItemButton>
//           </ListItem>

//         ))}
//         {
//           appRoutes.map(item =>
//             !item.child ? (
//                 <div key={item.title}>
//                   <ListItem button>
//                     <ListItemIcon>
//                       {item.sidebarProps?.icon}
//                     </ListItemIcon>
//                     <ListItemText primary={item.sidebarProps.displayText} />
//                   </ListItem>
//                 </div>
//               ) : (
//                 <div
//                   component="nav"
//                   key={item.title}
//                 >
//                   <ListItem button onClick={handleClick}>
//                     <ListItemIcon>
//                       {item.icon}
//                     </ListItemIcon>
//                     <ListItemText primary={item.title} />
//                     {open ? item.sidebarProps.icon : item.sidebarProps.icon}
//                   </ListItem>
//                   <Collapse in={open} timeout="auto" unmountOnExit>
//                     <List component="div" disablePadding>
//                       <ListItem button
//                       // className={classes.nested}
//                       >
//                         <ListItemIcon>
//                         {item.sidebarProps.icon}
//                         </ListItemIcon>
//                         <ListItemText>
//                           <Menu items={item} />
//                         </ListItemText>
//                       </ListItem>
//                     </List>
//                   </Collapse>
//                 </div>
//               )
//           )
//         }
//       </List>
//       {/* {appRoutes.map((route) => (
//         <div
//           key={route.sidebarProps.displayText}
//           tabIndex={0}
//           className="collapse collapse-arrow mb-4 rounded-md"
//         >
//             <div
//               className={`collapse-title text-xl font-medium flex items-center p-0   min-h-11 h-11
//               ${
//                 pathname?.includes(route.path)
//               ? "bg-activePrimaryBgColor text-primaryBgColor"
//               : "bg-primaryBgColor text-activeSecondaryBgColor"
//           }`}
//             >
//             <Link href={route.path}>
//               <div className="collapse-title text-xl font-medium flex items-center p-0 pl-5">
//                 <div className="mr-3">{route.sidebarProps.icon}</div>
//                 <h2>{route.sidebarProps.displayText}</h2>
//               </div>
//           </Link>
//             </div>

//           {route.child && (
//             <div className="collapse-content text-black px-0 mx-2">
//               {route.child.map((subRoute) => (
//                 <Link href={subRoute.path} key={subRoute.path}>
//                   <p
//                     className={` my-2 px-5 py-2 rounded-md font-600 hover:font-bold hover:scale-105 text-activeSecondaryBgColor transition-all   ${
//                       subRoute.path?.includes(lastRoute)
//                         ? "border-b-4 bg-localColor border-activePrimaryBgColor "
//                         : "bg-localColor "
//                     }`}
//                   >
//                     {" "}
//                     {subRoute.displayText}
//                   </p>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//       ))} */}
//     </div>
//   );
// }

// export default Routes;

import React from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { MdBrightness1 } from "react-icons/md";
import { setSidebar } from "../../store/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { IoIosSearch, IoMdLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

export default function Routes() {
  const [open, setOpen] = React.useState(-1);
  const [openAlert, setOpenAlert] = React.useState(true);
  // const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const { isDrawerOpen, pathName } = useSelector(
    (state) => state.theme.sidebar
  );
  const dispatch = useDispatch();

  const handleOpen = (value) => {
    setOpen(open === value ? -1 : value);
  };
  console.log(isDrawerOpen, "isDrawerOpen");
  const naviagte = useRouter();
  // const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = (path) => {
    console.log("cliked");
    dispatch(setSidebar(path || undefined));
  };

  const navigatePage = (path) => {
    naviagte.push(path);
    closeDrawer(path);
  };

  return (
    <>
      {/* <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton> */}
      {isDrawerOpen && (
        <div class="fixed inset-0 w-full h-full pointer-events-auto z-40 bg-black bg-opacity-60 backdrop-blur-lg opacity-80"></div>
      )}
      <Drawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        className="bg-white fixed z-50"
      >
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4 bg-white"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <img
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="brand"
              className="h-8 w-8"
            />
            <Typography
              variant="h5"
              color="blue-gray"
              className="font-bold text-2xl"
            >
              Magic Chat
            </Typography>
          </div>
          <div className=" w-full bg-localColor my-5 rounded-md flex justify-between items-center">
            <Input
              placeholder="Search"
              className="focus:outline-none active:outline-none"
            />
            <IoIosSearch className="h-5 w-5 mr-3" />
          </div>
          <List>
            {appRoutes.map((route, i) => {
              const { path } = route;
              const { Icon, displayText } = route?.sidebarProps;
              return route?.child ? (
                <Accordion
                  open={open === i}
                  icon={
                    <FaAngleDown
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${
                        open === i ? "rotate-180" : ""
                      }`}
                    />
                  }
                >
                  <ListItem
                    selected={open === i}
                    className={`p-0 mb-2 h-12 ${
                      pathName.includes(path)
                        ? "bg-activePrimaryBgColor text-localColor font-bold"
                        : ""
                    }`}
                  >
                    <AccordionHeader
                      onClick={() => handleOpen(i)}
                      className="border-b-0 p-3"
                    >
                      <ListItemPrefix className="mr-3">
                        <Icon className="h-7 w-7" />
                      </ListItemPrefix>
                      <Typography
                        color="blue-gray"
                        className="mr-auto font-normal"
                      >
                        {displayText}
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-1">
                    <List className="p-0">
                      {route?.child.map((e) => {
                        const { displayText, path } = e;
                        return (
                          <div className="h-10 px-2">
                            <ListItem
                              onClick={() => navigatePage(path)}
                              className={`h-10 ${
                                path == pathName
                                  ? "bg-localColor text-activePrimaryBgColor font-bold"
                                  : ""
                              }`}
                            >
                              <ListItemPrefix>
                                <MdBrightness1 className="h-2 w-5" />
                              </ListItemPrefix>
                              {displayText}
                            </ListItem>
                          </div>
                        );
                      })}
                    </List>
                  </AccordionBody>
                </Accordion>
              ) : (
                <ListItem
                  key={i}
                  // selected={open === i}
                  className={`px-3 mb-2 h-12 ${
                    pathName.includes(path)
                      ? "bg-activePrimaryBgColor text-localColor font-bold"
                      : ""
                  }`}
                  onClick={() => {
                    handleOpen(-1)
                    navigatePage(path)
                  }} // Handle click directly on the ListItem
                >
                  <div className="flex items-center">
                    <Icon className="h-7 w-7 mr-3" />
                    <Typography color="blue-gray" className="font-normal">
                      {displayText}
                    </Typography>
                  </div>
                </ListItem>
              );
            })}

            <hr className="my-2 border-blue-gray-50" />
            {/* <ListItem>
              <ListItemPrefix>
                <MdBrightness1 className="h-5 w-5" />
              </ListItemPrefix>
              Inbox
              <ListItemSuffix>
                <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <MdBrightness1 className="h-5 w-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <MdBrightness1 className="h-5 w-5" />
              </ListItemPrefix>
              Settings
            </ListItem>*/}
            <ListItem>
              <ListItemPrefix>
                <IoSettingsOutline className="h-7 w-10 pr-2" />
              </ListItemPrefix>
              Settings
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <IoMdLogOut className="h-7 w-10 pr-2" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
          <Alert
            open={true}
            className="mt-auto"
            onClose={() => setOpenAlert(false)}
          >
            <Typography variant="h6" className="mb-1">
              Upgrade to PRO
            </Typography>
            <Typography variant="small" className="font-normal opacity-80">
              Upgrade to Material Tailwind PRO and get even more components,
              plugins, advanced features and premium.
            </Typography>
            <div className="mt-4 flex gap-3">
              <Typography
                as="a"
                href="#"
                variant="small"
                className="font-medium opacity-80"
                onClick={() => setOpenAlert(false)}
              >
                Dismiss
              </Typography>
              <Typography
                as="a"
                href="#"
                variant="small"
                className="font-medium"
              >
                Upgrade Now
              </Typography>
            </div>
          </Alert>
        </Card>
      </Drawer>
    </>
  );
}
