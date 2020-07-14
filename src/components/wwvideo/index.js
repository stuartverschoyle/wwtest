import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import VideoPlayer from '../videoPlayer'; 

import './styles.scss';

export default class Wwvideo extends Component {
    state = {
        data: null,
        error: false
      };

  
    componentDidMount() {
        // Call our fetch function below once the component mounts

        this.callBackendAPI()
        .then(res => {
            var data = JSON.parse(res.express);
            var name = data.name;
            var description = data.description;
            var axisX = data.coordinates.x;
            var axisY = data.coordinates.y;
    
            this.setState({ 
                data: res.express, 
                name: name, 
                description: description, 
                axisX: axisX, 
                axisY: axisY 
            });
        })
        .catch(err => console.log(err));
    
        
    }
    
    
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
    
        let path = this.props.match.params.id;
        let response = await fetch(path);

        const body = await response.json();
        if (response.status === 404) {
            this.setState({ error: true })
        }   
        
        if (response.status !== 200) {
            throw Error(body.message) 
        }
   
        return body;
    };    

    render() {
        let path = this.props.match.params.id;
        let {error} = this.state;

        console.log(path);

        const videoJsOptions = {
            autoplay: false,
            playbackRates: [0.5, 1, 1.25, 1.5, 2],
            width: 720,
            height: 300,
            controls: false,
            sources: [
              {
                src: path+'/'+path +'.mp4',
                type: 'video/mp4'
              },
            ],
          };       
        if(error) {
            return(
                <div className="container">
                    <h1>404 - Sorry, no videos here!</h1>
                </div>
            )
        }         
        return (
            <>
                <div className="ww-container">
                    <VideoPlayer { ...videoJsOptions } axisX={this.state.axisX} axisY={this.state.axisY}  />
                </div>
                <div className="description-container">
                    <p className="App-intro">{this.state.name}</p>
                    <p className="App-intro">{this.state.description}</p>
                </div>
            </>
        )
    }
}
