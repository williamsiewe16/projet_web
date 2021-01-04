<template>
    <form @submit.prevent="login">
        <div>
            <h2>Identifiez-vous !</h2>
            <div>
                <label>Email: </label>
                <input type="email" v-model="user.email" placeholder="Email" required/>
            </div><br/>
            <div>
                <label>Password: </label>
                <input type="password" v-model="user.password" placeholder="Password" required/>
            </div><br/>
            <input type="submit" value="Valider"/>
            <div>pas encore de compte?<router-link to="/register"><i>  incrivez-vous</i></router-link></div>
        </div>
     </form>
</template>
 
<script>

module.exports = {
  data () {
    return {
        user: {
           email: "",
           password: "", 
        },
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
 
<style>
</style>
