import React from "react";
import { IoMdClose } from "react-icons/io";
import { RiMenu2Fill } from "react-icons/ri";
import { useRequestApiAction } from "../../axios/requests/useRequestApiAction";
import { setAccessTokenInfo } from "../../store/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaBell } from "react-icons/fa6";

function Header({ sidebarClick, open }) {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.theme.access_tokken);
  // const navigate = use
  console.log(accessToken, "accessToken");

  const { POST } = useRequestApiAction();

  const loginStart = async (data) => {
    const res = await POST(`/users/login`, {
      userName: "shivam",
      password: "123456",
    });
    console.log(res.data,"res.data::")
    if(res.data.success){
      dispatch(setAccessTokenInfo(res.data.data.token));
    }
    // setUserInfoItems(res.data._doc);
    // setRoute("chatlist");
  };

  return (
    <div className="navbar bg-primaryBgColor shadow-lg text-secondaryBgColor">
      <div className="flex-1">
        <div onClick={sidebarClick} className="cursor-pointer">
          {open ? (
            <IoMdClose className="text-secondaryBgColor mx-3 text-3xl" />
          ) : (
            <RiMenu2Fill className="text-secondaryBgColor mx-3 text-3xl" />
          )}
        </div>
        {!open && (
          <a className="text-secondaryBgColor text-xl font-bold">Magic Chat</a>
        )}
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto bg-activePrimaryBgColor text-primaryBgColor"
          />
        </div>
        <div className="bg-localColor p-2 rounded-lg text-activePrimaryBgColor mx-3 relative cursor-pointer">
          <div className="badge bg-activePrimaryBgColor text-localColor badge-xs absolute -top-2 -right-2 w-5 h-5">
            5
          </div>
          <FaBell className="w-5 h-5" />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] bg-white mt-3 w-52 p-2 shadow"
          >
            {!accessToken && (
              <li onClick={loginStart}>
                <span className="justify-between">
                  Login
                  <span className="badge">New</span>
                </span>
              </li>
            )}
            <li>
              <a>Settings</a>
            </li>
            {accessToken && (
              <li>
                <a>Logout</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
