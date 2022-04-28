import React from "react";
import { ReactComponent as RemoveSVG } from "./svgs/remove.svg";
import { transferTimeToHumanize } from "./utils";

const FavoriteListItem = (props) => {
  return (
    <div className="favorite-list list-item">
      <span>
        {/* tips，點選此 icon 時，將歌曲移除我的最愛 */}
        <RemoveSVG
          className="remove-icon icon"
          onClick={() => props.handlers.toggleFavorite(props.metadata)}
        />
      </span>
      <span className="track-wrapper">
        <img
          className="album-cover"
          src={props.metadata.albumCover}
          alt="album-cover"
        />
        <span className="column">
          <span className="label">{props.metadata.name}</span>
          <span className="label">{props.metadata.singer}</span>
        </span>
      </span>
      {/* tips: 善用 utils.js 的 transferTimeToHumanize 方法轉換歌曲時間的顯示格式 */}
      <span className="track-length">
        {transferTimeToHumanize(props.metadata.musicTime)}
      </span>
    </div>
  );
};

export default FavoriteListItem;
