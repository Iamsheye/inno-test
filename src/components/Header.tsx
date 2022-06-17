import { useSelector } from "react-redux";
import { State } from "../app/appSlice";
import { RootState } from "../app/store";

const Header = () => {
  const data = useSelector((state: RootState) => state.app) as State;
  return (
    <nav className={`mb-3`} style={{ background: data.config?.mainColor }}>
      <div className="wrapper">
        <div className="flex items-center justify-between py-5">
          <div>
            <img src={data.config?.logo} alt="Innoloft Logo" className="h-8" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
