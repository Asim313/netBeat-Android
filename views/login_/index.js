import React,{Component, useState} from 'react';
import { View , Image, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native';
import { wp,hp,Size, hps, wps, Images, Colors} from '../../assets/index';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';



const Login = (props) => {

    const { lang, selectedLangVal } = useSelector(state => state.language);
    const { DARK } = useSelector(state => state.dark);

    //console.log(lang?.hello)


   return(
       <SafeAreaView style = {styles.mainContainer}>
          <ScrollView style = {styles.scroll}>
           <View style = {styles.logoContainer}>
               <Image source = {Images.logo} style = {styles.logo}/>
               <View style = {styles.logoTitleContainer}>
                   <View style = {{ flexDirection : 'row' , alignItems : 'flex-end'}}>
                    <Text style = {styles.netbeat}>netbeat</Text>
                    <Text style = {styles.live}>.live</Text>
                   </View>
                   {/* <Text style = {styles.netbeat}>netbeat<Text style = {styles.live}>.live</Text></Text> */}
               </View>
           </View>
           <View style = {styles.titleContainer}>
               <Text style = {styles.title}>{lang?.register_title1}</Text>
               <Text style = {styles.title}>{lang?.register_title2}</Text>
           </View>
           <TextInput
           style = {styles.input}
           placeholder = {lang?.your_email}
           placeholderTextColor = {'#ffffff73'}
           />
           <TextInput
           style = {styles.input}
           placeholder = {lang?.your_password}
           placeholderTextColor = {'#ffffff73'}
           />
           <TextInput
           style = {styles.input}
           placeholder = {lang?.confirm_password}
           placeholderTextColor = {'#ffffff73'}
           />
           <TouchableOpacity
           onPress = {() => {
               global.dark = false
               props.navigation.navigate('home')
            }}
           style = {styles.button}
           >
           <Text style = {styles.buttonText}>{lang?.register_now}</Text>    
           </TouchableOpacity>
           <Text style = {styles.bottomText}>{lang?.without_reg}</Text>
           </ScrollView>
       </SafeAreaView>
   ) 
}

export default Login
