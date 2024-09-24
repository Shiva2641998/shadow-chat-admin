import React from "react";
import { IoMdColorWand } from "react-icons/io";
import { useAppDispatch } from "../../store/store";
import { previewToggle } from "../../store/themeSlice";
import { useDispatch } from "react-redux";

function Title({title, themeView}) {
  const dispatch = useDispatch();

    const showHideToggle = () => {
    dispatch(previewToggle())
  };
  return (
    <div className="flex justify-between items-center my-4">
      <h2 className="text-3xl font-bold text-activePrimaryBgColor">{title}</h2>
      {themeView && <div>
        <IoMdColorWand onClick={showHideToggle} className="w-7 h-7 animate-pulse cursor-pointer" />
      </div>}
    </div>
  );
}

export default Title;
