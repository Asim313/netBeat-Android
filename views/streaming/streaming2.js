/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component , useRef,useState} from 'react';
import {
    Platform,
    TextInput,
    ScrollView,
    Button,
    Alert,
    Linking,
    StyleSheet,
    Text,
    View,
    Image,
    PermissionsAndroid,
    TouchableOpacity,
    Dimensions,
    BackHandler,
    ActivityIndicator,
    Animated,
    AppState,
    TouchableWithoutFeedback
} from 'react-native';
import {
    ViroVRSceneNavigator,
    ViroARSceneNavigator
  } from 'react-viro';
import LinearGradient from 'react-native-linear-gradient';
import KeepAwake from 'react-native-keep-awake';

import InCallManager from 'react-native-incall-manager';  
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios'
const OPENVIDU_SERVER_URL = 'https://alessandro.quickver.com';
const OPENVIDU_SERVER_SECRET = 'Husni123';
import VRR from './index2';
import { hp, Size, wp } from '../../assets';
import { _retrieveData } from '../../asyncStorage/AsyncFuncs';
type Props = {};

const FadeInView = (props) => {
    const height = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  
    React.useEffect(() => {
      
        Animated.timing(height,{
          toValue : 1,
          duration : 1500
        }).start();
        setTimeout(()=>{
            height.setValue(0)     
        },1500)
      
    }, [])
  
    return (
      <Animated.View                 
        style={{
          ...props.style,
           transform : [
          {
            scale : height
          }
        ]
        }}
      >
        {props.children}
      </Animated.View>
    );
  }

export default class App extends Component<Props> {
    constructor(props) {
        super(props);

        this.state = {
            mySessionId: 'SessionA',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            session: undefined,
            mainStreamManager: undefined,
            subscribers: [],
            role: 'PUBLISHER',
            mirror: true,
            videoSource: undefined,
            video: true,
            audio: true,
            publisherId : '',
            indicator : true,
            record : false,
            vr : false,
            loader : true,
            loaderState : false,
            turnedOn :  false,
            selected : 0,
            selectedURI : this.props.route.params.list[0].stream_android,
            height : new Animated.Value(-wp(8)),
            topHeaderHeight : new Animated.Value(0),
            appState: AppState.currentState,
            showClap : false

        };

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.vrRef = null;

    }

    // InitialVRScene = () => {
    //     return <ViroScene>
    //     <TouchableOpacity onPress={
    //             ()=>{
    //                     this.props.sceneNavigator.push({scene:this.InitialVRScene2});
                    
    //         }} style={{flex : 1}}>   
    //      <Viro360Video scale={[2, 2, 0]} source={{uri : 'http://164.132.160.103:8081/origin1/stream/test/playlist.m3u8'}} />
    //      </TouchableOpacity>
    //    </ViroScene>
    // }

    // InitialVRScene2 = () => {
    //     return <ViroScene>
    //     <TouchableOpacity onPress={
    //             ()=>{
    //                     this.props.sceneNavigator.push({scene:this.InitialVRScene});
                    
    //         }} style={{flex : 1}}>   
    //      <Viro360Video scale={[2, 2, 0]} source={{uri : 'http://164.132.160.103:8081/origin1/stream/test/playlist.m3u8'}} />
    //      </TouchableOpacity>
    //    </ViroScene>
    //  }
    componentDidMount() {
        this.vrheadset = (this.vrheadset == 'yes')? true:false;
       this.joinSession()
    //    InCallManager.start();
    //    InCallManager.setForceSpeakerphoneOn(true)
       AppState.addEventListener('change', this._handleAppStateChange);       
       BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
       
    }


    _handleAppStateChange = (nextAppState) => {
        console.log(nextAppState)
        var a = null;
        var loading = null;
        if (
          this.state.appState.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
            loading = false;
            this.joinSession();
        }else{
            loading = true;
            this.leaveSession(false);
        }
        // console.log(a,loading)
        this.setState({appState: nextAppState });
      };


      handleBackButtonClick() {
        // Registered function to handle the Back Press
        // We are generating an alert to show the back button pressed
        // alert('You clicked back. Now Screen will move to ThirdPage');
        // We can move to any screen. If we want
        this.leaveSession(true)
        // Returning true means we have handled the backpress
        // Returning false means we haven't handled the backpress
        return true;
      }

    componentWillUnmount() {
        //this.leaveSession();
        AppState.removeEventListener('change', this._handleAppStateChange);
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);

    }

    async checkAndroidPermissions() {
        try {
            const camera = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
                title: 'Camera Permission',
                message: 'OpenVidu needs access to your camera',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            });
            const audio = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
                title: 'Audio Permission',
                message: 'OpenVidu needs access to your microphone',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            });
            const storage = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
                title: 'STORAGE',
                message: 'OpenVidu  needs access to your storage ',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            });
            if (camera === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Camera permission denied');
            }
            if (audio === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the audio');
            } else {
                console.log('audio permission denied');
            }
            if (storage === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the storage');
            } else {
                console.log('storage permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }

    joinSession() {
        // --- 1) Get an OpenVidu object ---

        this.OV = new OpenVidu();

        // --- 2) Init a session ---

        this.setState(
            {
                session: this.OV.initSession(),
            },
            () => {
                var mySession = this.state.session;
                // --- 3) Specify the actions when events take place in the session ---

                // On every new Stream received...
                // mySession.on('streamCreated', (event) => {
                //     // Subscribe to the Stream to receive it. Second parameter is undefined
                //     // so OpenVidu doesn't create an HTML video by its own
                //     if(this.getNicknameTag(event.stream).indexOf('Artist') > -1){

                //     const subscriber = mySession.subscribe(event.stream, undefined);

                //     var subscribers = this.state.subscribers;

                //     subscribers.push(subscriber);
                //     // Update the state with the new subscribers
                //     this.setState({
                //         subscribers: subscribers,
                //     });
                // }
                // });

                // On every Stream destroyed...
                mySession.on('streamDestroyed', (event) => {
                    event.preventDefault();
                    // Remove the stream from 'subscribers' array
                    this.deleteSubscriber(event.stream.streamManager);
                });

                // --- 4) Connect to the session with a valid user token ---
                // 'getToken' method is simulating what your server-side should do.
                // 'token' parameter should be retrieved and returned by your own backend
                this.getToken()
                    .then(async(token) => {
                        // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
                        // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
                        const a = await _retrieveData('user');
                        
                        mySession
                            .connect(token, JSON.stringify({ clientData: a?.id,username : a?.username ,group_id : a?.group?.id,type : '360'}))
                            .then(() => {
                                if (Platform.OS == 'android') {
                                    this.checkAndroidPermissions();
                                }

                                // --- 5) Get your own camera stream ---
                               
                                    // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
                                    // element: we will manage it on our own) and with the desired properties
                                //  if( this.props.route.params.data == 1){
                                //     const properties = {
                                //         audioSource: undefined, // The source of audio. If undefined default microphone
                                //         videoSource: undefined, // The source of video. If undefined default webcam
                                //         publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                                //         publishVideo: true, // Whether you want to start publishing with your video enabled or not
                                //         resolution: '640x480', // The resolution of your video
                                //         frameRate: 30, // The frame rate of your video
                                //         insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                                //     };
                                //     let publisher = this.OV.initPublisher(undefined, properties);

                                //     // --- 6) Publish your stream ---

                                //     // Set the main video in the page to display our webcam and store our Publisher
                                //     this.setState({
                                //         mainStreamManager: publisher,
                                //         videoSource: !properties.videoSource ? '1' : properties.videoSource, // 0: back camera | 1: user camera |
                                //     });
                                //     mySession.publish(publisher);
                                // }else{
                                    const properties = {
                                        audioSource: true, // The source of audio. If undefined default microphone
                                        videoSource: undefined, // The source of video. If undefined default webcam
                                        publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                                        publishVideo: undefined, // Whether you want to start publishing with your video enabled or not
                                        resolution: '640x480', // The resolution of your video
                                        frameRate: 30, // The frame rate of your video
                                        insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                                    };
                                    let publisher = this.OV.initPublisher(undefined, properties);
                                    this.setState({
                                        mainStreamManager: publisher,
                                    });
                                    mySession.publish(publisher);
                                    mySession.on('signal:my-chat', (event) => {
                                        if(!this.state.loaderState){
                                            this.setState({
                                                loaderState : true
                                            })
                                            setTimeout(()=>{
                                                this.setState({
                                                    showClap : true
                                                })
                                            },200)
                                            setTimeout(()=>{
                                                this.setState({
                                                    loaderState : false,
                                                    showClap : false
                                                })
                                            },4000)
                                        }
                                    });
                                // }
                                
                            })
                            .catch((error) => {
                                console.warn('There was an error connecting to the session:', error.code, error.message);
                            });
                    })
                    .catch((error) => console.warn('Error', error));
            },
        );
    }

    getNicknameTag(stream) {
        // Gets the nickName of the user
        if (stream.connection && JSON.parse(stream.connection.data) && JSON.parse(stream.connection.data).clientData) {
            return JSON.parse(stream.connection.data).clientData;
        }
        return '';
    }

    deleteSubscriber(streamManager) {
        setTimeout(() => {
            let subscribers = this.state.subscribers;
            const index = subscribers.indexOf(streamManager, 0);
            if (index > -1) {
                subscribers.splice(index, 1);
                this.setState({
                    subscribers: subscribers,
                });
            }
        });
    }

    async leaveSession(data) {
        // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

        const mySession = this.state.session;

        if (mySession) {
            mySession.disconnect();
        }        

        // Empty all properties...
        setTimeout(() => {
            this.OV = null;
            this.setState({
                session: undefined,
                subscribers: [],
                mySessionId: 'SessionA',
                myUserName: 'Participant' + Math.floor(Math.random() * 100),
                mainStreamManager: undefined,
                publisher: undefined,
            });
        });

        if(data)
        this.props.navigation.pop()
    }

    toggleCamera() {
        /**
         * _switchCamera() Method provided by react-native-webrtc:
         * This function allows to switch the front / back cameras in a video track on the fly, without the need for adding / removing tracks or renegotiating
         */

        this.state.mainStreamManager.stream
        .getMediaStream()
        .getVideoTracks()[0]
        ._switchCamera();
        this.setState({ mirror: !this.state.mirror });

        /**
         * Traditional way:
         * Renegotiating stream and init new publisher to change the camera
         */
        /*
        this.OV.getDevices().then(devices => {
            console.log("DEVICES => ", devices);
            let device = devices.filter(device => device.kind === 'videoinput' && device.deviceId !== this.state.videoSource)[0]
            const properties = {
                audioSource: undefined,
                videoSource: device.deviceId,
                publishAudio: true,
                publishVideo: true,
                resolution: '640x480',
                frameRate: 30,
                insertMode: 'APPEND',
            }

            let publisher = this.OV.initPublisher(undefined, properties);

            this.state.session.unpublish(this.state.mainStreamManager);

            this.setState({
                videoSource : device.deviceId,
                mainStreamManager: publisher,
                mirror: !this.state.mirror
            });
            this.state.session.publish(publisher);
        });
        */
    }

    muteUnmuteMic() {
        this.state.mainStreamManager.publishAudio(!this.state.audio);
        this.setState({ audio: !this.state.audio });
    }

    muteUnmuteCamera() {
        this.state.mainStreamManager.publishVideo(!this.state.video);
        this.setState({ video: !this.state.video });
    }

    onExit() {
        this.props.navigation.pop()
    }


    async turnOnDisplay(){
        Animated.timing(this.state.height, {
            toValue: -wp(8),
            duration: 500
        }).start()
        Animated.timing(this.state.topHeaderHeight, {
            toValue:  wp(.5),
            duration: 500
        }).start()
        
    }

    async turnOffDisplay(){
        Animated.timing(this.state.height, {
            toValue: wp(20),
            duration: 500
        }).start()

        Animated.timing(this.state.topHeaderHeight, {
            toValue: -wp(20),
            duration: 500
        }).start()
    }


    render() {
        Animated.timing(this.state.height, {
            toValue: wp(20),
            duration: 2000
        }).start()

        Animated.timing(this.state.topHeaderHeight, {
            toValue: -wp(20),
            duration: 2000
        }).start()
        return (
        <View  style={{flex : 1}}>
            <KeepAwake />
        <TouchableWithoutFeedback onPress={async ()=>{
            const a = this.state.turnedOn;
            await this.setState({
                turnedOn : !this.state.turnedOn
            }) 
            // alert(a)
            if(a){
            this.turnOffDisplay()   
            }
            else 
            this.turnOnDisplay()
        }}>
            <View style={{height : '100%', width : '100%'}}>
            <VRR 
                onExitViro={()=>{
                    this.leaveSession(true)
                }} 
                uri ={this.state.selectedURI}
                vr={false}
            ></VRR>
            </View>
            </TouchableWithoutFeedback>
            <View style={{height : '100%',justifyContent : 'flex-start',position : 'absolute',  marginLeft : wp(5)}}>
        <View style={{flex : 1}}>
        <Animated.View style={{ alignSelf : 'flex-start', justifyContent : 'center',alignItems : 'center',  paddingHorizontal : wp(3), paddingVertical : wp(0.5), borderRadius : wp(10), top : this.state.topHeaderHeight}}>

         <TouchableOpacity onPress={()=>{this.leaveSession(true)}} style={{paddingHorizontal : wp(2), paddingVertical : hp(5)}}>
             <Image resizeMode='contain' source={require('../../resources/images/back.png')} ></Image>
         </TouchableOpacity>
        </Animated.View>
        {/* <View style={{flex : .8, marginHorizontal : wp(7)}}>
            
      
      </View> */}
            <View style={{flex : 1}}></View>
      <Animated.View style={{ alignItems : 'center', justifyContent : 'center', flexDirection : 'row', backgroundColor : 'rgba(255,255,255,0.2)', paddingHorizontal : wp(3), paddingVertical : wp(2), borderRadius : wp(10), top : this.state.height}}>
                {this.props.route.params.list.map((i,index)=>{
                    return <TouchableOpacity onPress={()=>{
                        this.setState({
                            selected : index,
                            selectedURI : i.stream_android
                        })
                    }} style={{height : wp(8),width : wp(8), borderRadius : wp(8)/2, backgroundColor : 'rgba(0,0,0,0.8)', justifyContent : 'center', alignItems : 'center', marginRight : (index + 1) == this.props.route.params.list.length ? 0 : wp(2)}}>
                    <Text style={{color :this.state.selected == index ? '#979797' : '#007AFF'}}>{index}</Text>
                    </TouchableOpacity>
                })}
            </Animated.View>
            </View>
           </View>
            {this.state.loaderState ? 
            <FadeInView style={{alignSelf : 'center',height : '100%',justifyContent : 'center',position : 'absolute'}}>
                    {this.state.showClap &&
                    <Image resizeMode='contain' source={require('../../resources/images/clap.png')}></Image>}
             </FadeInView>
             :
             null}

        </View> 

      );
    }

    /**
     * --------------------------
     * SERVER-SIDE RESPONSIBILITY
     * --------------------------
     * These methods retrieve the mandatory user token from OpenVidu Server.
     * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
     * the API REST, openvidu-java-client or openvidu-node-client):
     *   1) Initialize a session in OpenVidu Server	(POST /api/sessions)
     *   2) Generate a token in OpenVidu Server		(POST /api/tokens)
     *   3) The token must be consumed in Session.connect() method
     */

    getToken() {
        return this.createSession(this.state.mySessionId)
            .then((sessionId) => this.createToken(sessionId))
            .catch((error) => console.log(error));
    }

    // getTokenFromServer() {
    //     return WService.get('stream/join/16',this.context.state.user['auth._token.local'])
    // }

    createSession(sessionId) {
        return new Promise((resolve) => {
            var data = JSON.stringify({ customSessionId: sessionId });
            axios
                .post(OPENVIDU_SERVER_URL + '/api/sessions', data, {
                    headers: {
                        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                })
                .then((response) => {
                    console.log('CREATE SESION', response);
                    resolve(response.data.id);
                })
                .catch((response) => {
                    console.log(response);
                    var error = Object.assign({}, response);
                    if (!error.response) {
                        console.error("Network error: ", error);
                        if( error.request && error.request._response){
                            console.error("Response of the request: ", error.request._response);
                        }
                    }
                    else if (error.response && error.response.status && error.response.status === 409) {
                        console.log('RESOLVING WITH SESSIONID, 409');
                        resolve(sessionId);
                    } else {
                        console.warn(
                            'No connection to OpenVidu Server. This may be a certificate error at ' + OPENVIDU_SERVER_URL,
                        );

                        Alert.alert(
                            'No connection to OpenVidu Server.',
                            'This may be a certificate error at "' +
                                OPENVIDU_SERVER_URL +
                                '"\n\nClick OK to navigate and accept it. ' +
                                'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                                OPENVIDU_SERVER_URL +
                                '"',
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel',
                                },
                                {
                                    text: 'OK',
                                    onPress: () =>
                                        Linking.openURL(OPENVIDU_SERVER_URL + '/accept-certificate').catch((err) =>
                                            console.error('An error occurred', err),
                                        ),
                                },
                            ],
                            { cancelable: false },
                        );
                    }
                });
        });
    }

    createToken(sessionId) {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({ session: sessionId });
            axios
                .post(OPENVIDU_SERVER_URL + '/api/tokens', data, {
                    headers: {
                        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    console.log('TOKEN', response);
                    this.setState({indicator : false})
                    resolve(response.data.token);
                })
                .catch((error) => reject(error));
        });
    }
}



































