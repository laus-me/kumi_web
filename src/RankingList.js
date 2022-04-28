import React from "react";
import RankingListItem from "./RankingListItem";
import { transferTimeToHumanize } from "./utils";

// tips: 計算歌曲總長度時間可善用 array.reduce() 方法進行加總
const RankingList = (props) => {
  const listTrackLength = props.tracks.reduce(
    (acc, track) => acc + track.musicTime,
    0
  );
  return (
    <div className="ranking-list list">
      <div className="title">
        {/* tips: 善用 utils.js 的 transferTimeToHumanize 方法轉換歌曲時間的顯示格式 */}
        音樂榜
        {listTrackLength > 0 && (
          <span className="total">
            （總長度 {transferTimeToHumanize(listTrackLength)}）
          </span>
        )}
      </div>
      {
        /* tips，傳入歌曲資料與適當的 callback */
        props.tracks.map((track) => (
          <RankingListItem
            key={track.id}
            metadata={track}
            handlers={props.handlers}
          />
        ))
      }
    </div>
  );
};

export default RankingList;
