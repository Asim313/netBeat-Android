import React,{Component, useState, useEffect} from 'react';
import { useIsFocused } from '@react-navigation/core';
import { View , Image, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, ImageBackground, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { wp,hp,Size, hps, wps, Images, Colors} from '../../assets/index';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux';

const Event = (props) => {

   const {lang, selectedLangVal} = useSelector(state => state.language)
   const { DARK } = useSelector(state => state.dark)
   const [selected, setSelected] = useState('concert')


   return(
       <View style = {[styles.mainContainer, {backgroundColor : DARK? Colors.base : Colors.white}]}>
        <StatusBar/>


        <View style = {styles.header}>
            <TouchableOpacity style = {styles.arrow} onPress = {() => props.navigation.goBack()}>
            <Image source = {Images.arrow}/>
            </TouchableOpacity>
            <TouchableOpacity
             style = {styles.user}
                onPress = {() => {
                    props.navigation.navigate('setting')
                }}>
                <Image source = {Images.background} 
                style = {[styles.user, {top: 0}]} 
                />
             </TouchableOpacity>
        </View>

        <View  style = {styles.eventImageContainer}>
           <ImageBackground source = {Images.clip2} style = {styles.eventImage}>
            <LinearGradient 
            colors = {DARK ? 
                ['#19202B00','#19202B'] 
                : 
                ['#ffffff00','#ffffff']
            } 
            style = {styles.eventTitleContainer}>
                <View style = {styles.statusContainer}>
                   <Image source = {Images.dot} style = {styles.dot}/>
                   <Text style = {[styles.live, {color : DARK ? Colors.white : Colors.base}]}>{lang?.live}</Text>
                </View>
                <Text style = {[styles.eventTitle, {color : DARK ? Colors.white : Colors.base}]}>Rock concert of the HURTS band</Text>  
            </LinearGradient> 
            
           </ImageBackground> 
        </View>

        <View style = {styles.eventInfoContainer}>
          <ScrollView style = {{ flex : 1 }}>  
            <Text style = {[styles.info, { color : DARK ? Colors.white : Colors.base}]}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
            </ScrollView>
        </View>

        <View style = {styles.videoInfoContainer}>
           <Text style = {[styles.formatTitle, {color : DARK? '#ffffff27' : '#19202B70'}]}>{lang?.video_formats}</Text> 
           <View style = {styles.formatContainer}>
            <Image source = {DARK ? Images.degree_w : Images.degree_g}/>
            <Image source = {DARK ? Images.vr_w : Images.vr_g}/>   
            <Image source = {DARK ? Images.video_w : Images.video_g}/>
           </View>

           <TouchableOpacity
           onPress = {() => {props.navigation.navigate('broadcast')}}
           style = {styles.watchButton}
           >
           <Text style = {[styles.watchButtonText, {paddingHorizontal:selectedLangVal == 'fr'? wps(26) : null}]}>{lang?.watch_now}</Text>    
           </TouchableOpacity>
        </View>

         




        <View style = {styles.bottomTapContainer}>
             <View style = {[styles.videoButtonContainer, {backgroundColor : DARK? Colors.base : Colors.white}]}>
               <TouchableOpacity 
               //onPress = {() => setDark(!DARK)}
               style = {styles.videoButton}>
               <Image source = {Images.video} style = {styles.video}/>   
               </TouchableOpacity>
             </View>
             <View style = {[styles.bottomTap , { backgroundColor : DARK ? '#293140' : '#F3F3F3'}]}>
                <TouchableOpacity 
                 onPress = {() => {props.navigation.navigate('home')}}
                 style = {styles.homeButton}> 
                 <Image source = {DARK? Images.home : Images.homelight}/>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress = {() => {props.navigation.navigate('setting')}}
                style = {styles.settingButton}>
                <Image source = {DARK? Images.setting : Images.settinglight}/>
                </TouchableOpacity>
             </View> 
          </View>
       </View>
)}

export default Event
