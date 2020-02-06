<template>
   <Page ref="page" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
        <StackLayout class="container">
            <GridLayout class="action-bar" rows="*" columns="50,2*,50">
                <Label col="0" row="0" class="fas" @tap="$navigateBack()" :text="'\uf060'"/>
                <Label col="1" row="0" class="header" text="Profile"/>               
            </GridLayout>        
            <GridLayout>
              <GridLayout class="form-content" rows="auto,*,auto,auto" >
                  <StackLayout class="top-border" row="0"/>
                  <ScrollView row="1" class="fields-section">
                      <StackLayout>
                          <!-- Username -->
                          <GridLayout  ios:columns="auto,*" android:rows="auto, auto" verticalAlignment="top">
                              <Label text="Username" class="field-title" />
                              <TextField v-bind:class="{ editable: editable }" id="username" :editable="editable" v-model="origprofile.name" class="field" ios:col="1" android:row="1" tap="onTextInputTapped" />
                          </GridLayout>
                          <StackLayout class="line"/>
                          <!-- Profile Pic -->
                          <GridLayout  ios:columns="auto,*" android:rows="auto, auto" verticalAlignment="top">
                              <Label text="Profile Pic" class="field-title" />
                              <TextField v-bind:class="{ editable: editable }" id="profile_pic" :editable="editable" v-model="origprofile.profile_pic" class="field" ios:col="1" android:row="1" tap="onTextInputTapped" />
                          </GridLayout>
                          <StackLayout class="line"/>
                          <!-- Bio -->
                          <StackLayout >
                              <Label text="Bio" class="field-title" />
                              <TextView v-bind:class="{ editable: editable }" id="bio" :editable="editable" v-model="origprofile.bio" android:hint="Add bio" ios:hint="Bio" class="field-multiline" tap="onTextInputTapped"/>
                          </StackLayout>
                          <StackLayout class="line"/>
                      </StackLayout>
                  </ScrollView>                  
                  <Button row="2" v-show="!editable" text="Update" class="update" @tap="toggleForm" col="0" colspan="2"/>
                  <GridLayout row="3" columns="*,*"  >
                    <Button v-show="editable" text="Save" class="save" @tap="saveProfile" col="0"/>
                   <Button v-show="editable" text="Cancel" class="cancel" @tap="saveCancel" col="1"/>            
                  </GridLayout>                  
             </GridLayout>
             <!-- Picture -->
             <Image id="image" :src="origprofile.profile_pic" class="profile-picture" v-bind:class="{'editable': editable }" @tap="onProfilePictureTapped"/>      
            </GridLayout>
        </StackLayout>
    </Page>
</template>

<script>
    import {
        isIOS,
        isAndroid
    } from "tns-core-modules/platform";
    export default {
      
        computed: {
            categoryIcon() {
              
            }
        },
        created() {
            // this.isLike =  this.item.isLike
            // this.isHeart =  this.item.isFavorite
        },
        mounted() {},
        methods: {
            
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