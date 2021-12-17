import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import { useSelector, useDispatch } from "react-redux";

import Game from "../components/Game";
import WaitingOverlay from "../components/WaitingOverlay";
import axios from "axios";

function Home() {
  const gamesState = useSelector((state) => state.games);
  const waitingState = useSelector((state) => state.waiting);

  const [seeMoreVisible, setSeeMoreVisible] = useState(true);

  const games = gamesState.games;
  const waiting = waitingState.spinning;

  const dispatch = useDispatch();

  const queryParams = useSelector((state) => state.query);

  useEffect(() => {
    dispatch({
      type: "SET_SPINNING",
      payload: true,
    });
    axios
      .get("/api/game_list")
      .then((res) => {
        let data = res.data;
        if (data.status === "OK") {
          const arr = games.concat(data.games);
          dispatch({
            type: "SET_GAMES",
            payload: arr,
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
  }, []);

  const handleSeeMore = () => {
    setSeeMoreVisible(false);
    dispatch({
      type: "SET_SPINNING",
      payload: true,
    });

    let url = "/api/game_list";
    let hasChanged = false;
    url += "?";
    if (
      !(
        queryParams.country === null &&
        queryParams.brand_id === null &&
        queryParams.category === null
      )
    ) {
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

    if (hasChanged === true) url += "&";
    url += "p=" + (queryParams.page + 1);

    axios
      .get(url)
      .then((res) => {
        let data = res.data;
        if (data.status === "OK") {
          let arr = games.concat(data.games);
          dispatch({
            type: "SET_GAMES",
            payload: arr,
          });
          if (data.games.length > 0 && data.games.length % 24 === 0) {
            setSeeMoreVisible(true);
          }
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

    dispatch({
      type: "SET_QUERY_PAGE",
      payload: queryParams.page + 1,
    });
  };

  return (
    <>
      {waiting && <WaitingOverlay />}
      <Navbar />

      <div className="container">
        <div className="row">
          <div className="col text-center py-5">
            <div className=" h1">Welcome to our Great Gaming Platform !</div>
            <div className="h2">You can chose from our greatest games</div>
          </div>
        </div>
        <div className="row">
          {games.map((item, index) => {
            return <Game data={item} key={index} />;
          })}
        </div>
        {seeMoreVisible && (
          <div className="row mb-5">
            <div className="col text-center">
              <button
                className="btn btn-outline-dark py-4 px-5"
                onClick={handleSeeMore}
              >
                See more
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
