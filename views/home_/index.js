import React,{Component, useState, useEffect} from 'react';
import { useIsFocused } from '@react-navigation/core';
import { View , Image, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, ImageBackground, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { wp,hp,Size, hps, wps, Images, Colors} from '../../assets/index';
import styles from './styles';
import { useSelector } from 'react-redux';

const Home = (props) => {

   const { lang } = useSelector(state => state.language)
   const { DARK } = useSelector(state => state.dark)
   const [selected, setSelected] = useState('concert')



   return(
       <SafeAreaView style = {[styles.mainContainer, {backgroundColor : DARK? Colors.base : Colors.white}]}>
         <StatusBar barStyle = { DARK? 'light-content' : 'dark-content'}/>
         <View style = {styles.header}>
          <Image source = {DARK? Images.notiWd : Images.notiGd} style = {styles.noti}/>
          <Image source = {Images.logoh} style = {styles.logo}/>
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

         <View style = {[styles.searchBar, {backgroundColor : DARK? '#293140' : '#F7F7F7'}]}>
            <TextInput
            style = {[styles.input, {color : DARK ? '#ffffff27' : '#19202B54'}]}
            placeholder = {lang?.search}
            placeholderTextColor = {DARK ? '#ffffff27' : '#19202B54'}
            />
            <Image source = {DARK? Images.searchW : Images.search} style = {styles.search}/>
         </View>



         <View style = {styles.optionsBar}>
            <ScrollView 
            horizontal
            showsHorizontalScrollIndicator = {false}
            style = {{flex:1}}
            >
            <TouchableOpacity
            style = {[styles.option, {backgroundColor : selected ==  'concert' ? Colors.base1 : DARK? '#293140' : '#F7F7F7'}]}
            >
            <Text style = {[styles.optionText, {color : selected ==  'concert' ? Colors.white : DARK? '#ffffff27' : '#19202B'}]}>{lang?.concerts}</Text>
            </TouchableOpacity> 
            <TouchableOpacity
            style = {[styles.option, {backgroundColor : selected ==  'festival' ? Colors.base1 : DARK? '#293140' : '#F7F7F7'}]}
            >
            <Text style = {[styles.optionText, {color : selected ==  'festival' ? Colors.white : DARK? '#ffffff27' : '#19202B'}]}>{lang?.festivals}</Text>
            </TouchableOpacity> 
            <TouchableOpacity
            style = {[styles.option, {backgroundColor : selected ==  'theater' ? Colors.base1 : DARK? '#293140' : '#F7F7F7'}]}
            >
            <Text style = {[styles.optionText, {color : selected ==  'theater' ? Colors.white : DARK? '#ffffff27' : '#19202B'}]}>{lang?.theater}</Text>
            </TouchableOpacity> 
            <TouchableOpacity
            style = {[styles.option, {backgroundColor : selected ==  'children' ? Colors.base1 : DARK? '#293140' : '#F7F7F7'}]}
            >
            <Text style = {[styles.optionText, {color : selected ==  'children' ? Colors.white : DARK? '#ffffff27' : '#19202B'}]}>{lang?.for_children}</Text>
            </TouchableOpacity>   
            </ScrollView>
          </View>


          <Text style = {[styles.title, {color : DARK? Colors.white : '#19202B'}]}>{lang?.concerts}</Text>

          <View style = {styles.eventsContainer}>
           <ScrollView 
           horizontal
           showsHorizontalScrollIndicator = {false}
           style = {{ flex : 1 }}
           >

           <TouchableOpacity 
           onPress = {() => props.navigation.navigate('event')}
           style = {styles.event}>
              <ImageBackground source = {Images.clip2} style = {styles.eventImage}>
                <View style = {styles.statusContainer}>
                   <Image source = {Images.dot} style = {styles.dot}/>
                   <Text style = {styles.live}>{lang?.live}</Text>
                </View>
                <View style = {styles.titleContainer}>
                 <Text style = {styles.statusTitle}>{lang?.now_on_air}</Text>
                 <Text style = {styles.eventTitle}>Rock concert of the HURTS band</Text>
                </View>
              </ImageBackground>
           </TouchableOpacity>

           <TouchableOpacity 
           onPress = {() => props.navigation.navigate('event')}
           style = {styles.event}>
              <ImageBackground source = {Images.clip} style = {styles.eventImage}>
                <View style = {styles.statusContainer}>
                   <Image source = {Images.dot} style = {styles.dot}/>
                   <Text style = {styles.live}>{lang?.live}</Text>
                </View>
                <View style = {styles.titleContainer}>
                 <Text style = {styles.statusTitle}>{lang?.now_on_air}</Text>
                 <Text style = {styles.eventTitle}>Rock concert of the HURTS band</Text>
                </View>
              </ImageBackground>
           </TouchableOpacity>

           
           </ScrollView>  
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
       </SafeAreaView>
   ) 
}

export default Home
