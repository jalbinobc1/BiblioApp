import firebase from "nativescript-plugin-firebase";
import store from "../store";

export default {
  getList() {

    const booksCollection = firebase.firestore.collection("books");
    const query = booksCollection
    .limit(100);
  
      query.get().then(docdata => {
        let item=[];
        let cont=0;
        docdata.forEach(doc => {
          let favorite = false;
          if (store.getters.profile.favorites) {
            store.getters.profile.favorites.forEach(fav =>{
              if (fav === doc.data().id) {
                favorite = true;
              }
            });
          }
        
          item.push({
            id:doc.data().id,
            name:doc.data().name,
            author:doc.data().author, 
            cover:doc.data().cover,
            images:doc.data().image,
            category: doc.data().category,
            likes:doc.data().likes,isLike: false,
            isFavorite: true,totalcomments: doc.data().totalcomments,
            comments: doc.data().previewcomments,
            rating: doc.data().rating,
            description: doc.data().review,
            sugestion: doc.data().sugestion,
            status: doc.data().suggestion,
            isFavorite: favorite,
            index:cont,
            amount: doc.data().amount,
            available: doc.data().available});
            cont++;
  
            console.log(doc.data());
            
        }
        
        
        );
        if(item.length !=0){
          store.commit("setListBooks", item);
        }
        
      }).catch(err => console.log(err));
    
      this.getListName();

  },
  getListCat(args){

    const booksCollection = firebase.firestore.collection("books");
    const query = booksCollection
    .where("category", "==", args);
  
      query.get().then(docdata => {
        let item=[];
        let cont=0;
        docdata.forEach(doc => {
          let favorite = false;
          if (store.getters.profile.favorites) {
            store.getters.profile.favorites.forEach(fav =>{
              if (fav === doc.data().id) {
                favorite = true;
              }
            });
          }
        
          item.push({
            id:doc.data().id,
            name:doc.data().name,
            author:doc.data().author, 
            cover:doc.data().cover,
            images:doc.data().image,
            category: doc.data().category,
            likes:doc.data().likes,isLike: false,
            isFavorite: true,totalcomments: doc.data().totalcomments,
            comments: doc.data().previewcomments,
            rating: doc.data().rating,
            description: doc.data().review,
            sugestion: doc.data().sugestion,
            status: doc.data().suggestion,
            isFavorite: favorite,
            index:cont,
            amount: doc.data().amount,
            available: doc.data().available});
            cont++;
  
            console.log(doc.data());
            
        }
        
        
        );
        if(item.length !=0){
          store.commit("setSuggestedBoseoks", item);
        }
        
      }).catch(err => console.log(err));
    
  
  },
  getListName(){
    //Opt
    firebase.firestore.collection("references").onSnapshot(docdata => {
      docdata.forEach(doc => {
        let item=[];
        doc.data().url.forEach(book=>{
          item.push({
            id:book.id,
            name:book.name, 
          })
        })

        console.log(`Document data: ${JSON.stringify(item)}`);
        if(item.length !=0){
          store.commit("setListName", item);
        }

      })
    })

  },
  getById(args){
    firebase.firestore.getDocument("books", args).then(docdata=>{
      var item = {};
      if (docdata.exists) {

        let favorite = false;
          if (store.getters.profile.favorites) {
            store.getters.profile.favorites.forEach(fav =>{
              if (fav === docdata.data().id) {
                favorite = true;
              }
            });
          }
        
          item.id=docdata.data().id,
          item.name=docdata.data().name,
          item.author=docdata.data().author, 
          item.cover=docdata.data().cover,
          item.images=docdata.data().image,
          item.category= docdata.data().category,
          item.totalcomments= docdata.data().totalcomments,
          item.comments=docdata.data().previewcomments,
          item.rating= docdata.data().rating,
          item.description= docdata.data().review,
          item.sugestion= docdata.data().sugestion,
          item.status= docdata.data().suggestion,
          item.isFavorite= favorite,
          item.amount= docdata.data().amount,
          item.available= docdata.data().available
          console.log("Doc: " + item) 
          store.commit('setCurrentBook',item);

      } else {
        console.log("Not found") 
      }
    }
    ).catch(error=>(console.log("Error" + error)))
  },
  getSuggestions() {

    console.log("Suggestions!!!!!!!");

    const booksCollection = firebase.firestore.collection("books");
    const query = booksCollection
    .where("suggestion", "==", true)
    .limit(50);
  
      query.get().then(docdata => {
        let item=[];
        let cont=0;
        docdata.forEach(doc => {
          let favorite = false;
          if (store.getters.profile.favorites) {
            store.getters.profile.favorites.forEach(fav =>{
              if (fav === doc.data().id) {
                favorite = true;
              }
            });
          }
        
          item.push({
            id:doc.data().id,
            name:doc.data().name,
            author:doc.data().author, 
            cover:doc.data().cover,
            images:doc.data().image,
            category: doc.data().category,
            likes:doc.data().likes,isLike: false,
            isFavorite: true,totalcomments: doc.data().totalcomments,
            comments: doc.data().previewcomments,
            rating: doc.data().rating,
            description: doc.data().review,
            sugestion: doc.data().sugestion,
            status: doc.data().suggestion,
            isFavorite: favorite,
            index:cont,
            amount: doc.data().amount,
            available: doc.data().available});
            cont++;
  
            console.log(doc.data());
            
        }
        
        
        );
        if(item.length !=0){
          store.commit("setSuggestedBooks", item);
        }
        
      }).catch(err => console.log(err));
    
  

  },
  getCategory() {
    firebase.firestore.getCollection("categories").then(docdata => {
      let item=[];
      docdata.forEach(doc => {
        item.push({
          name : doc.data().nameOfCategory,
          imgCategory : doc.data().imageCategory
        });
       
      });
      if(item.length !=0){
        store.commit("setListCategory", item);
      }
    });
  },
  onUpdate(){
    store.commit("setListBooks", store.getters.books);
  }

    
};