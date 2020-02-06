<template>
  <Page actionBarHidden="true" class="anim-page" backgroundSpanUnderStatusBar="true">
    <GridLayout rows="auto,*,auto" columns="*" width="100%">
      <!--ActionBar --> 
      <GridLayout row="0" rows="*" columns="auto,auto,auto">
        <Label row="0" col="0" verticalAlignment="top" horizontalAlignment="left" @tap="close" 
          :text="'fa-arrow-left' | fonticon" class="fa close" fontSize="24" />
        <Label row="0" col="1" marginTop="10" marginLeft="5" class="header" text="Comentarios" fontSize="24" />
        <Label col="2" verticalAlignment="top" horizontalAlignment="right" :text="'fa-comments' | fonticon" class="fa close" />
      </GridLayout>
      <!--End ActionBar-->

      <!--Body-->
      <!--Comment list-->
      <StackLayout row="1">
          <ListView ref="listview" separatorColor="transparent" for="item in this.$store.getters.getComments"  :key="index">
              <v-template>
                  <Item :item="item" ></Item>
              </v-template>
              </ListView>	
      </StackLayout>                          
      <!--End Comment list-->

      <GridLayout row="2" rows="*" columns="*,auto" height="50" class="page">
        <TextView row="0" col="0" hint="Escribe un comentario..." v-model="comment" maxLength="500"/>
        <Button row="0" col="1" width="50" :text="'fa-paper-plane' | fonticon"  class="fa btn-primary m-t-20" @tap="saveComment" />
      </GridLayout>
      <!--End Body-->
    </GridLayout>

  </Page>
</template>

<script>
import firebase from "nativescript-plugin-firebase";
import Item from "./custom/itemComment";
const LoadingIndicator = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
const Mode = require('@nstudio/nativescript-loading-indicator').Mode;
const loader = new LoadingIndicator();

export default {
  components: {
    Item,
  },
  computed: {
    categoryIcon() {}
  },
  created() {
    this.currentBook = Object.assign({}, this.$store.getters.getCurrentBook);
    this.origprofile = Object.assign({}, this.$store.state.profile);
    this.comments = Object.assign({}, this.$store.getters.getComments);
    console.log(this.currentBook.comments)

  },
  mounted() {},
  methods: {
    close() {
      this.$navigateBack();
    },
    saveComment() {
      if(!this.comment){
        console.log(firebase.firestore.FieldValue.serverTimestamp());
        return;
      }
      loader.show();
      //New comment to current book
      this.newComment.idBook = this.currentBook.id;
      this.newComment.nameBook = this.currentBook.name;
      this.newComment.comment = this.comment;
      this.newComment.userId = this.origprofile.id;
      this.newComment.userName = this.origprofile.name;
      this.newComment.date = firebase.firestore.FieldValue.serverTimestamp();
  
      //Connection to Firestore
      const commDoc = firebase.firestore.collection("comments");
      //Write new document
      commDoc
        .add(this.newComment, { merge: true })
        .then(
          res => {
            console.log("Log"+res)
            loader.hide();
            this.comment ="";
            this.$store.dispatch("fetchComments");
            return res;
          },
          err => {
            console.error(err);
            loader.hide();
            alert("No es posible guardar el comentario, intenta mas tarde");
          }
        )
        .catch(function(error) {
          alert("No es posible guardar el comentario, intenta mas tarde");
          loader.hide();
          console.error("Error writing firestore document: ", error);
        });
    },
    alert(message) {
      return alert({
      title: "Error de conexión",
      okButtonText: "OK",
      message: message
      });
    }
  },
  data() {
    return {
      newComment: {},
      currentBook:{},
      comment: "",
      origprofile: {},
      comments:{},
    };
  }
};
</script>
<style scoped>
.close {
  font-size: 20;
  color: rgb(226, 229, 229);
  margin: 15 0 0 15;
}
.page {
  align-items: center;
  flex-direction: column;
}
.form {
  margin-left: 15;
  margin-right: 15;
  flex-grow: 2;
  vertical-align: middle;
}
.btn-primary {
  height: 50;
  margin: 30 5 15 5;
  background-color: #d51a1a;
  border-radius: 5;
  font-size: 20;
  font-weight: 600;
}

.item-category {
  font-size: 14;
  color: #828282;
}

.rating-icon {
  padding-top: 3;
  color: #ffe900;
  font-size: 14;
  margin-left: 10;
}

.rating-value {
  margin-left: 5;
}

.liked-active {
  color: #4080ff;
}

.heart-active {
  color: #b51213;
}

.default {
  color: #828282;
}

.layout {
  vertical-align: bottom;
  color: #828282;
  font-size: 14;
  height: 30;
  padding: 5 0 5 0;
}

.like-icon {
  vertical-align: bottom;
  height: 30;
  font-size: 16;
  margin-right: 2;
  padding: 5 5 5 5;
}

.item-name {
  font-size: 14;
  font-weight: bold;
}

.item-category {
  font-size: 14;
  color: #828282;
}

.category-icon {
  text-align: center;
  padding-top: 5;
  border-color: white;
  color: white;
  vertical-align: center;
  font-size: 25;
  border-width: 1;
  border-radius: 50%;
  margin-top: 4;
  margin-right: 15;
  width: 40;
  height: 40;
}

.content {
  margin-left: 16;
  margin-right: 16;
  margin-bottom: 3;
  margin-top: 16;
}

.card-img {
  width: 100%;
  height: 150;
  margin-bottom: 10;
}

.line {
  height: 0.5;
  border: none;
  color: #e0e0e0;
  background-color: #e0e0e0;
}

.lineBreak {
  height: 7;
  border: none;
  color: #e0e0e0;
  background-color: #e0e0e0;
}
</style>