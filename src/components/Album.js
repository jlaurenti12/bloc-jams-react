import React, { Component } from 'react';
import albumData from './../data/albums';
import './album.css';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      volume: 0.5,
      isPlaying: false
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;

  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }


  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(this.state.album.songs.length - 1, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume });
  }

  formatTime(seconds) {
    const time = Math.floor(seconds);
    const formattedSeconds = String(time % 60);
    const formattedMin = String(Math.floor((time - formattedSeconds) / 60));
    if (isNaN(seconds)) {
      return "-:--"
    } else {
      return formattedMin + ":" + formattedSeconds.padStart(2, "0");
    }
  }

  render() {
    return (
    <section className="above-player-bar">
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} />
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
           {
            this.state.album.songs.map((song, index) =>
            <tr className="song" key={index} onClick={() => this.handleSongClick(song)} >
                <td>
                  <button>
                   <span className="song-number">{ (this.state.isPlaying && song === this.state.currentSong) ? null : index + 1 }</span>
                   <img className="pause" src={ (this.state.isPlaying && song === this.state.currentSong) ? "../assets/images/List_Pause.svg": null}/>
                   <img className="play" src={ (this.state.isPlaying && song === this.state.currentSong) ? null : "../assets/images/List_Play.svg"}/>
                  </button>
                </td>
                <td>{ song.title }</td>
                <td>{ this.formatTime(song.duration) }</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          volume={this.state.volume}
          artist={this.state.album.artist}
          albumCover={this.state.album.albumCover}
          song={this.state.currentSong.title}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
          formatTime = {(seconds) => this.formatTime(seconds)}
        />
      </section>
    );
  }
}

export default Album
