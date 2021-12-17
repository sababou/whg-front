import React from "react";

import "../assets/styles.css";

function Game({ data }) {
  let gameClass = "";
  if (data.hot !== 0) {
    gameClass += " hot";
  }
  if (data.new !== 0) {
    gameClass += " new";
  }
  return (
    <>
      <div className="col-12 col-md-4 p-4">
        <div
          className={"game" + gameClass}
          onClick={() => {
            alert("Launch code : " + data.launchcode);
          }}
        >
          <div>
            <img
              src={
                "https://stage.whgstage.com/scontent/images/games/" +
                data.launchcode +
                ".jpg"
              }
              alt=""
              className="w-100"
            />
            <div className="px-3 pb-3">
              <div className="h3 py-2 text-center">{data.name}</div>
              <div>Provided by : {data.game_provider.name}</div>
              <div className="text-secondary">RTP : {data.rtp}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
