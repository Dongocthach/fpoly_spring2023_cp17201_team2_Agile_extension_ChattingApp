import React, { useState,useEffect,useLayoutEffect} from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet ,  FlatList,  SafeAreaView,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import colors from '../colors';
import { Entypo } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { AntDesign } from '@expo/vector-icons';
import { auth, database } from '../config/firebase';
import {
    collection,
    addDoc,
    orderBy,
    query,
    where,
    doc,
    onSnapshot
  } from 'firebase/firestore'
const catImageUrl = "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";

const DATA = [
    {
        id: 'Home',
        title: 'Home',
    },
    {
        id: 'Checkibm',
        title: 'Check IBM',
    },
    {
        id: 'Yourday',
        title: 'Your day',
    },
    {
        id: 'Nutrition',
        title: 'Food Advise',
    },
    {
        id: 'Chat',
        title: 'Go To chatbox',
    },
    {
        id: 'Profile',
        title: 'Go To profile',
    },
    {
        id: 'Newscontrol',
        title: 'Adm Screen',
    }
  ];
  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
      <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
    </TouchableOpacity>
  );
  
const Home = () => {
    useLayoutEffect(() => {
        const collectionRef = collection(database, 'users');
        const q = query(collectionRef,where("uid", "==", auth.currentUser.uid));
        const unsubscribe = onSnapshot(q, querySnapshot => {
            querySnapshot.forEach((doc) => {
                // if(doc.data().role ==0 && DATA.length >=6){
                //   DATA.splice(6, 1);
                //     console.log(DATA.length)         
                // }
              });
            });
      }, []);
    const navigation = useNavigation();

    const onSignOut = () => {
        signOut(auth).catch(error => console.log('Error logging out: ', error));
      };

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <FontAwesome name="search" size={24} color={colors.gray} style={{marginLeft: 15}}/>
            ),
            headerRight: () => (
                <TouchableOpacity
                style={{marginRight: 10}}
                onPress={onSignOut}
              >
               <AntDesign name="logout" size={24} color={colors.gray} style={{marginRight: 10}}/> 
              </TouchableOpacity>
                
            ),
        });
    }, [navigation]);

    useEffect(() => {
       
    }, [navigation]);
    const [selectedId, setSelectedId] = useState();

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() =>  navigation.navigate(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
        );
    };
    return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
          />
        </SafeAreaView>
      );
    };


    export default Home;

    const styles = StyleSheet.create({
        button:{
            padding: 16,
        },
        item: {
            padding: 20,
            marginVertical: 8,
            marginHorizontal: 16,
            justifyContent: 'center',
            alignItems: 'center'

          },
          title: {
            fontSize: 32,
          },
        container:{
            flex:1,
            backgroundColor: "#fff",
            alignItems: 'center',
            justifyContent: 'center',

        },
        containerchat: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            backgroundColor: "#fff",
        },
        chatButton: {
            backgroundColor: colors.primary,
            height: 50,
            width: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: colors.primary,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: .9,
            shadowRadius: 8,
            marginRight: 20,
            marginBottom: 50,
        }
    });