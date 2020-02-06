import firebase from "nativescript-plugin-firebase";
import store from "../store";



export default {
  
    getList(book) {
      
      const commentsCollection = firebase.firestore.collection("comments");
      const query = commentsCollection
      .where("idBook", "==", book);
  
      query.get().then(docdata => {
        let item=[];
        docdata.forEach(doc => {
          item.push({
            idBook : doc.data().idBook,
            nameBook : doc.data().nameBook,
            comment : doc.data().comment,
            userId : doc.data().userId,
            userName : doc.data().userName,
            imgUser : doc.data().imgUser,
            date : doc.data().date,}); 
            
            console.log(doc.data());
        });
        if(item.length !=0){
          store.commit("setCommentList", item);
        }
        
      }).catch(err => console.log(err));
    
    },  
      
  };