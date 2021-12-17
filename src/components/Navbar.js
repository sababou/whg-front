import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { useState, useEffect } from "react";

import axios from "axios";

function Navbar() {
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [brands, setBrands] = useState([]);

  const dispatch = useDispatch();

  const queryParams = useSelector((state) => state.query);

  const updateGamesList = () => {
    dispatch({
      type: "SET_SPINNING",
      payload: true,
    });

    dispatch({
      type: "SET_QUERY_PAGE",
      payload: 0,
    });

    let url = "/api/game_list";
    let hasChanged = false;
    if (
      !(
        queryParams.country === null &&
        queryParams.brand_id === null &&
        queryParams.category === null
      )
    ) {
      url += "?";
      if (queryParams.country !== null) {
        url += "country=" + queryParams.country;
        hasChanged = true;
      }

      if (queryParams.brand_id !== null) {
        if (hasChanged === true) url += "&";
        url += "brand_id=" + queryParams.brand_id;
        hasChanged = true;
      }

      if (queryParams.category !== null) {
        if (hasChanged === true) url += "&";
        url += "category=" + queryParams.category;
        hasChanged = true;
      }
    }

    axios
      .get(url)
      .then((res) => {
        let data = res.data;
        if (data.status === "OK") {
          dispatch({
            type: "SET_GAMES",
            payload: data.games,
          });
        } else {
          console.log(data.err);
        }
        dispatch({
          type: "SET_SPINNING",
          payload: false,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: "SET_SPINNING",
          payload: false,
        });
      });
  };

  useEffect(() => {
    axios
      .get("/api/category_list")
      .then((res) => {
        let data = res.data;
        if (data.status === "OK") {
          setCategories(data.categories);
        } else {
          console.log(data.err);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("/api/country_list")
      .then((res) => {
        let data = res.data;
        if (data.status === "OK") {
          setCountries(data.countries);
        } else {
          console.log(data.err);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("/api/brand_list")
      .then((res) => {
        let data = res.data;
        if (data.status === "OK") {
          setBrands(data.brands);
        } else {
          console.log(data.err);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCountryChange = (evt) => {
    if (evt.target.value !== "")
      dispatch({
        type: "SET_QUERY_COUNTRY",
        payload: evt.target.value,
      });
    else
      dispatch({
        type: "SET_QUERY_CATEGORY",
        payload: null,
      });

    updateGamesList();
  };
  const handleBrandChange = (evt) => {
    if (evt.target.value !== "")
      dispatch({
        type: "SET_QUERY_BRAND_ID",
        payload: evt.target.value,
      });
    else
      dispatch({
        type: "SET_QUERY_CATEGORY",
        payload: null,
      });

    updateGamesList();
  };
  const handleCategoryChange = (evt) => {
    if (evt.target.value !== "")
      dispatch({
        type: "SET_QUERY_CATEGORY",
        payload: evt.target.value,
      });
    else
      dispatch({
        type: "SET_QUERY_CATEGORY",
        payload: null,
      });

    updateGamesList();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-4">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          WHG-Test
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav w-100 mb-2 mb-lg-0 justify-content-center">
            <li className="nav-item mx-5">
              <select
                name=""
                id=""
                className="form-select"
                onChange={handleCategoryChange}
              >
                <option value="">Category</option>
                {categories.map((item, index) => {
                  return <option value={item.name}>{item.name}</option>;
                })}
              </select>
            </li>

            <li className="nav-item mx-5">
              <select
                name=""
                id=""
                className="form-select"
                onChange={handleBrandChange}
              >
                <option value="">Brand</option>
                {brands.map((item, index) => {
                  return <option value={item.id}>{item.name}</option>;
                })}
              </select>
            </li>

            <li className="nav-item mx-5">
              <select
                name=""
                id=""
                className="form-select"
                onChange={handleCountryChange}
              >
                <option value="">Country</option>
                {countries.map((item, index) => {
                  return <option value={item.code}>{item.country}</option>;
                })}
              </select>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
