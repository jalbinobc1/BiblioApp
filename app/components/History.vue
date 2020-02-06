<template>
    <Page actionBarHidden="true" class="anim-page" backgroundSpanUnderStatusBar="true">
    <GridLayout rows="auto,auto,*" columns="*" width="100%">
      <!--ActionBar --> 
      <GridLayout row="0" rows="*" columns="auto,*">
        <Label row="0" col="0" verticalAlignment="top" horizontalAlignment="left" @tap="close" 
          :text="'fa-arrow-left' | fonticon" class="fa close" fontSize="24" />
        <Label row="0" col="1" marginTop="10" marginLeft="5" class="header" text="Historial" fontSize="24" />
      </GridLayout>
      <!--End ActionBar-->

      <!--Body-->
      <!--Current Reservation>
      <GridLayout v-show="$store.getters.getCurrentReservation != null" row="1" width="100%" columns="auto,auto" rows="auto" class="container" >

        <Image  row="0" col="0" height="60" width="40%" stretch="aspectFill" class="card-img" 
        :src="[$store.getters.getCurrentReservation ? $store.getters.getCurrentReservation.cover: '~/assets/images/NativeScript-Vue.png']" />
        <GridLayout columns="auto" rows="auto,auto" row="0" col="1" height="60" width="60%">
            <Label col="0" row="0" class="layout" 
            :text="[$store.getters.getCurrentReservation ? $store.getters.getCurrentReservation.nameOfBook : 'N/A']"/>
        </GridLayout>

      </GridLayout>

      <GridLayout v-show="$store.getters.getCurrentReservation == null" row="1" width="100%" columns="auto,auto" rows="auto" class="">
        <Label col="0" row="0" class="layout" text="Sin reservaciones pendientes"></Label>
      </GridLayout>
      <End Current Reservation-->
      <!--History list-->
      <StackLayout row="2">
          <ListView ref="listview" separatorColor="transparent" for="item in this.$store.getters.getReservations"  :key="index">
              <v-template>
                  <itemHistory :item="item" ></itemHistory>
              </v-template>
              </ListView>	
      </StackLayout>                          
      <!--End history list-->

      <!--End Body-->
    </GridLayout>

  </Page>
</template>

<script>
import firebase from "nativescript-plugin-firebase";
import itemHistory from "./custom/itemHistory";
const LoadingIndicator = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
const Mode = require('@nstudio/nativescript-loading-indicator').Mode;
const loader = new LoadingIndicator();

export default {
  components: {
    itemHistory,
  },
  computed: {
    categoryIcon() {}
  },
  created() {
    this.reservations = Object.assign({}, this.$store.getters.getReservations);

  },
  mounted() {},
  methods: {
    close() {
      this.$navigateBack();
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
      reservations:{},
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