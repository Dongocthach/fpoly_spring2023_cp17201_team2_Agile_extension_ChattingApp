import { async } from '@firebase/util';
import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, SafeAreaView,TextInput, FlatList, ActivityIndicator,View} from 'react-native';
import NewsModel from '../components/NewsModel';
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  onSnapshot
} from 'firebase/firestore';
import {  database } from '../config/firebase';

export default function Newscontrol() {
  const [title,setTitle] = useState("");
  const [newsList,setNewsList]= useState([]);

  const addNews = async() =>{
    try {
      const docRef = await  addDoc(collection(database, "News"), {
        title: "ada",
        content: "false",
        author: "thach"
      });
      console.log("Document written with ID: ", docRef.id);

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

   // get entire list
   const getNewsList = async() => {
    console.log(newsList.length);
    const querySnapshot = await getDocs(collection(database, "News"));
    querySnapshot.forEach((doc) =>{
      console.log('querySnapshot unsusbscribe');
      setNewsList(
        querySnapshot.docs.map(doc => ({
          _id: doc.data()._id,
          title : doc.data().title,
          content : doc.data().content,
          author : doc.data().author

        }))
      );
      console.log(doc.id, doc.data());

      console.log(newsList.length);}
      
      )}

  useEffect(()=>{
    getNewsList();
  },[]);
  return (
    <SafeAreaView style={styles.container}>
      <View>
      </View>
      {
        newsList.length > 0 ?
      <FlatList
      data={newsList}
      renderItem={({item}) => <NewsModel
        title={item.title}
        content={item.content}
        author={item.author}

      />}
      keyExtractor={(item) => item.id}
      /> :
      <ActivityIndicator/>
      }
     
      <TextInput
       placeholder="enter "
       onSubmitEditing={addNews}
       />
    </SafeAreaView>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer:{
    flex: 1
  },
  emptyContainer:{
    alignItems: "center",
    justifyContent: "center",
    marginTop: 200,
    opacity: 0.5
  },
  buttonContainer:{

  },
  input:{
    backgroundColor: "#fff",
    padding: 10,
    fontSize: 15,
    width: "100%",
    alignSelf: "center",
    marginTop: 20
  },
  button:{
    backgroundColor: "#D8E9A8",
    padding: 10,
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  buttonText:{
    fontSize: 17,
    color: "#000",
    
  }
  });
