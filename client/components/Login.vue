<template>
    <div>
        <div class="limiter">
            <div class="container-login100">
                <div class="wrap-login100">
                    <form class="login100-form validate-form" @submit.prevent="login">
					    <span class="login100-form-title p-b-34">
					    	CONNEXION
					    </span>

                        <!-- Email -->
                        <div class="wrap-input100 validate-input m-b-20" data-validate="Type Email">
                            <input v-model="user.email" class="input100" type="text" name="email" placeholder="Email">
                            <span class="focus-input100"></span>
                        </div>

                        <!-- Mot de passe -->
                        <div class="wrap-input100 validate-input m-b-20" data-validate="Type password">
                            <input v-model="user.password" class="input100" type="password" name="pass" placeholder="Mot de passe">
                            <span class="focus-input100"></span>
                        </div>

                        <div class="container-login100-form-btn">
                            <button class="login100-form-btn">
                                VALIDER
                            </button>
                        </div>

                        <div class="w-full text-center p-t-27 p-b-239">
						    <span class="txt1">
						    	Pas encore de compte ?
						    </span>
                            <router-link to="/register" class="txt2">
                                Inscrivez-vous
                            </router-link>
                        </div>
                    </form>

                    <div class="login100-more" :style="'background-image: url(\'../src/images/pexels-clem-onojeghuo-375885.jpg\')'"></div>
                </div>
            </div>
        </div>
        <div class="notification is-danger is-light alert_" v-show="alert.display">
            <button class="delete"></button>
            Primar lorem ipsum dolor sit amet, consectetur
            adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Sit amet,
            consectetur adipiscing elit
        </div>
    </div>
</template>
 
<script>

module.exports = {
  data () {
    return {
        user: {
           email: "",
           password: "", 
        },
        alert: {
            display: false,
        }
    }
  },
  methods: {
        login () {
            if(this.user.email != "" && this.user.password != ""){
                this.$emit('login', this.user)
            }else{
                alert("remplissez tous les champs")
            }
         },
  }
}
</script>
 
<style scoped>

</style>
