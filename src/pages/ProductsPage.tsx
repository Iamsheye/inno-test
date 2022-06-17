import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { SET_PRODUCTS, SET_TRL, State } from "../app/appSlice";
import Pill from "../components/Pill";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("Description");
  const { product, trl, config } = useSelector(
    (state: RootState) => state.app
  ) as State;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/product/6781/`);
        dispatch(SET_PRODUCTS(data));
      } catch (error) {
        console.log(error);
      }
    })();
    (async () => {
      try {
        const { data } = await axios.get(`/trl/`);
        dispatch(SET_TRL(data));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <section className="col-span-7">
        <section className="product_image mb-2">
          <img
            src={product?.picture}
            alt=""
            className="p-4 md:mx-auto md:w-1/2"
          />
        </section>
        <section className="mb-2 bg-gray-100 p-4">
          <div>
            <h1>Name: {product?.name}</h1>
            <h2>Type: {product?.type.name}</h2>
          </div>
        </section>
        <section className="bg-gray mb-2 flex items-center justify-around gap-6">
          <div
            className="desc_tab flex-1 cursor-pointer bg-gray-100 py-1 text-center"
            onClick={() => setTab("Description")}
          >
            <p>Description</p>
          </div>
          <div
            className="attr_tab flex-1 cursor-pointer bg-gray-100 py-1 text-center"
            onClick={() => setTab("Attributes")}
          >
            <p>Attributes</p>
          </div>
        </section>
        <section className="mb-4 bg-gray-100 p-4 md:mb-0">
          {tab === "Description" && (
            <div
              dangerouslySetInnerHTML={{
                __html: product?.description as string,
              }}
            />
          )}
          {tab === "Attributes" && (
            <div>
              <p className="mb-2 font-bold">
                Categories:{" "}
                {product?.categories.map((val) => (
                  <Pill text={val.name} key={val.id} />
                ))}
              </p>
              <p className="mb-2 font-bold">
                Business Models:{" "}
                {product?.businessModels.map((val) => (
                  <Pill text={val.name} key={val.id} />
                ))}
              </p>
              <p className="font-bold underline">TRL:</p>
              <ol>
                {trl.map((val) => (
                  <li key={val.id}>{val.name}</li>
                ))}
              </ol>
            </div>
          )}
        </section>
      </section>
      <section className="col-span-3">
        {config?.hasUserSection && (
          <section className="mb-2 bg-gray-100 p-4">
            <img src={product?.user?.profilePicture} alt="User" width="100%" />
            <p className="mt-3 text-xl font-bold">
              {product?.user?.firstName} {product?.user?.lastName}
            </p>
            <p className="font-medium">{product?.company?.name}</p>
          </section>
        )}
        <section className="bg-gray-100">
          <div id="map">
            <iframe
              title="map"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src={`https://maps.google.com/maps?q=${product?.company?.address.latitude}, ${product?.company?.address.longitude}&z=12&output=embed`}
            ></iframe>
          </div>
          <p className="p-4">
            {product?.company?.address.house} {product?.company?.address.street}
            , {product?.company?.address.city.name}{" "}
            {product?.company?.address.zipCode}
          </p>
        </section>
      </section>
    </>
  );
};

export default ProductsPage;
