<template>
	<page actionBarHidden="true" backgroundSpanUnderStatusBar="true" @loaded="onLoaded" >

		<GridLayout rows="auto,auto,*,auto" columns="auto">

			<GridLayout row="0" ref="navStatusBar" class="navStatusBar" backgroundColor="#bd2122" verticalAlignment="top" height="40"
			 width="100%" rows="auto" columns="*,auto">
				<Label col="0" row="0" text="Biblioteca" class="status-title" />
				<Image col="1" row="0" horizontalAlignment="right" class="status-img" 
				src="~/assets/images/notification-none.png" @tap="goToReservation"/>
			</GridLayout>

			<GridLayout  row="1" ref="navTab" class="navTab" verticalAlignment="top" height="50"
					width="100%"  rows="auto" columns="auto,auto,auto">
				<GridLayout col="0" row="0" class="tabview" :class="selectedTabview==0?'active':''"
						@tap="popular" rows="*,auto" cols="auto" width="33%">
						<Image v-show="selectedTabview==0" row="0" class="navIcon"
								:src="selectedTabview==0?'~/assets/images/popular.png':''"/>
						<Label :class="selectedTabview==0?'active':''" row="1"
								text="SUGERENCIAS" class="tabviewText"></Label>
				</GridLayout>
				<GridLayout class="tabview" :class="selectedTabview==1?'active':''"
						@tap="showCategory" rows="*,auto" cols="auto" col="1" row="0"
						width="34%">
						<Image v-show="selectedTabview == 1" row="0" class="navIcon"
								:src="selectedTabview==1?'~/assets/images/category.png':''"/>
						<Label :class="selectedTabview==1?'active':''" row="1"
								text="EXPLORAR" class="tabviewText"></Label>							
				</GridLayout>
				<GridLayout class="tabview" :class="selectedTabview==2?'active':''"
						@tap="showPromos" rows="*,auto" cols="auto" col="2" row="0"
						width="33%">
						<Image v-show="selectedTabview == 2" row="0" class="navIcon"
								:src="selectedTabview==2?'~/assets/images/category.png':''"/>
						<Label :class="selectedTabview==2?'active':''" row="1"
								text="FAVORITOS" class="tabviewText"></Label>							
				</GridLayout>
			</GridLayout>

			<GridLayout v-show="selectedTabview == 0" row="2" width="100%" backgroundColor="white">
				<ListView ref="listview" separatorColor="transparent" for="item in $store.getters.getBooksSuggest" :key="index">
					<v-template>
						<item :item="item" @clicked="showItem(item)" />
					</v-template>
				</ListView>
			</GridLayout>

			<GridLayout v-show="selectedTabview == 1" row="2" width="100%" backgroundColor="white">		
				<StackLayout class="container" verticalAlignment="top">
					
					<ScrollView class="anim-images" orientation="horizontal">
						<StackLayout orientation="horizontal" class="">
							<GridLayout v-for="image in $store.getters.category" rows="auto"
						columns="*" v-bind="image.name">
						<Image class="card-img-thumb" row="0" col="0" :src="image.imgCategory"
							stretch="aspectFill" @tap="getBooksByCat(image.name)" />
							</GridLayout>
						</StackLayout>
					</ScrollView>

					<StackLayout marginTop="10">
						<RadListView for="item in itemForCat" 
									layout="staggered"
									:gridSpanCount="3" backgroundColor="white">
							<v-template>
								<itemCat :item="item" @clicked="showItem(item)" />
							</v-template>
						</RadListView>
					</StackLayout>

				</StackLayout>
			
			</GridLayout>

			<GridLayout v-show="selectedTabview == 2" row="2" width="100%">	
				<ListView ref="listview" separatorColor="transparent" for="item in $store.getters.getFavoriteBooks" :key="index">
					<v-template>
						<Item :item="item" > </Item>
					</v-template>
				</ListView>	
			</GridLayout>

			<navBottom row="3" />

		</GridLayout>
</page>
</template>
<script>
	// import { SwissArmyKnife } from "nativescript-swiss-army-knife";
	import { isIOS, isAndroid } from 'tns-core-modules/platform'
	import navBottom from "./custom/navBottom";
	import Item from "./custom/item";
	import Category from "./custom/category";
	import ItemDetails from "./ItemDetails";
	import ItemDetailsVue from './ItemDetails.vue';
	import firebase from "nativescript-plugin-firebase";
	import ItemCat from "./custom/itemCat";
	
    
	const gestures = require("ui/gestures"); 
	const app = require("application");

export default {
	components: {
		navBottom,
		Item,
		Category,
		ItemCat,
	},
	computed: {
		//...mapState(["books"])

	},
	created(){

		let auxbook = this.$store.getters.books;
		if (auxbook.length==0) {
			this.$store.dispatch("setItems");
		}
		
		this.$store.dispatch("fetchCategory");
		this.$store.dispatch("fetchReservations");
		this.itemForCat = this.$store.getters.books; 
		
	},
	watch:{
		category: function (){
			this.itemForCat = this.$store.getters.getBooksByCat(this.category);	
			console.log(this.category);
			console.log(this.itemForCat)	
			}
	},
	mounted () {

		this.$store.dispatch("fetchBooksSuggest")
	},
	data() {
		return {
			lastDelY: 0,
			headerCollapsed: false,
			selectedTab: 0,
			selectedTabview: 0,
			itemForCat: [],
			category: "all",

		};
	},
	methods: {
		onLoaded(){
		this.itemForCat = this.$store.getters.books; 

		},
		goToReservation(){
			console.log("error")
			if (this.$store.getters.getCurrentReservation) {
				console.log(this.$store.getters.getItemReserved);
				this.showItem(this.$store.getters.getItemReserved);
			}
		
		},
		search(){
			console.log('search')
		},
		bell(){
			console.log('bell')
		},
		showItem(payload) {
			this.$store.commit('setCurrentBook',payload);
			this.$store.dispatch("fetchReservations");

			this.$navigateTo(ItemDetails,{
				props: {
					item: payload
				},
				animated: true,
				transition: {
					name: "slideTop",
					duration: 380,
					curve: "easeIn"
				}
			})
		},
		popular() {
			this.selectedTabview = 0;
			this.itemForCat = this.$store.getters.books; 
		},
		showCategory() {
			this.selectedTabview = 1;
		},
		showPromos() {
			this.selectedTabview = 2;
			this.itemForCat = this.$store.getters.books; 
		},
		home() {
			this.selectedTab = 0;
			//this.$navigateTo(Search);
		},
		cart() {
			this.selectedTab = 1;
			console.log("search");
		},
		history() {
			this.selectedTab = 2;
		},
		about() {
			this.selectedTab = 3;
		},
		getBooksByCat(id){
			this.category = id;
			console.log(id)

		},
		 alert(message) {
      		return alert({
        	title: "APP NAME",
        	okButtonText: "OK",
        	message: message
      		});
    	}


	}
};
</script>

<style>
.tabview.active {
	border-bottom-color: white;
	border-bottom-width: 3;
	margin: 0;
	height: 50;
}
.tabviewText {
	margin-top: 15;
	margin-bottom: 5;
	font-size: 13;
	color: #d8d2d2;
	horizontal-align: center;
}
.tabviewText.active {
	margin-top: 0;
	margin-bottom: 5;
	font-weight: bold;
	color: white;
	vertical-align: center;
}
.navTab {
	background-color: #bd2122;
}
.navTabview {
	background-color: blue;
}
.status-img {
	margin-top: 4;
	margin-right: 20;
	width: 30;
	height: 30;
}
.status-profile {
	border-width: 1;
	border-color: #ffffff;
	background-color: #f1ebeb;
	border-radius: 50%;
	margin-top: 4;
	margin-right: 15;
	width: 30;
	height: 30;
}
.status-title {
	color: white;
	font-size: 18;
	margin-left: 15;
	margin-top: 8;
	horizontal-align: left;
	vertical-align: center;
}

.card-img-thumb {
	background-color: #828282;
	vertical-align: center;
	border-radius: 5;
	width: 130;
	height: 70;
	margin-left: 5;
}

</style>