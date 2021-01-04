<template>
  <div>
    <h2>Mon Panier</h2>
    <article v-for="article in panierAssociatif" :key="article.id">
      <div class="article-img">
        <img :src="article.image" width="100px" height="100px"/>
      </div>
      <div class="article-content">
        <div class="article-title">
          <h2>{{ article.name }} - {{ article.price }}€</h2>
          <div v-if="editingArticle.id != article.id ">
            <div>quantité: {{ article.quantity }}</div>
            <button @click="editArticle(article)">Modifier</button>
          </div>
          <div v-else>
              <span>quantité:</span>
              <input type="number" v-model="editingArticle.quantity" />
              <button @click="updateFromPanier(article.id, editingArticle.quantity)">Valider</button>
              <button @click="abortEditArticle()">Annuler</button>
          </div>
        </div>
      </div>
    </article><br/>
    <button @click="pay" v-if="panier.articles.length != 0">Valider l'achat</button>
  </div>
</template>

<script>
module.exports = {
  props: {
    articles: { type: Array, default: [] },
    panier: { type: Object }
  },
  data () {
    return {
      editingArticle: {
        id: -1,
        quantity: 1
      }
    }
  },
  async mounted () {
  },
  methods: {
    editArticle (article) {
      this.editingArticle.id = article.id
      this.editingArticle.quantity = article.quantity
    },
    abortEditArticle () {
      this.editingArticle = {
        id: -1,
        quantity: -1
      }
    },
    updateFromPanier(id,quantity){
      this.$emit("update-from-panier",{id,quantity})
      this.abortEditArticle()
    },
    pay(){
      this.$emit('pay')
    }
  },
  computed: {
    panierAssociatif(){
      return this.panier.articles.map(article_ => {
        let quantity = article_.quantity
        article_ = this.articles.find(article => article.id == article_.id)
        article_ = {...article_, quantity}
        return article_
      })
    }
  }
}
</script>

<style scoped>
</style>
