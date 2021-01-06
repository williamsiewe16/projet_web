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
      {path: "/accueil", component: Home},
      {path: "/likes", component: Likes},
      {path: "/deceptions", component: Deceptions},
      {path: "/contact", component: Contact},
    ]
  },
  { path: '/register', component: Register },
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
    const res = await axios.get('/api/film/all')
    this.films = res.data
   /*/ const res2 = await axios.get('/api/panier')
    this.panier = res2.data
    const res3 = await axios.get('/api/me')
    this.user = res3.data
    console.log(this.user)*/
  },
  methods: {
    async addArticle (article) {
      const res = await axios.post('/api/article', article)
      this.articles.push(res.data)
    },
    async updateArticle (newArticle) {
      await axios.put('/api/article/' + newArticle.id, newArticle)
      const article = this.articles.find(a => a.id === newArticle.id)
      article.name = newArticle.name
      article.description = newArticle.description
      article.image = newArticle.image
      article.price = newArticle.price
    },
    async deleteArticle (articleId) {
      await axios.delete('/api/article/' + articleId)
      const index = this.articles.findIndex(a => a.id === articleId)
      this.articles.splice(index, 1)
    },
    async addToPanier (id) {
      const res = await axios.post('/api/panier', {id,quantity: 1})
      this.panier = res.data.panier
    },
    async removeFromPanier(id){
      const res = await axios.delete(`/api/panier/${id}`)
      this.panier = res.data.panier
    },    
    async updateFromPanier(newArticle) {
      const res = await axios.put(`/api/panier/${newArticle.id}`, newArticle)
      this.panier = res.data.panier
    },
    async register(user){
      try{
        const res = await axios.post('/api/user/register', user)
       // alert(res.data.message)
        const res3 = await axios.get('/api/user/me')
        this.user = res3.data
        router.push("/")
      }catch(e){
        alert(e.response.data.error)
      }
    },
    async login(user){
      try{
        const res = await axios.post('/api/user/login', user)
        //alert(res.data.message)
        const res3 = await axios.get('/api/user/me')
        this.user = res3.data
        router.push("/")
      }catch(e){
        alert(e.response.data.error)
      }
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
