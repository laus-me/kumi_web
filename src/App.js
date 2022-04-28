import React, { Component } from "react";
import Header from "./Header";
import RankingList from "./RankingList";
import FavoriteList from "./FavoriteList";
import { user, tracks as allTracks } from "./datas";
import "./App.css";
import "./fonts/BebasNeue/BebasNeue-Regular.ttf";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: {
        ranking: allTracks,
        favorite: [],
      },
    };
  }

  // tips，處理歌曲是否已加入我的最愛
  isSongFavorite = (track) => {
    const { tracks } = this.state;
    return !!tracks.favorite.find(
      (favoriteTrack) => favoriteTrack.id === track.id
    );
  };

  // tips，處理加入或移除我的最愛功能
  toggleFavorite = (track) => {
    const { tracks } = this.state;
    const isFavorite = tracks.favorite.some(
      (favoriteTrack) => favoriteTrack.id === track.id
    );
    if (isFavorite) {
      this.setState({
        tracks: {
          ...tracks,
          favorite: tracks.favorite.filter(
            (favoriteTrack) => favoriteTrack.id !== track.id
          ),
        },
      });
    } else {
      this.setState({
        tracks: {
          ...tracks,
          favorite: [...tracks.favorite, track],
        },
      });
    }
  };

  // tips，取得歌曲讚數
  getSongLikeCount = (track) => {
    const { tracks } = this.state;
    const song = tracks.ranking.find(
      (rankingTrack) => rankingTrack.id === track.id
    );
    return song?.likeCount || 0;
  };

  // tips，更新歌曲讚數
  updateLikeCount = (track, direction) => {
    const { tracks } = this.state;
    this.setState({
      tracks: {
        ...tracks,
        ranking: tracks.ranking.map((rankingTrack) =>
          rankingTrack.id === track.id &&
          (rankingTrack.likeCount !== 0 || direction) &&
          (rankingTrack.likeCount !== Number.MAX_SAFE_INTEGER || !direction)
            ? {
                ...rankingTrack,
                likeCount: rankingTrack.likeCount + (direction ? 1 : -1),
              }
            : rankingTrack
        ),
      },
    });
  };

  render() {
    const handlers = {
      isSongFavorite: this.isSongFavorite,
      toggleFavorite: this.toggleFavorite,
      getSongLikeCount: this.getSongLikeCount,
      updateLikeCount: this.updateLikeCount,
    };
    return (
      <div className="app">
        <Header user={user} />
        <div className="main">
          {/* tips，傳入歌曲資料及相關事件的傳遞 */}
          <RankingList tracks={this.state.tracks.ranking} handlers={handlers} />
          {/* tips，傳入歌曲資料及相關事件的傳遞 */}
          <FavoriteList
            tracks={this.state.tracks.favorite}
            handlers={handlers}
          />
        </div>
      </div>
    );
  }
}
