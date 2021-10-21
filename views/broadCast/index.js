import React,{Component ,useEffect,useState } from "react"
import { SafeAreaView , View, ImageBackground, Image, TouchableOpacity, Text, TextInput, Dimensions,StatusBar} from "react-native"
import { Colors, hps, Images, wp, wps } from "../../assets"
import styles from "./styles"
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from "react-redux"
//import RnVerticalSlider from 'rn-vertical-slider-gradient'




const BroadCast = (props) => {

 const { lang } = useSelector(state => state.language)
 const [mode, setMode] = useState('360')
 const [mic, setMic] = useState(true)
 const [vol, setVol] = useState(true)
 const [peoples, setPeoples] = useState(false)
 const [comments, setComments] = useState(true)
 const [value, setValue] = useState(10)
 const [volBar, setVolBar] = useState(false)
 const [sheight, setSHeight] = useState('')
 const [sWidth, setSWidth] = useState('')


 const getScreenSize = () => {  
  const screenWidth = Math.round(Dimensions.get('window').width);  
  const screenHeight = Math.round(Dimensions.get('window').height);  
  setSWidth(screenWidth)
  setSHeight(screenHeight) 
  } 

  useEffect(()=>{
    getScreenSize()
    Dimensions.addEventListener('change', (e) => {
      const { width, height } = e.window;
      setSWidth(width)
      setSHeight(height) 
    })    
  },[])

return (
  <View style = {styles.mainContainer}>
    <StatusBar hidden = {sheight>sWidth ? false : true}/>
      <ImageBackground
      source = {Images.clip2}
      style = {styles.bgImage}
      >
      <TouchableOpacity 
      onPress = {() => {props.navigation.goBack()}}
      style = {sheight > sWidth? styles.back : styles.backLand}
      >
       <Image source = {Images.arrow} style = {styles.arrow}/>
      </TouchableOpacity>   

      <View style = {sheight > sWidth ? styles.modesContainer : styles.modesContainerLand}>
        
        <TouchableOpacity
        style = {[styles.mode, {backgroundColor : mode == '360' ? Colors.base1 : '#ffffff15'}]}
        >
        <Image source = {Images.degree_w}/>  
        </TouchableOpacity>
      
        <TouchableOpacity
        style = {[styles.mode, {backgroundColor : mode == 'vr' ? Colors.base1 : '#ffffff15'}]}
        >
        <Image source = {Images.vr_w}/>  
        </TouchableOpacity>
      
        <TouchableOpacity
        style = {[styles.mode, {backgroundColor : mode == 'video' ? Colors.base1 : '#ffffff15'}]}
        >
        <Image source = {Images.video_w}/>  
        </TouchableOpacity>
      </View>


      <Image source = {Images.middile} style = {styles.middle}/>

        
        {/* <Slider
        style = {{
          borderWidth:1, 
          width:wp(50),
          //transform: [{ rotate: "270deg" }]
        }}
        trackStyle = {{}}
        value={0.5}
        onValueChange={(value) => {}} 
        /> */}

        

      



      {!comments &&
      <>
      <TouchableOpacity
      onPress = {() => {setVolBar(!volBar)}}
      style = {[sheight>sWidth ? styles.volumeButton : styles.volumeButtonLand, { bottom:sheight>sWidth? hps(104) : wps(20), right:sheight>sWidth? wps(16) : hps(16) }]}
      >
      <Image source = {value !== 0 ? Images.speaker : Images.speaker_off}/>  
      </TouchableOpacity>

      <TouchableOpacity
      onPress = {() => {setPeoples(!peoples)}}
      style = {[sheight>sWidth ? styles.volumeButton : styles.volumeButtonLand, {bottom: sheight>sWidth? hps(104) : wps(20), right:null, left:sheight>sWidth? wps(16) : hps(16)}]}
      >
      <Image source = {peoples ? Images.peoples_white : Images.peoples_grey}/>  
      </TouchableOpacity>

      <TouchableOpacity
      //onPress = {() => {setPeoples(!peoples)}}
      style = {[sheight>sWidth ? styles.volumeButton : styles.volumeButtonLand, {bottom:sheight>sWidth? hps(162) : hps(80),right:null,left:wps(16)}]}
      >
      <Image source = {Images.clap}/>
      </TouchableOpacity>

      <TouchableOpacity
      onPress = {() => {setMic(!mic)}}
      style = {sheight>sWidth ? styles.micMainButton : styles.micMainButtonLand}
      >
        <LinearGradient
        colors = {['#EBA0EF','#27E4E5']}
        onPress = {() => {console.log('clicked')}}
        style = {[styles.micMainButton,{position:'relative', bottom:null}]}
        >
        <Image style = {styles.mic} source = {mic? Images.mic_on : Images.mic_off}/>  
        </LinearGradient>
      </TouchableOpacity>

      {volBar && <View style = {sheight>sWidth ? styles.volSlider: styles.volSliderLand}>
        {/* <RnVerticalSlider
          value={value}
          disabled={false}
          min = {0}
          max = {100}
          onChange={(value) => {
            setValue(value)
          }}
          onComplete={(value) => {
            setValue(value)
          }}
          width={hps(10)}
          height={wps(204)}
          step={1}
          borderRadius={wps(5)}
          minimumTrackTintColor={['#27E4E5','#CB65C7']}
          maximumTrackTintColor={"#E2EEFF45"}
        /> */}
        </View>}

      </>
      }

      {comments &&
       <View style = {sheight > sWidth ? styles.commentsMainContainer : styles.commentsMainContainerLand}>

        <View style = {styles.disableButtonContainer}>
          <TouchableOpacity 
          onPress = {() => {setComments(false)}}
          style = {styles.disableButton}></TouchableOpacity>
          <Text style = {styles.disableButtonTitle}>{lang?.disable_aud}</Text>
        </View>

        <View style = {styles.commentsContainer}>

          <View style = {styles.comment}>
            <Image style = {styles.user} source = {Images.user}/>
            <Text style = {styles.text}>very cool!!!</Text>
          </View>

          <View style = {styles.comment}>
            <Image style = {styles.user} source = {Images.user}/>
            <Text style = {styles.text}>Bravooooo! Encore!!!</Text>
          </View>

          <View style = {styles.comment}>
            <Image style = {styles.user} source = {Images.user}/>
            <Text style = {styles.text}>It is excellent</Text>
          </View>
        </View>

        <View style = {sheight > sWidth ? styles.textInputMainContainer : styles.textInputMainContainerLand}>

          <View style = {sheight > sWidth ? styles.textInputContainer : styles.textInputContainerLand}>
            <TextInput
            style = {styles.input}
            placeholder = {lang?.message}
            placeholderTextColor = {Colors.white}
            />
            <TouchableOpacity style = {styles.send}>
             <Image source = {Images.send} style = {[styles.send, {position:'relative', right:null}]}/>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
          style = {sheight > sWidth ? styles.micButton : styles.micButtonLand}>
            <Image source = {Images.mic_on} style = {styles.mic}/>
          </TouchableOpacity>

          <TouchableOpacity 
          style = {sheight > sWidth ? styles.clapButton : styles.clapButtonLand}>
            <Image source = {Images.clap} style = {styles.clap}/>
          </TouchableOpacity>

        </View>

        <TouchableOpacity 
          style = {sheight > sWidth ? styles.volumeButton : styles.volumeButtonLand}>
            <Image source = {Images.speaker} style = {styles.speaker}/>
          </TouchableOpacity>
      </View>}

      </ImageBackground>
  </View>
)}

export default BroadCast