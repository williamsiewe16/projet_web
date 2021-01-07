const Main = window.httpVueLoader('./components/Main.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Login = window.httpVueLoader('./components/Login.vue')
const Home = window.httpVueLoader('./components/Home.vue')
const Likes = window.httpVueLoader('./components/Likes.vue')
const Deceptions = window.httpVueLoader('./components/Deceptions.vue')
const Contact = window.httpVueLoader('./components/Contact.vue')

const routes = [
  {
    path: '/', component: Main,
    children: [
      {path: "/accuil", component: Home},
      {path: "/likes", component: Likes },
      {path: "/deceptions", component: Deceptions},
      {path: "/contact", component: Contact},
    ]
  },
  { path: '/register', component: Register},
  { path: '/login', component: Login },
]

const router = new VueRouter({
  routes
})

let app = new Vue({
  router,
  el: '#app',
  data: {
    user: {},
    likes: [],
    deceptions: [],
    films: [],
    image_url: "https://image.tmdb.org/t/p/w300"
  },

  async mounted () {
    // On recupère la liste des films
    const res = await axios.get('/api/film/all')
    this.films = res.data
    this.getUserInfos()
  },
  methods: {
    async getUserInfos(){
      // On recupère l'utilisateur connecté
      const res2 = await axios.get('/api/user/me')
      this.user = res2.data
      try{
        // On recupère les likes et les déceptions de l'utilisateur connecté
        const res3 = await axios.get('/api/user/likes')
        this.likes = res3.data.map(film => film.film_id)
        const res4 = await axios.get('/api/user/deceptions')
        this.deceptions = res4.data.map(film => film.film_id)
      }catch (e) {
        console.log("no user connected")
      }
    },
    async register(user){
      try{
        const res = await axios.post('/api/user/register', user)
       // alert(res.data.message)
        this.getUserInfos()
        router.push("/")
      }catch(e){
        alert(e.response.data.error)
      }
    },
    async login(user){
      try{
        const res = await axios.post('/api/user/login', user)
        //alert(res.data.message)
        this.getUserInfos()
        router.push("/")
      }catch(e){
        alert(e.response.data.error)
      }
    },
    async logout(user){
      try{
        const res = await axios.post('/api/user/logout')
        this.user = {}
        router.push("/login")
      }catch(e){
        alert(e.response.data.error)
      }
    },
    async like (id) {
      const res = await axios.post(`/api/film/${id}/like`)
      this.likes.push(id)
    },
    async dislike (id) {
      const res = await axios.delete(`/api/film/${id}/dislike`)
      this.likes = this.likes.filter(val => val != id)
      //Vue.set(this.likes,this.likes.indexOf(id),)
    },
    async addToDeception (id) {
      const res = await axios.post(`/api/film/${id}/addToDeception`)
      this.deceptions.push(id)
    },
    async removeFromDeception (id) {
      const res = await axios.delete(`/api/film/${id}/removeFromDeception`)
      this.deceptions = this.deceptions.filter(val => val != id)
    },
    async pay(){
      try{
        const res = await axios.post('/api/panier/pay')
        alert(res.data.message)
        window.location.href="./"
      }catch(e){
        if(e.response.status == 401)
        router.push("/login")
      }
    }
  }
})
