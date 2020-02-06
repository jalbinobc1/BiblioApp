import firebase from "nativescript-plugin-firebase";
import store from "../store";



export default {
  
    getReservations(userId) {
      
      const reservationCollection = firebase.firestore.collection("reservation");
      const query = reservationCollection
      .where("idUser", "==", userId);
      console.log("reservation")

      console.log(userId)

      query.get().then(docdata => {
        let item=[];
        let cR={};
        console.log("reservation")

        docdata.forEach(doc => {
          console.log("docs")


          console.log(doc.data)
          if (doc.data().state === "pendiente" || doc.data().state === "prestado") {
            
            cR.idBook = doc.data().idBook,
            cR.nameOfBook = doc.data().nameOfBook,
            cR.startDate = doc.data().startDate,
            cR.endDate = doc.data().endDate,
            cR.idUser = doc.data().idUser,
            cR.cover = doc.data().coverOfBook,
            cR.state = doc.data().state,
            cR.id= doc.data().id
           
            console.log("Reservas");
            store.commit("setCurrentReservation", cR);

          }else{
            item.push({
              idBook : doc.data().idBook,
              nameOfBook : doc.data().nameOfBook,
              startDate : doc.data().startDate,
              endDate : doc.data().endDate,
              idUser : doc.data().idUser,
              cover: doc.data().coverOfBook,
              state: doc.data().state,
              id: doc.data().id,
          }); 
          }          
        });

        if(item.length > 0){
          store.commit("setReservationsList", item);
          console.log(item)
        }
        console.log(cR);

        
      }).catch(err => console.log(err));
    
    },  

    newReservation(){

        console.log("Disponible procede con la reservación");
        let item = {};

        try {
          item ={idBook : store.getters.getCurrentBook.id,
            nameOfBook : store.getters.getCurrentBook.name,
            startDate : firebase.firestore.FieldValue.serverTimestamp(),
            endDate : firebase.firestore.FieldValue.serverTimestamp(),
            idUser : store.getters.profile.id,
            coverOfBook : store.getters.getCurrentBook.cover,
            state : "pendiente"};
            store.commit("setCurrentReservation", item)
        } catch (error) {
          console.log(error)
        }
               
        console.log(item);

        const citiesCollection = firebase.firestore.collection("reservation");

        citiesCollection.add({
          idBook : store.getters.getCurrentReservation.idBook,
          nameOfBook : store.getters.getCurrentReservation.nameOfBook,
          startDate : store.getters.getCurrentReservation.startDate,
          endDate : store.getters.getCurrentReservation.endDate,
          idUser : store.getters.getCurrentReservation.idUser,
          coverOfBook: store.getters.getCurrentReservation.coverOfBook,
          state: store.getters.getCurrentReservation.state
        }).then(function(docRef){

          try {
            console.log("Document written with ID: ", docRef.id);
            store.getters.getCurrentReservation.id = docRef.id;
            const docRes = firebase.firestore.collection("reservation").doc(docRef.id);
            const docBook = firebase.firestore.collection("books").doc(store.getters.getCurrentBook.id);

            firebase.firestore.batch()
            .update(docRes, { id : docRef.id})
            .update(docBook, { available: store.getters.getCurrentBook.available-1, })
            .commit()
            .then(() => { 
              console.log("Reservado con exito")
              store.getters.getCurrentBook.available = store.getters.getCurrentBook.available-1
              console.log("Actualizado con exito");
              alert({
                title: "Reservado con éxito",
                okButtonText: "OK",
                message: "Puede pasar a biblioteca por su ejemplar"
              });
            })
            .catch(error => console.log("Batch error: " + error));

          } catch (error) {
            console.log(error)
          }

        }); 


    },
    removeReservation(){

      const reservationDoc = firebase.firestore.collection("reservation").doc(store.getters.getCurrentReservation.id);
      
      reservationDoc.delete().then(() => {
        store.commit("setCurrentReservation", null);

        alert({
          title: "Cancelado con éxito",
          okButtonText: "OK",
          message: "Se ha cancelado la reservación con éxito"
        });
        console.log("reservation was erased from the face of the earth!");
      });
    }
      
  };