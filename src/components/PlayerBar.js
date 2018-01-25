import React, { Component } from 'react';
import './playerbar.css';

class PlayerBar extends Component {
  render() {
    return (
      <section className="player-bar">
      <section id="info">
          <img id="mini-album" src={this.props.albumCover} />
          <div className="song-info">{this.props.song} <br /> {this.props.artist} </div>
      </section>
      <section id="buttons">
          <button id="previous" onClick={this.props.handlePrevClick}>
            <span><img src="../assets/images/Backward.svg"/></span>
          </button>
          <button id="play-pause" onClick={this.props.handleSongClick} >
            <span><img src={this.props.isPlaying ? "../assets/images/Pause.svg" : "../assets/images/Play.svg"}/></span>
          </button>
          <button id="next" onClick={this.props.handleNextClick}>
            <span><img src="../assets/images/Forward.svg"/></span>
          </button>
      </section>
        <section id="time-control">
          <div className="time-value">{ this.props.formatTime(this.props.currentTime) }</div>
          <input
            type="range"
            className="seek-bar"
            value={(this.props.currentTime / this.props.duration) || 0}
            max="1"
            min="0"
            step="0.01"
            onChange={this.props.handleTimeChange}
          />
          <div className="time-value">{ this.props.formatTime(this.props.duration)}</div>
        </section>
        <section id="volume-control">
          <div><img src="../assets/images/Volume.svg"/></div>
          <input
            type="range"
            className="seek-bar"
            value={this.props.volume}
            max="1"
            min="0"
            step="0.1"
            onChange={this.props.handleVolumeChange}
          />
        </section>
      </section>
    );
  }
}

export default PlayerBar;
