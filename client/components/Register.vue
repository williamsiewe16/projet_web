<template>
    <form @submit.prevent="register">
        <div>
            <h2>Inscription</h2>
            <div>
                <label>Email: </label>
                <input type="email" v-model="user.email" placeholder="Email" required/>
            </div><br/>
            <div>
                <label>Password: </label>
                <input type="password" v-model="user.password" placeholder="Password" required/>
            </div><br/>
            <input type="submit" value="Valider"/>
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
        register () {
            if(this.user.email != "" && this.user.password != ""){
                this.$emit('register', this.user)
            }else{
                alert("remplissez tous les champs")
            }
         },
  }
}
</script>
 
<style>
</style>
