<template>
    <Page actionBarHidden="true" class="anim-page"
        backgroundSpanUnderStatusBar="true">
		
        <StackLayout class="main" verticalAlignment="top" height="100%">
        <ScrollView ref="scrollView" @scroll="onScroll">
            <DockLayout stretchLastChild="true" >
                <GridLayout dock="top" ref="topView" class="anim-cover" rows="auto" columns="*" >
                    <Image row="0" col="0" marginTop="-40" height="180" width="100%" stretch="aspectFill"
                        class="card-img" :src="item.cover" />
                    <Label row="0" col="0" verticalAlignment="top"
                        horizontalAlignment="left" @tap="close" :text="'fa-arrow-left' | fonticon"
                        class="fa close" fontSize="24" />
                   
                </GridLayout>
                <!--Carousel of images-->
                <ScrollView dock="top"  class="anim-images" orientation="horizontal">
                    <StackLayout orientation="horizontal" class="">
                        <GridLayout v-for="image in item.images" rows="auto" columns="*">
                            <Image class="card-img-thumb" row="0" col="0" :src="image"
                                stretch="aspectFill" />
                        </GridLayout>
                    </StackLayout>
                </ScrollView>
                <!--End carousel-->
                <!--TabView-->
                <GridLayout dock="top" rows="auto,auto,auto" columns="*" width="100%">
                    <StackLayout row="0" class="line anim-likes" width="100%" marginTop="10" />
                    <GridLayout row="1" columns="auto,*,auto,auto" rows="auto" class="content anim-likes" marginTop="5" >
                        <!--
                        <GridLayout col="0" rows="auto" columns="auto,auto" @tap="toggleLike" horizontalAlignment="left">
                            <Label col="0" row="0" ref="like" class="like-icon fa"
                                :class="[isLike ? 'liked-active' : 'default']"
                                :text="isLike ? 'fa-thumbs-up':'fa-thumbs-o-up' | fonticon" />
                            <Label col="1" row="0" class="layout" :text="item.likes"></Label>
                        </GridLayout>
                        -->
                        <!--Comment Button-->'
                        <StackLayout col="1" rows="auto" columns="auto,auto" orientation="horizontal" @tap="goToComment" horizontalAlignment="left">
                            <Label ref="" class="like-icon layout fa" :text="'fa-comments-o' | fonticon" />
                            <Label class="layout" :text="item.totalcomments"></Label>
                        </StackLayout>
                        <!--End Comment Button-->
                        <!--Heart Button--> 
                        <GridLayout col="2" rows="auto" columns="auto" @tap="toggleHeart"  horizontalAlignment="left">
                            <Label  ref="favorite" class="like-icon  fa" 
                                :text="isHeart ? 'fa-heart':'fa-heart-o' | fonticon"
                                :class="[isHeart ? 'heart-active' : 'default']"/>   
                        </GridLayout>        
                        <!--End Heart Button-->
                        <!--Reservation Button-->               
                        <StackLayout col="3" orientation="horizontal" horizontalAlignment="right" @tap="bookReservation">
                            <Label ref="" class="like-icon layout fa" :text="'fa-share-square-o' | fonticon" />
                            <Label class="layout" :text="[isReserved ? 'Reservado' : 'Reservar']"/>
                        </StackLayout>
                        <!--End Reservation Button-->
                    </GridLayout>
                    <StackLayout row="2" width="100%" class="lineBreak anim-likes" />
                </GridLayout>
                <!--End TabView-->
                <!--Body--> 
                <StackLayout background="white" class="content anim-content" marginTop="10" >
                    <!--Book description-->
                    <GridLayout dock="top" rows="auto" marginBottom="5" columns="auto, auto">
                        <Label col="0" :text="'fa-tags' | fonticon" class="fa description-icon" textWrap="true" />
                        <Label col="1" class="description-text" text="Descripción" textWrap="true" />
                    </GridLayout>
                    <!--Review-->
                    <StackLayout verticalAlignment="top" horizontalAlignment="left">
                        <Label row="0" col="1" class="item-name" textwrap="true" verticalAlignment="bottom" 
                            horizontalAlignment="left" :text="item.name" />
                        <Label row="1" col="1" class="item-category" textwrap="true" verticalAlignment="top" 
                            horizontalAlignment="left" :text="item.category" />
                        <Label row="2" col="1" class="item-category" :text="'Calificación:' + item.rating " />

                       <!-- <StackLayout row="3" col="1" orientation="horizontal">
                            <Label class="fa rate" :text="'fa-star' | fonticon" />
                            <Label class="fa rate" :text="'fa-star' | fonticon" />
                            <Label class="fa rate" :text="'fa-star' | fonticon" />
                            <Label class="fa rate" :text="'fa-star' | fonticon" />
                            <Label class="fa rate" :text="'fa-star-half-o' | fonticon" />
                        </StackLayout>   -->   
                    </StackLayout>
                  <TextView editable="false" row="0" col="0" :text="item.description" maxLength="500"> </TextView>
                    <!--End Review-->
                    <!--End Book description-->                            
                </StackLayout> 
                <!--End Body-->
            </DockLayout>
        </ScrollView>
        </StackLayout>
		
    </Page>
</template>

<script>

    import Item from "./custom/itemComment";
    import Comment from "./Comment"
    import Search from "./search";
    import firebase from "nativescript-plugin-firebase";

    const app = require('tns-core-modules/application')
	const platform = require('tns-core-modules/platform')

    export default {
        props: ["item"],
        components: {
            Item,
        },
        computed: {
           // ...mapState(["isLoggedIn","profile"])
        },
        created() {
            this.currentReservation = Object.assign({}, this.$store.getters.getCurrentReservation);

            this.isHeart = this.item.isFavorite;
            
            this.checkReserved();
        },
        mounted() {},
        methods: {
            checkReserved(){
                
                if (this.$store.getters.getCurrentReservation) {
                    if (this.$store.getters.getCurrentReservation.idBook === this.item.id) {
                        if (this.$store.getters.getCurrentReservation.state==="pendiente" 
                        || this.$store.getters.getCurrentReservation.state==="prestado") {
                        this.isReserved = !this.isReserved;               
                        console.log(this.isReserved)
                        }
                    }
                   
                }
            },
            show(){
                console.log("vue");
            },
            onLoaded() {
                // this.animateFrom()
            },
            showDescription(){
                this.selectedTabview = 0;
            },
            showComments(){
                this.selectedTabview = 1;
            },
            goToComment(){
                this.$store.dispatch("fetchComments");
                this.$navigateTo(Comment);
            },
            onScroll: function () {
                //access to the native event
                const scrollView = this.$refs.scrollView.nativeView;
                const topView = this.$refs.topView.nativeView;

                // if the offset is less than the height of the header.
                if (scrollView.verticalOffset < 250) {
                    const offset = scrollView.verticalOffset / 1.65; // you can adjust this number to make the parallax more subtle or dramatic
                    if (scrollView.ios) {
                    // iOS adjust the position with an animation to create a smother scrolling effect. 
                    topView.animate({ translate: { x: 0, y: offset } }).then(() => { }, () => { });
                    } else {
                    // Android, animations are jerky so instead just adjust the position without animation.
                    topView.translateY = Math.floor(offset);
                    }
                }
            },
            categorySearch(){
                if(this.item.category.sciencieFiction){
                   console.log("ciencia ficcion")
                   return "fa-cutlery";
                }
            },
             onButtonTap() {
                console.log("args");
                 this.$navigateTo(Comment);  
            },
            animateTo() {
                let cover = this.$refs.cover.nativeView;
                let images = this.$refs.images.nativeView;
                let page = this.$refs.page.nativeView;

                // images.animate({
                // 	scale: { x: 1, y: 1 } ,
                // 	translate: { x: 0, y: 0},
                // 	opacity: 1,
                // 	duration: 1000,
                // 	delay: 150
                // });

                cover.animate({
                    scale: {
                        x: 0.5,
                        y: 0.5
                    },
                    opacity: 1,
                    duration: 1000,
                    delay: 0
                });
                cover.animate({
                    translate: {
                        x: 0,
                        y: 0
                    },
                    scale: {
                        x: 1,
                        y: 1
                    },
                    duration: 1000,
                    delay: 1000
                });

                page.animate({
                    backgroundColor: "#ffffff",
                    duration: 2000,
                    delay: 0
                });
            },
            close() {
                this.$navigateBack();
            },
            animateLike() {
                let imgLogo = this.$refs.like.nativeView;
                imgLogo
                    .animate({
                        scale: {
                            x: 0.6,
                            y: 0.6
                        },
                        duration: 100,
                        delay: 0
                    })
                    .then(function() {
                        return imgLogo.animate({
                            scale: {
                                x: 1.2,
                                y: 1.2,
                                duration: 50
                            }
                        });
                    })
                    .then(function() {
                        return imgLogo.animate({
                            scale: {
                                x: 1,
                                y: 1,
                                duration: 100
                            }
                        });
                    })
                    .then(function() {});
            },
            animateFavorite() {
                let imgLogo = this.$refs.favorite.nativeView;
                imgLogo
                    .animate({
                        scale: {
                            x: 0.6,
                            y: 0.6
                        },
                        duration: 50,
                        delay: 0
                    })
                    .then(function() {
                        return imgLogo.animate({
                            scale: {
                                x: 1.2,
                                y: 1.2,
                                duration: 50
                            }
                        });
                    })
                    .then(function() {
                        return imgLogo.animate({
                            scale: {
                                x: 1,
                                y: 1,
                                duration: 100
                            }
                        });
                    })
                    .then(function() {});
            },
            toggleLike() {
                this.animateLike();
                this.isLike = !this.isLike;
                if (this.isLike) {
                    this.item.likes += 1;
                } else {
                    this.item.likes -= 1;
                }
            },
            toggleHeart() {
                this.animateFavorite();
                this.isHeart = !this.isHeart;
                this.changeFavorite();
                
            },
            onClickButton() {
                this.$emit("clicked");			 
            },
            changeFavorite(){
                if (this.isHeart) {
                    firebase.firestore.collection("users").doc(this.$store.getters.profile.id).update({
                        favorites : firebase.firestore.FieldValue.arrayUnion(this.item.id)
                    }).then(() => {
                        this.$store.commit("setFavoriteBook", this.item.index);
                        this.$store.dispatch("updateBookList")
                        console.log(this.item.isFavorite);
                        console.log("Agregado a favoritos");
                    });  
                } else {
                    firebase.firestore.collection("users").doc(this.$store.getters.profile.id).update({
                        favorites : firebase.firestore.FieldValue.arrayRemove(this.item.id)
                    }).then(() => {
                        this.$store.commit("setNoFavoriteBook", this.item.index);
                        this.$store.dispatch("updateBookList")
                        console.log(this.item.isFavorite);
                        console.log("Removido de favoritos");
                    });  
                }
               
            },
            bookReservation(){
                
                    if (this.isReserved) {
                        confirm({
                        title: 'Reservación',
                        message: '¿Está seguro de que desea cancelar la reservación?',
                        okButtonText: 'Si',
                        cancelButtonText: 'No'
                        }).then(result => {
                            if (result) {
                                this.$store.dispatch("cancelReservation")
                                this.isReserved=!this.isReserved;
                            }else{
                                console.log("Cancel")
                            }
                            
                        });

                    }else{
                        console.log(this.$store.getters.getCurrentReservation);
                        if (this.$store.getters.getCurrentReservation) {
                                alert({
                                title: "Reservación",
                                okButtonText: "OK",
                                message: "No puedes reservar más de un libro"
                                });
                            
                        }else{

                            if (this.$store.getters.getCurrentBook.available > 0) {
                                confirm({
                                title: 'Reservación',
                                message: '¿Esta seguro que desea reservar el libro?',
                                okButtonText: 'Si',
                                cancelButtonText: 'No'
                                }).then(result => {
                                    if (result) {
                                        this.$store.dispatch("addReservation")
                                        console.log(result);
                                        this.isReserved=!this.isReserved;
                                    }else{
                                        console.log("Cancel")
                                    }
                                });                        
                            }else{
                                console.log("No hay disponibles")
                                alert({
                                title: "Reservación",
                                okButtonText: "OK",
                                message: "No hay ejemplares disponibles"
                                });
                            }

                        }
                      
                           
                    }
              
              
                
            },
            
        },
        data() {
            return {
                images: null,
                isLike: false,
                isHeart: false,
                selectedTabview: 0,
                isActive: false,   
                isReserved: false,  
                currentReservation: {},
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

    .heart {
        font-size: 20;
        color: rgb(226, 229, 229);
        margin: 15 15 15 15;
    }

    .fab-button {
        height: 45;
        width: 45;
        margin: 15;
        background-color: #ff4081;
        horizontal-align: right;
        vertical-align: bottom;
        
    }

    TextView {
        border-width: 1;
        border-color: #ffffff;
    }

    .description-text {
        font-size: 14;
        font-weight: bold;
        color: black;
    }

    .description-icon {
        font-size: 16;
        font-weight: bold;
        color: #3e9edb;
        margin-right: 8;
        vertical-align: center;
    }

    .description-value {
        font-size: 14;
        color: black;
    }

    .rate {
        padding-top: 3;
        margin: 0;
        color: #FFE900;
        font-size: 18;
    }

    .rating-value {
        margin-left: 5;
    }
      
    .liked-active {
        color: #4080FF;
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
        color: white;
        vertical-align: center;
        font-size: 25;
        border-width: 1;
        border-color: #ffffff;
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
        /* margin-top: 16; */
    }

    .card-img {
        width: 100%;
        height: 250;
        margin-bottom: 5;
    }

    .card-img-thumb {
        background-color: #828282;
        vertical-align: center;
        border-radius: 5;
        width: 130;
        height: 70;
        margin-left: 5;
    }

    .line {
        height: 0.5;
        border: none;
        color: #e0e0e0;
        background-color: #e0e0e0;
    }

    .lineBreak {
        height: 0.5;
        border: none;
        color: #e0e0e0;
        background-color: #e0e0e0;
    }

    .anim-page {
        background-color: #d4d6d8;
        animation-name: key-page;
        animation-duration: 2;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    @keyframes key-page {
        0% {
            background-color: #dadada;
        }

        20% {
            background-color: #dbd2d5;
        }

        100% {
            background-color: white;
        }
    }

    .anim-cover {
        opacity: 0;
        animation-name: key-cover;
        animation-duration: 1;
        animation-delay: 0.5;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    @keyframes key-cover {
        0% {
            opacity: 0;
            transform: translate(0, 550) scale(0, 0);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        30% {
            opacity: 0.5;
            transform: scale(0.6, 0.6);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        100% {
            opacity: 1;
            transform: translate(0, 0) scale(1, 1);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }
    }

    .anim-images {
        opacity: 0;
        animation-name: key-images;
        animation-duration: 1;
        animation-delay: 0.7;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    @keyframes key-images {
        0% {
            opacity: 0;
            transform: translate(0, 550) scale(0, 0);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        30% {
            opacity: 0.5;
            transform: scale(0.6, 0.6);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        100% {
            opacity: 1;
            transform: translate(0, 0) scale(1, 1);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }
    }

    .anim-itemInfo {
        opacity: 0;
        animation-name: key-itemInfo;
        animation-duration: 1;
        animation-delay: 1.2;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    @keyframes key-itemInfo {
        0% {
            opacity: 0;
            transform: translate(50, 50);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        100% {
            opacity: 1;
            transform: translate(0, 0);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }
    }

    .anim-likes {
        opacity: 0;
        animation-name: key-likes;
        animation-duration: 1;
        animation-delay: 1.5;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    @keyframes key-likes {
        0% {
            opacity: 0;
            transform: translate(50, 50);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        100% {
            opacity: 1;
            transform: translate(0, 0);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }
    }

    .anim-content {
        opacity: 0;
        animation-name: key-content;
        animation-duration: 1;
        animation-delay: 1.8;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    @keyframes key-content {
        0% {
            opacity: 0;
            transform: translate(50, 50);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        100% {
            opacity: 1;
            transform: translate(0, 0);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }
    }

    ListView Label {
		height: 48;
		min-height: 48;
	}

	.backdrop {
		background-color: rgba(29, 30, 35, .90);
		opacity: 0;
	}

	.backdrop-visible {
		animation-name: activateBackdrop;
		animation-duration: .25;
		animation-fill-mode: forwards;
	}

	.backdrop-invisible {
		animation-name: activateBackdrop;
		animation-duration: .25;
		animation-fill-mode: forwards;
		animation-direction: reverse;
	}

	.raiseItem1 {
		opacity: 1;
		animation-name: raiseItem1;
		animation-duration: .25;
		animation-timing-function: cubic-bezier(0.165, 0.840, 0.440, 1.000);
		animation-fill-mode: forwards;
	}

	.raiseItem2 {
		opacity: 1;
		animation-name: raiseItem2;
		animation-duration: .25;
		animation-timing-function: cubic-bezier(0.165, 0.840, 0.440, 1.000);
		animation-fill-mode: forwards;
	}

	.raiseItem3 {
		opacity: 1;
		animation-name: raiseItem3;
		animation-duration: .25;
		animation-timing-function: cubic-bezier(0.165, 0.840, 0.440, 1.000);
		animation-fill-mode: forwards;
	}

	.downItem1 {
		animation-name: raiseItem1;
		animation-duration: .20;
		animation-timing-function: cubic-bezier(0.895, 0.030, 0.685, 0.220);
		animation-fill-mode: forwards;
		animation-direction: reverse;
	}

	.downItem2 {
		animation-name: raiseItem2;
		animation-duration: .20;
		animation-timing-function: cubic-bezier(0.895, 0.030, 0.685, 0.220);
		animation-fill-mode: forwards;
		animation-direction: reverse;
	}

	.downItem3 {
		animation-name: raiseItem3;
		animation-duration: .20;
		animation-timing-function: cubic-bezier(0.895, 0.030, 0.685, 0.220);
		animation-fill-mode: forwards;
		animation-direction: reverse;
	}

	@keyframes activateBackdrop {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes raiseItem1 {
		from {
			opacity: 1;
			transform: translate(0, 0);
		}
		to {
			opacity: 1;
			transform: translate(0, -64);
		}
	}

	@keyframes raiseItem2 {
		from {
			opacity: 1;
			transform: translate(0, 0);
		}
		to {
			opacity: 1;
			transform: translate(0, -128);
		}
	}

	@keyframes raiseItem3 {
		from {
			opacity: 1;
			transform: translate(0, 0);
		}
		to {
			opacity: 1;
			transform: translate(0, -192);
		}
	}



</style>