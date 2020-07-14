import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Playbutton from '../playButton';

export default class VideoPlayer extends React.Component {

   state = {
    play: true,
    timestamp: null,
    duration: null
   };

  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log(this)
    });
    this.interval = setInterval(() => this.setState({ timestamp: Math.round(this.videoNode.currentTime * 100) / 100}), 100);
    if(this.videoNode.duration)
    setTimeout(
      () => this.setState({ duration: Math.round(this.videoNode.duration * 100 / 100) }), 
      1000
    );
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
    clearInterval(this.interval);
  }


  playVideo = () =>{
    this.player.play();
    this.setState({ play: false});
  }
  
  pauseVideo = () =>{
    this.player.pause();
    this.setState({ play: true});
  }

  render() {
    const {axisX, axisY} = this.props;
    let {play, timestamp, duration} = this.state;

    return (
      <div>
        {play && 
            <Playbutton onhandleClick={this.playVideo} axisX={axisX} axisY={axisY} />
        }
        <div data-vjs-player onClick={this.pauseVideo}>
          <video ref={ node => this.videoNode = node } className="video-js"></video>
        </div>
        <p>{timestamp} s of {duration}s</p>
      </div>
    )
  }
}