// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

// Listen for changes in all documents in the 'reservation' collection
exports.newReservation = functions.firestore
    .document('reservation/{commentId}')
    .onCreate((snap, context) => {
        // Get an object representing the document
        
        const newValue = snap.data();

        // access a particular field as you would any JS property
        const startDate = newValue.startDate.toMillis();

        //snap.data().startDate = startDate;

         // Then return a promise of a set operation to update the count
        return snap.ref.set({
            startDate : startDate
        }, {merge: true});

        

    });

    // Listen for changes in all documents in the 'comments' collection
exports.newComments = functions.firestore
.document('comments/{commentId}')
.onCreate((snap, context) => {
    // Get an object representing the document
    const newValue = snap.data();

    // access a particular field as you would any JS property
    const id = newValue.idBook;

    //snap.data().startDate = startDate;

    const docRef = db.doc('books/'+id);
    return docRef.get().then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
          return null;
        } else {
          console.log('Document data:', doc.data());
          let newTotalComments = doc.data().totalcomments + 1;
          // Then return a promise of a set operation to update the count
          const updateComments = db.doc('books/'+id).update({totalcomments :newTotalComments });
          return updateComments;
        }
      }).then(res => {
            console.log('Error: ' + res);
            return null;
        });



});

