import React, { Component } from 'react'

export default class Playbutton extends Component {

    render() {
        const {axisX, axisY, onhandleClick} = this.props;

        return (
            <div onClick={onhandleClick} className="playButton" style={{left: axisX, top: axisY}}>
                <img src="/asset/play.svg" alt="play" />
            </div>
        )
    }
}
