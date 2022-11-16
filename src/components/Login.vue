<template>
  <div class="container">
    <div class="row">
      <div class="col">
        
        <h1 class="mt-5">Login</h1>
        <hr>
        <form-tag v-on:myevent="submitHandler" name="myform" event="myevent" >
          <text-input
              v-model="email"

              label="Email"
              type="email"
              name="email"
              required="true"
          />
          <text-input
              v-model="password"

              label="Password"
              type="password"
              name="password"
              required="true"
          />
          <hr>
          Email: {{email}}
          Password: {{password}}
          <hr>
          <input type="submit" value="Login" class="btn btn-primary">
        </form-tag>


      </div>
    </div>
  </div>
</template>

<script>
import TextInput from "@/components/forms/TextInput";
import FormTag from "@/components/forms/FormTag";
import {store} from "@/components/store";
import router from "@/router";
import notie from 'notie'
import Security from "@/components/security";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  components: {
    TextInput,
    FormTag
  },
  data () {
    return {
      email: "",
      password: "",
      store,
    }
  },
  methods: {
    submitHandler(){

      const payload = {
        email: this.email,
        password: this.password,
      }

      //
      // const requestOptions = {
      //   method: "POST",
      //   body: JSON.stringify(payload),
      // }

      fetch(process.env.VUE_APP_API_URL + "/users/login", Security.requestOptions(payload))
          .then(res => res.json())
          .then(response => {
            if (response.error) {
              notie.alert({
                type: 'error',
                text: response.message,

              })
              return
            }

            store.token = response.data.token.token
            // store.user = response.data.user

            store.user = {
              id: response.data.user.id,
              first_name: response.data.user.first_name,
              last_name: response.data.user.last_name,
              email: response.data.user.email,
            }

            let date = new Date()
            let expDays = 1
            date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000))

            const expires = "expires=" + date.toUTCString()

            document.cookie = "_site_data="
            + JSON.stringify(response.data)
            + ";"
            + expires
            + "; path=/; SameSite=strict; Secure;"


            router.push('/')
          })

    },
  },
}
</script>

<style scoped>

</style>
