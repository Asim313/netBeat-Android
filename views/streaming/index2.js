import React from 'react';
import {
    ViroVRSceneNavigator,
    ViroARSceneNavigator,
    ViroScene,
  ViroText,
  Viro360Image,
  Viro360Video,
  } from 'react-viro';


export default class VRR extends React.Component{

    // data = () => {
    //        return <InitialVRScene uri = {'https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4'}></InitialVRScene>
    // }
    render(){
        return(
            <ViroVRSceneNavigator 
            vrModeEnabled = {this.props.vr}            
            {...{apiKey:"API_KEY_HERE"}}
            initialScene={{scene: () => { return <ViroScene >       
                <Viro360Video scale={[2, 2, 0]} source={{uri : this.props.uri}} />
              </ViroScene>}}} 
            onExitViro={this.props.onExitViro}
        />
        )
    }
}