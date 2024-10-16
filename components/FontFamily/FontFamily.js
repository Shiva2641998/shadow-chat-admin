import { useEffect, useState } from "react";
import { useRequestApiAction } from "../../axios/requests/useRequestApiAction";

const FontFamily = ({onFontChange, value}) => {
  const [themeInfo, setthemeInfo] = useState({});
  const { GET } = useRequestApiAction();
  console.log(value,"value")

  const getThemeUI = async () => {
    const { data } = await GET("/theme");
    if (data.success) {
      setthemeInfo(data.data[0]);
    }
  };

  useEffect(() => {
    getThemeUI();
  }, []);

  return (
    <div className="dropdown" style={{height: "10px"}}>
      <div tabIndex={0} role="button" className="m-1">
       {value?.fontName ?? "Select Font"}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[10] w-52 p-2 shadow"
      >
        {themeInfo?.fontFamily?.map((e) => (
          <li onClick={() => onFontChange(e)}>
            <a>{e.fontName}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FontFamily;
