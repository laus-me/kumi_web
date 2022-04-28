import { Component } from "react";
import { ReactComponent as PlaySVG } from "./svgs/play.svg";
import { ReactComponent as FavoriteSVG } from "./svgs/favorite.svg";
import { ReactComponent as FavoriteFillSVG } from "./svgs/favorite-fill.svg";
import { ReactComponent as LikeSVG } from "./svgs/like.svg";
import { ReactComponent as DislikeSVG } from "./svgs/dislike.svg";
import { transferTimeToHumanize } from "./utils";

export default class RankingListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downloadTime: props.metadata.downloadTime,
    };
  }

  // 模擬下載秒數倒數功能
  async downloader() {
    setTimeout(() => {
      if (this.state.downloadTime === 0) return;
      this.setState({
        downloadTime: this.state.downloadTime - 1,
      });
      this.downloader();
    }, 1000);
  }

  // tips，處理下載剩餘時間倒數功能
  componentDidMount() {
    this.downloader();
  }

  render() {
    return (
      <div className="ranking-list-item list-item">
        <span>
          <PlaySVG className="play-icon icon" />
        </span>
        <span className="track-wrapper">
          <img
            className="album-cover"
            src={this.props.metadata.albumCover}
            alt="album-cover"
          />
          <span className="column">
            <span className="label">{this.props.metadata.name}</span>
            <span className="label">{this.props.metadata.singer}</span>
          </span>
        </span>
        <span className="download">
          {this.state.downloadTime ? (
            /* tips，歌曲 "下載尚未完成" 時顯示下方內容，進行下載剩餘秒數倒數 */
            <span className="loading">
              下載中...（剩 {this.state.downloadTime} 秒）
            </span>
          ) : (
            /* tips，歌曲 "下載完成" 時顯示下方內容 */
            <span className="completed">下載完成</span>
          )}
        </span>
        <span className="like-wrapper">
          {/* tips，點選此 icon 時，增加歌曲的 Like 數 */}
          <LikeSVG
            className="like-icon icon"
            onClick={() =>
              this.props.handlers.updateLikeCount(this.props.metadata, true)
            }
          />
          <span className="count">
            {this.props.handlers.getSongLikeCount(this.props.metadata)}
          </span>
          {/* tips，點選此 icon 時，減少歌曲的 Like 數 */}
          <DislikeSVG
            className="dislike-icon icon"
            onClick={() =>
              this.props.handlers.updateLikeCount(this.props.metadata, false)
            }
          />
        </span>
        <span>
          {this.props.handlers.isSongFavorite(this.props.metadata) ? (
            /* tips，當此歌曲 "已加入" 我的最愛時，顯示下方綠色愛心內容，點選此 icon 時，將歌曲移除我的最愛 */
            <FavoriteFillSVG
              onClick={() =>
                this.props.handlers.toggleFavorite(this.props.metadata)
              }
              className="favorite-icon icon checked"
            />
          ) : (
            /* tips，當此歌曲 "未加入" 我的最愛時，顯示下方空心愛心內容，點選此 icon 時，將歌曲加入我的最愛*/
            <FavoriteSVG
              onClick={() =>
                this.props.handlers.toggleFavorite(this.props.metadata)
              }
              className="favorite-icon icon"
            />
          )}
        </span>
        {/* tips: 善用 utils.js 的 transferTimeToHumanize 方法轉換歌曲時間的顯示格式 */}
        <span className="track-length">
          {transferTimeToHumanize(this.props.metadata.musicTime)}
        </span>
      </div>
    );
  }
}
