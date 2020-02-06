<template>
    <StackLayout class="main">

        <StackLayout class="content">

            <GridLayout width="100%" columns="auto,auto" rows="auto" class="">

                <Image  row="0" col="0" height="60" width="40%" stretch="aspectFill" class="card-img" @tap="onClickButton()"
                :src="item.cover" />

                <GridLayout columns="auto" rows="auto,auto" row="0" col="1" height="60" width="60%">
                    <Label col="0" row="0" class="layout" :text="item.nameOfBook"></Label>
                    <Label col="0" row="1" class="layout" :text="item.endDate"></Label>
                </GridLayout>

            </GridLayout>
        </StackLayout>

        <StackLayout width="100%" class="lineBreak" />

    </StackLayout>
</template>

<script>
    import {
        isIOS,
        isAndroid
    } from "tns-core-modules/platform";
    export default {
        props: ["item"],
        components: {
        
        },
        computed: {
           
        },
        created() {
          
        },
        mounted() {},
        methods: {
            onClickButton() {
                this.$emit("clicked", this.item);
            }
        },
        data() {
            return {
              
            };
        }
    };
</script>
<style scoped>
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
        color: white;
        border-color: white;
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
        margin-bottom: 5;
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