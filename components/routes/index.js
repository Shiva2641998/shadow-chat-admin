
import React from "react";
import appRoutes from "./appRoutes";
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
          <div className=" w-full bg-localColor my-5 overflow-hidden rounded-md flex justify-between items-center">
            <Input
              placeholder="Search"
              className="focus:outline-none active:outline-none outline-none"
            />
            <IoIosSearch className="h-5 w-5 mr-3" />
          </div>
          <List>
            {appRoutes.map((route, i) => {
              const { path } = route;
              const { Icon, displayText } = route?.sidebarProps;
              return route?.child ? (
                <Accordion
                key={i}
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
                      {route?.child.map((e,i) => {
                        const { displayText, path } = e;
                        return (
                          <div key={i} className="h-10 px-2">
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
