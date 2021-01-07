<template>
  <div class="tail-top">
    <div class="tail-bottom">
      <div id="main">
        <!-- HEADER -->
        <div id="header">
          <div class="row-1">
            <h2><b>Central <span>Cinema</span></b></h2>
            <!-- Icone de l'utilisateur -->
            <div class="user" v-if="user.id">
              <li class="nav-item admin-zone dropdown has-arrow">
                <a href="#" class="dropdown-toggle nav-link user-link" data-toggle="dropdown">
                        <span class="user-img">
                            <img class="rounded-circle" src="../src/images/user.jpg" width="35" alt="Admin">
							<span class="status- online"></span>
                        </span>
                  <span style="font-size: 1.2em">{{user.pseudo}}</span>
                </a>
                <div class="dropdown-menu" style="cursor: pointer">
                  <span class="dropdown-item" @click="logout">Se déconnecter</span>
                </div>
              </li>
            </div>
            <!-- Lien de connexion et d'inscription -->
            <div v-else class="links">
              <router-link to="/login"><span>Se connecter</span></router-link>
              <router-link to="/register"><span class="register">S'inscrire</span></router-link>
            </div>
          </div>
          <div class="row-2">
            <ul>
              <router-link :to="menu.path" v-for="menu in menus" :key="menu.id" :style="user.id ? 'flex: 1' : ''">
                <li :class="activeId == menu.id ? 'active': ''" @click="activeId = menu.id">{{menu.title}}</li>
              </router-link>
            </ul>
          </div>
        </div>
        <!-- CONTENT -->
        <div id="content">

          <!-- <div class="box">
            <div class="border-right">
              <div class="border-left">
                <div class="inner">
                  <h3>Bienvenue dans notre Cinema</h3>
                  <p>Voici le site web que nous avons fait en groupe pour notre projet. Dans ce site nous voulions réaliser un site web se rapprochant de letterbox ou nous pouvions lister nos films favoris ainsi que nos deception. &amp; CSS valid.</p>
                  <p>Ce sites à de nombreusess pages : <a href="index.html">Acceuil</a>, <a href="about-us.html">A propos de nous</a>, <a href="articles.html">Articles</a> (with Article page), <a href="contact-us.html">Nous contacter</a> (note that contact us form – doesn’t work), <a href="sitemap.html">Site Map</a>.</p>
                </div>
              </div>
            </div>
          </div> -->
          <router-view
                  :user="user"
                  :likes="likes"
                  :films="films"
                  :deceptions="deceptions"
                  :image_url="image_url"
                  @like="like"
                  @dislike="dislike"
                  @add-to-deception="addToDeception"
                  @remove-from-deception="removeFromDeception"
          ></router-view>
        </div>
        <!-- FOOTER -->
        <div id="footer">
          <div class="left">
            <div class="right">
              <div class="inside">
                <span style="color: white">Copyright 2021 - ABAT_MHAMDI_SIEWE</span>
                <div>
                  <a href="https://www.facebook.com"><i class="fab fa-facebook-f"></i></a>
                  <a href="https://www.twitter.com"><i class="fab fa-twitter"></i></a>
                  <a href="https://www.instagram.com"><i class="fab fa-instagram"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  components: {},
  props: {
    user: Object,
    likes: { type: Array, default: [] },
    deceptions: { type: Array },
    films: { type: Array },
    image_url: { type: String }
  },
  data () {
    return {
      activeId: 0
    }
  },
  computed: {
    menus(){
      let menus = [{id: 0, title: "Accueil", path: "/accueil"}]
      this.user.id ? menus.push({id: 1, title: "Mes Favoris", path: "/likes"}) : ""
      this.user.id ? menus.push({id: 2, title: "Mes Déceptions", path: "/deceptions"}) : ""
      menus.push({id: 3, title: "Contacts", path: "/contact"})
      return menus
    }
  },
  methods: {
    logout () {
      if (this.user.id) {
        this.$emit('logout')
      }
    },
    like (id) {
      this.$emit('like',id)
    },
    dislike (id) {
      this.$emit('dislike',id)
    },
    addToDeception (id) {
      this.$emit('add-to-deception',id)
    },
    removeFromDeception (id) {
      this.$emit('remove-from-deception',id)
    },
  }
}
</script>

<style scoped>
  /* TAGS */
  html, body {min-width:940px}
  body {background:#000;font-family:Arial,Helvetica,sans-serif;font-size:100%;line-height:1em;color:#858585}
  object {vertical-align:top;outline:none}
  input, textarea, select {font-family:Arial,Helvetica,sans-serif;font-size:1em;vertical-align:middle;font-weight:normal}
  fieldset {border:0}
  p {margin:0;padding:0}
  img {border:0;vertical-align:top;text-align:left}
  ul, ol {list-style:none}
  /* GLOBAL */
  #main {width:90vw;margin:0 auto;font-size:0.875em; background-color: #333333; min-height: 100vh}
  #header {height:171px;margin-bottom:-8px; padding: 5px}
  #footer {background:url("../src/images/pexels-nathan-engel-436413.jpg") repeat-x left top #bfbfbf;color:#1d1d1d;font-size:.86em;line-height:1.667em;text-align:center; width: 90vw;
    position: fixed; bottom: 0px;}
  /* ALIGMENT */
  .fleft {float:left}
  .fright {float:right}
  .col-1, .col-2, .col-3 {float:left}
  .clear {clear:both}
  .alignright {text-align:right}
  .aligncenter {text-align:center}
  .wrapper {width:100%;overflow:hidden}
  .extra-wrap {overflow:hidden}
  .container {width:100%}
  /* TAILING */
  .tail-top {background-color: #f2f2f2}
  /* FORMS */
  #contacts-form {clear:right;width:842px;overflow:hidden}
  #contacts-form fieldset {border:none;float:left}
  #contacts-form .field {clear:both}
  #contacts-form label {float:left;width:112px !important;width:109px;line-height:18px;padding-bottom:8px;color:#fff}
  #contacts-form input {width:293px;padding:1px 0 1px 3px;background:#000;border:1px solid #3a3a3a;color:#fff}
  #contacts-form .link2 {float:right}
  /* LISTS */
  .list {margin-top:-30px}
  .list li {width:100%;overflow:hidden;vertical-align:top;line-height:1.714em;padding-top:40px}
  .list li img {float:left;margin:-10px 20px 0 0}
  .list li a {text-decoration:none}
  .list li a:hover {color:#d72a18}
  .sitemap-list {padding-bottom:25px}
  .sitemap-list li a {color:#d72a18}
  /* OTHER */
  .img-box1 {width:100%;overflow:hidden;line-height:1.714em;padding:10px 0 12px 0}
  .img-box1.alt {padding-top:0;padding-bottom:25px}
  .img-box1.alt img {margin-top:0}
  .img-box1 img {float:left;margin:-10px 20px 0 0}
  p {margin-bottom:15px;line-height:1.714em}
  .p1 {margin-bottom:23px}
  .address {width:100%;overflow:hidden;line-height:1.714em}
  .address span {color:#fff}
  .address .fleft {padding-right:43px !important;padding-right:40px}
  .address .fleft span {float:left;width:80px !important;width:77px}
  /* TXT, LINKS, LINES, TITLES */
  a {color:#e1e1e1;outline:none}
  a:hover {text-decoration:none}
  h2 {font-size:30px;line-height:1.2em;color:grey;margin-bottom:12px; font-family: 'Pacifico', sans-serif}
  h2 span {display:block;font-size:40px;color:#2c6d9a}
  h3 {font-size:30px;line-height:1.2em;color:#bfbfbf;margin-bottom:20px}
  h3 b {color:#e1e1e1;font-weight:normal}
  h3 span {color:#eeac13}
  .user{transform: translateY(-20%)}
  h4 {font-size:20px;line-height:1.2em;letter-spacing:-1px;color:#2c6d9a;margin-bottom:18px}
  .link1:hover span {text-decoration:underline}
  .link2:hover span {text-decoration:underline}
  /* BOXES */
  .box {background:#aaaaaa;width:100%;margin-top:-3px}
  .box .inner {padding:28px 50px 25px 50px}
  /* HEADER */
  #header .row-1 {height:112px;width:100%;overflow:hidden; display: flex; align-items: center; justify-content: space-between;}
  #header .row-1 .fleft {font-size:40px;line-height:1.2em;padding:26px 0 0 47px}
  #header .row-1 .fleft a {text-decoration:none}
  #header .row-1 ul {padding:49px 60px 0 0;float:right}
  #header .row-1 ul li {float:left;padding-left:54px}
  .links span {color: white; padding: 5px; transition: color 0.5s}
  .links span:hover {color: grey}
  .links .register {border-left: 1px solid white}
  #header .row-2 {height:51px}
  #header .row-2 ul {width:100%;overflow:hidden; display: flex; justify-content: center}
  #header .row-2 ul a {}
  #header .row-2 ul li {transition: background-color 0.6s; color: white;cursor:pointer;font-size:15px;margin-right:5px;background-color:#000; padding: 6px; border-radius: 5px; text-align: center}
  #header .row-2 ul li:hover {background-color: #eeac13 }
  #header .row-2 ul .active {background-color: #eeac13 }
 /* #header .row-2 ul li.last {margin-right:0}
  #header .row-2 ul li a {text-decoration:none;color:#f0f0f0;width:184px;height:56px;float:left;background-image:url(images/nav-bg.gif);background-repeat:no-repeat;background-position:0 0;text-align:center}
  #header .row-2 ul li a:hover, #header .row-2 ul li a.active {color:#d72a18;background-image:url(../src/images/nav-acf)}*/
  /* CONTENT */
  .ic, .ic a {border:0;float:right;background:#f00;color:#f00;width:50%;line-height:10px;font-size:10px;margin:-50% 0 0 0;overflow:hidden;padding:0}
  /* FOOTER */
  #footer .inside {padding:13px 0}
  #footer .inside div{display: flex; justify-content: center; align-items: center; margin: 20px}
  #footer .inside div a i {margin: 8px; font-size: 1.5em}
  #footer .inside div a:nth-child(1) i {color: #3b5998}
  #footer .inside div a:nth-child(2) i {color: #00acee}
  #footer .inside div a:nth-child(3) i {color: #ff3763}
  #footer a {color:#2c6d9a}
  #slogan p {margin-bottom:23px}
  #slogan .inside {padding:36px 0 0 50px;width:320px}
  #content{padding-bottom: 150px}
  #page1 #content .box {margin:0; padding-bottom: 600px}
  #page1 #header .row-2 ul li a {height:59px}
  #page1 #header .row-2 ul li.last a:hover {position:relative;z-index:2}
</style>
