import React from "react";
import FavoriteListItem from "./FavoriteListItem";
import { transferTimeToHumanize } from "./utils";

// tips: 計算歌曲總長度時間可善用 array.reduce() 方法進行加總
const FavoriteList = (props) => {
  const listTrackLength = props.tracks.reduce(
    (acc, track) => acc + track.musicTime,
    0
  );
  return (
    <div className="favorite-list list">
      <div className="title">
        我的最愛
        {/* tips: 善用 utils.js 的 transferTimeToHumanize 方法轉換歌曲時間的顯示格式 */}
        {listTrackLength > 0 && (
          <span className="total">
            （總長度 {transferTimeToHumanize(listTrackLength)}）
          </span>
        )}
      </div>
      {
        /* tips，傳入歌曲資料與適當的 callback */
        props.tracks.map((track) => (
          <FavoriteListItem
            key={track.id}
            metadata={track}
            handlers={props.handlers}
          />
        ))
      }
    </div>
  );
};

export default FavoriteList;
