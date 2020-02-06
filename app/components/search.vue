<template>
<Page actionBarHidden="true" backgroundSpanUnderStatusBar="true" >
    <GridLayout rows="50,*" columns="*" id="searching" class="align-center " :class=platform @tap="clearFocus"
    paddingTop="5">
        <FlexboxLayout row="0" padding="10" borderRadius="16" backgroundColor="#ffffff"
            class="input-container" width="300" alignItems="center"
            justifyContent="center">
            <Label :text="'fa-arrow-left' | fonticon" class="fa " height="20" minWidth="20"  @tap="close"
                margin="0 12" fontSize="20"/>
            <TextView :width="searchBarWidth" editable="true" v-model="searchQuery"
                hint="Buscar..." class="input extra-bold" :class="{empty: (searchQuery == '')}"
                ref="searchBar" maxLength="8">
            </TextView>
            <Image src="~/assets/images/search.png" height="16" minWidth="16"
                margin="0 14" @tap="searchQuery = ''" />
        </FlexboxLayout>
         <ScrollView row="1" orientation="vertical" >
            <FlexboxLayout flexDirection="column" alignItems="center" justifyContent="center">
                <Label :text="book.name" v-for="(book,index) in filteredBooks"
                    :key="index" padding="5"  class="city bold"
                    @tap="showItem(book)" />
            </FlexboxLayout>
        </ScrollView>
        <!--<Button @tap="toggleSearch" class="close" /-->
    </GridLayout>
</Page>
</template>

<script>
    //import CityOverview from "./CityOverview";
    const application = require("tns-core-modules/application");
	import ItemDetails from "./ItemDetails";

    export default {
        created(){
        
        this.$store.dispatch("fetchBooksNames");
        		
	    },
        methods: {
            showItem(payload) {
                this.$store.commit('setCurrentSearch',payload.id);

                this.$store.dispatch("fetchReservations");

                this.$store.dispatch("fetchBookById");

                this.$navigateTo(ItemDetails,{
                    props: {
                        item: this.$store.getters.getCurrentBook
                    },
                    animated: true,
                    transition: {
                        name: "slideTop",
                        duration: 380,
                        curve: "easeIn"
                    }
                })
		    },
            goToCityOverview(city) {
                /*this.$navigateTo(this.cityOverviewPage, {
                    props: {
                        city: city
                    }
                });*/
            },
            clearFocus() {
                this.$refs.searchBar.nativeView.dismissSoftInput();
            },
            close() {
                this.$navigateBack();
            },
        },

        mounted() {
            //this.searchQuery = "";
            //if (application.android) {
            //setTimeout(() => {
            //this.clearFocus();
            // }, 100);
            // } else if (application.ios) {
            //  setTimeout(() => {
            //      this.searchBarWidth = "100%";
            // }, 500);
            // }

            if (application.ios) {
                console.log("IOS")
                this.platform = "ios";
                setTimeout(() => {
                    this.searchBarWidth = "100%";
                }, 500);
            } else if (application.android) {
                console.log("ANDROID")
                this.platform = "android";
            }
        },

        computed: {
            filteredBooks() {
                if (this.searchQuery !== "") {
                    
                    return this.$store.getters.getBooksName.filter(book =>
                        book.name.toLowerCase().includes(this.searchQuery.toLowerCase())
                    );
                }
            }
        },

        data() {
            return {
                platform: "",
                searchBarWidth: "0%",
                searchQuery: "",
               
                
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

    #searching {
        padding: 0 25;
        background: linear-gradient(-45deg, rgb(255, 0, 0), #bd2122 );

        /* background:yellow  ff0154; */
    }

    #searching .city {
        color: #ffffff;
        font-size: 16;
    }

    #searching .h2 {
        font-size: 18;
        margin-bottom: 40;
        color: #ffffff;
    }

    #searching .input-container {
        opacity: 0;
        animation-name: bounceIn;
        animation-duration: 1s;
        animation-fill-mode: forwards;
        animation-delay: 0s;
    }

    #searching .input {
        background-color: #ffffff;
        height: 50;
        text-decoration: none;
        font-size: 24;
        text-align: left;
        width: 100%;
        flex-grow: 2;
    }

    #searching.ios .input {
        padding-top: 10;
    }

    #searching .input.empty {
        font-size: 16;
        padding-top: 19;
    }

  
</style>
