import { useRouter } from "next/navigation";
import appRoutes from "./appRoutes";
import Link from "next/link";

export function Routes() {
  const router = useRouter();
  return (
    <div
      className="join join-vertical w-full text-white"
      style={{ listStyle: "none", padding: 0 }}
    >
      <h2 className="text-center my-4 text-2xl mb-8 text-secondaryBgColor font-bold">
        Magin Chat
      </h2>
      {appRoutes.map((route) => (
        <div
          key={route.sidebarProps.displayText}
          tabIndex={0}
          className="collapse collapse-arrow mb-4 rounded-md"
        >
          <div className="collapse-title text-xl font-medium flex items-center p-0 bg-secondaryBgColor text-black min-h-11 h-11 ">
            <Link href={route.path}>
              <div className="collapse-title text-xl font-medium flex items-center p-0 pl-5">
                <div className="mr-3">{route.sidebarProps.icon}</div>
                <h2>{route.sidebarProps.displayText}</h2>
              </div>
            </Link>
          </div>

          {route.child && (
            <div className="collapse-content text-black px-0 mx-2">
              {route.child.map((subRoute) => (
                <Link href={subRoute.path} key={subRoute.path}>
                  <p className=" my-2 px-2 py-2 text-black rounded-md bg-secondaryBgColor hover:font-bold hover:scale-105 transition-all">
                    {" "}
                    {subRoute.displayText}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Routes;
