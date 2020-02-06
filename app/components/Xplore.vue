<template>
<Page  ref="page" backgroundSpanUnderStatusBar="true">
        <StackLayout class="container" verticalAlignment="top">

            <!-- <GridLayout marginTop="5" width="100%" row="3" columns="auto,*,auto,auto" rows="auto"> -->
            <GridLayout v-show="activeSearch" rows="auto" columns="auto,auto">
                <SearchBar row="0" col="1" hint="Buscar ..." [text]="searchPhrase" (textChange)="onTextChanged($event)" (submit)="onSubmit($event)" 
                        color="grey" textFieldBackgroundColor="lightgrey" textFieldHintColor="darkgrey"></SearchBar>
            </GridLayout>

            <ScrollView class="anim-images" orientation="horizontal">
                        <StackLayout orientation="horizontal" class="">
        
                        </StackLayout>
            </ScrollView>
        </StackLayout>
</Page>
</template>

<script>
    export default {
        computed: {},
        created() {
          
        },
        mounted() {},
        methods: {
        },
         close() {
                this.$navigateBack();
        },
        data() {
            return {
                isLike: false,
                isHeart: false,
                activeSearch: false,
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

    .item-category {
        font-size: 14;
        color: #828282;
    }

    .rating-icon {
        padding-top: 3;
        color: #FFE900;
        font-size: 14;
        margin-left: 10;
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