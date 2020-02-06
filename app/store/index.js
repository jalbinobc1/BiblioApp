import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import firebase from 'nativescript-plugin-firebase'
import ProfileService from '../services/ProfileService'
import BookService from '../services/BookService'
import CommentService from '../services/CommentService'
import ReservationService from '../services/ReservationService';

Vue.use(Vuex);
const state = {
  isLoggedIn:null,
  profile:null,
  items:[],
  booksName:[],
  category:[],
  currentCat:null,
  currentBook:null,
  listCategories:[],
  comments:[],
  reservations:[],
  currentReservation:null,
  suggestedBooks:[],
  currentSearch:null,
}
const getters = {
  isLoggedIn: state =>{
    return state.isLoggedIn
  },
  profile: state =>{
    return state.profile
  },
  books: state =>{
    return state.items
  },
  category: state =>{
    return state.category
  },
  getBooksByCat: (state) => (id) => {
    console.log(state.items.filter(book => book.category == id))
    return state.items.filter(book => book.category == id)
  },
  getBooksSuggest: state => {
    return state.suggestedBooks
  },  
  getFavoriteBooks: state => {
    return state.items.filter(book => book.isFavorite==true)
  },
  getItemReserved: state => {
    console.log(state.items.filter(book => book.id === state.currentReservation.idBook));
    return state.items.filter(book => book.id === state.currentReservation.idBook)
  },
  getBooksByName: state => (id) => {
    return state.items.filter(book => book.name===true)
  },  
  getCurrentBook: state =>{
    return state.currentBook
  },
  getCurrentReservation: state =>{
    return state.currentReservation
  },
  getComments: state =>{
    return state.comments
  },
  getReservations: state =>{
    return state.reservations
  },
  getBooksName: state =>{
    return state.booksName
  }
}
const mutations = {
  setIsLoggedIn: (state, value) => {
    state.isLoggedIn = value;
  },
  setProfile: (state, profile) => {
    state.profile = profile;
  },
  setProfilePicture: (state, profilepicture) => {
    state.profile.profile_pic = profilepicture;
  },
  setListBooks: (state, items) => {
    //state.items = items;
    Vue.set(state, 'items',items);
  },
  setListName: (state, items) => {
    //state.items = items;
    Vue.set(state, 'booksName',items);
  },
  setListCategory: (state, items) => {
    Vue.set(state, 'category',items);
  },
  setCurrentBook: (state, value) => {
    state.currentBook = value;
  },
  setCurrentCat: (state, value) => {
    state.currentCat = value;
  },
  setCommentList: (state, items) => {
    //state.items = items;
    Vue.set(state, 'comments',items);
  },
  setFavoriteBook: (state, value) => {
    state.items[value].isFavorite = true;
  },
  setNoFavoriteBook: (state, value) => {
    state.items[value].isFavorite = false;
  },
  setReservationsList: (state, items) => {
    Vue.set(state, 'reservations',items);
  },
  setCurrentReservation: (state, value) => {
    state.currentReservation = value;
  },
  setSuggestedBooks: (state, items) => {
    Vue.set(state, 'suggestedBooks',items);
  },
  setCurrentSearch: (state, value) => {
    state.currentSearch = value;
  },
  
}
const actions = {
  fetchProfile() {
    ProfileService.getProfile()
  },
  fetchBooksByCat(){
    BookService.getListCat(state.currentCat)
  },
  fetchBooksSuggest(){
    BookService.getSuggestions()
  },
  fetchBooksNames(){
    BookService.getListName()
  },
  fetchReservations(){
    ReservationService.getReservations(state.profile.id)
  },
  setItems(){
    BookService.getList()
  },
  fetchCategory(){
    BookService.getCategory()
  },
  fetchComments(){
    CommentService.getList(state.currentBook.id)
  },
  updateBookList(){
    BookService.onUpdate();
  },
  addReservation(){
    ReservationService.newReservation();
  },
  cancelReservation(){
    ReservationService.removeReservation();
  },
  fetchBookById(){
    BookService.getById(state.currentSearch)
  }
}
const storeConf = {
  state,
  getters,
  mutations,
  actions
}
export default new Vuex.Store(storeConf)
