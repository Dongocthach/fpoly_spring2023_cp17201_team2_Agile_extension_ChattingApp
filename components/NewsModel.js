import { Platform, Pressable, StyleSheet, Text, ToastAndroid, View, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
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
  const deleteShoppingItem = () => {
    /// cần lấy ra id chổ này để reset
    console.log("1234567890");
  }
export default function NewsModel({
  _id,
  content,
  author,
  title
}) 

{
return(
  <View style={styles.singleItem}>
    <View style={styles.row}>
      <View style={styles.tweetContent}>
        <Text style={styles.description}>{title}</Text>
        <Text style={styles.description}>{content}</Text>
        <Text style={styles.description}>{author}</Text>
        <Pressable style={styles.delete} >
          <MaterialIcons name="delete" size={24} color="#FF6768" onPress={deleteShoppingItem}/>
        </Pressable>
      </View>
    </View>
  </View>
)
}  



const styles = StyleSheet.create({
    container:{
      flexDirection: "column",
      alignSelf: "center",
      backgroundColor: "#ffffff",
      width: "90%",
      borderRadius: 10,
      padding: 13,
      alignItems: "right",
      marginTop: 15
  },
  title:{
      color: "#fff",
      fontSize: 20,
      flex: 1,
      fontWeight: "500"
  },
  delete:{
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    
  }
})