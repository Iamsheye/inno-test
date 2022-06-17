import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  NavLink,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { RootState } from "./app/store";
import { SET_CONFIG, State } from "./app/appSlice";
import axios from "axios";
import MainPage from "./pages/MainPage";
import ProductsPage from "./pages/ProductsPage";
import Header from "./components/Header";

const APP_ID = process.env.REACT_APP_APP_ID || 1;
axios.defaults.baseURL = "https://api-test.innoloft.com";

function App() {
  const navLinkClasses =
    "text-xl font-bold text-[#323b49] no-underline hover:opacity-60";
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.app) as State;

  useEffect(() => {
    const getConfig = async () => {
      try {
        const { data } = await axios.get(`/configuration/${APP_ID}/`);
        dispatch(SET_CONFIG(data));
      } catch (err) {
        console.log(err);
      }
    };

    getConfig();
  }, []);

  return (
    <Router>
      {data.config ? (
        <>
          <Header />
          <section className="grid-cols-12 gap-3 md:grid">
            <section className="col-span-2 flex justify-around bg-gray-100 py-3 px-4 md:block md:py-5">
              <div>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? `text-[#ab8601] ${navLinkClasses}`
                      : navLinkClasses
                  }
                >
                  Main Page
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    isActive
                      ? `text-[#ab8601] ${navLinkClasses}`
                      : navLinkClasses
                  }
                >
                  Products Page
                </NavLink>
              </div>
            </section>
            <Routes>
              <Route index element={<MainPage />} />
              <Route path="products" element={<ProductsPage />} />
            </Routes>
          </section>
        </>
      ) : (
        "loading..."
      )}
    </Router>
  );
}

export default App;
