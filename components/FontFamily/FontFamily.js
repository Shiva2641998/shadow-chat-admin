import { useEffect, useState } from "react";
import { useRequestApiAction } from "../../axios/requests/useRequestApiAction";

const FontFamily = () => {
  const [themeInfo, setthemeInfo] = useState({});
  const { GET } = useRequestApiAction();

  const getThemeUI = async () => {
    const { data } = await GET("/theme");
    if (data.success) {
      setthemeInfo(data.data[0]);
    }
  };
console.log(themeInfo,"themeInfo")
  useEffect(() => {
    getThemeUI();
  }, []);

  return (
    <div className="dropdown" style={{height: "10px"}}>
      <div tabIndex={0} role="button" className="btn m-1">
        Font
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        {themeInfo?.fontFamily?.map((e) => (
          <li>
            <a>Item 1</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FontFamily;
