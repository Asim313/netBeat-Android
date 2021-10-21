import React,{Component, useEffect, useState} from 'react';
import { View , Image, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, ImageBackground} from 'react-native';
import {SafeAreaView} from 'react-native';
import { wp,hp,Size, hps, wps, Images, Colors} from '../../assets/index';
import styles from './styles';
import { useDispatch } from 'react-redux';
import { selectLanguage } from './../../redux/actions/language';
import { languages } from './../../redux/languages';


const Splash = (props) => {

    const dispatch = useDispatch(); 

   useEffect(()=>{
    dispatch(selectLanguage({
        lang: languages.english,
        selectedLangVal: 'en'
    }))
   },[])

   return(
       <SafeAreaView style = {styles.mainContainer}>
          <ImageBackground
          style = {styles.bg}
          source = {Images.bg}
          >
          <View style = {styles.logoContainer}>
           <Image source = {Images.logol} style = {styles.logo}/>  
           <View style = {styles.logoTitleContainer}>
                <View style = {{ flexDirection : 'row' , alignItems : 'flex-end'}}>
                    <Text style = {styles.netbeat}>netbeat</Text>
                    <Text style = {styles.live}>.live</Text>
                </View>
           </View> 
          </View>
          <TouchableOpacity 
          onPress = {() => {props.navigation.navigate('login')}}
          style = {styles.clapContainer}>
           <Image source = {Images.clap} style = {styles.clap}/>   
          </TouchableOpacity>

          <View style = {styles.bottomTxtContainer}>
              <Text style = {styles.bottomTxt}>Your support is very important to artists. So please</Text>
              <Text style = {styles.bottomTxt}>remember to applaud them during the concert.</Text>
          </View>
          </ImageBackground>
       </SafeAreaView>
   ) 
}

export default Splash
