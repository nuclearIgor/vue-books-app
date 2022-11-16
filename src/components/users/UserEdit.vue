<template>
  <div class="container">
    <div class="row">
      <div class="col">

        <h1 class="mt-3">User tal</h1>

        <hr>

        <form-tag @userEditEvent="submitHandler" name="userform" event="userEditEvent">
          <text-input
            v-model="user.first_name"
            type="text"
            required="true"
            label="First Name"
            :value="user.first_name"
            name="first-name"
          />
          <text-input
            v-model="user.last_name"
            type="text"
            required="true"
            label="Last Name"
            :value="user.last_name"
            name="last-name"
          />
          <text-input
            v-model="user.email"
            type="email"
            required="true"
            label="Email"
            :value="user.email"
            name="email"
          />
          <text-input
            v-if="this.user.id === 0"
            v-model="user.password"
            type="password"
            required="true"
            label="Password"
            :value="user.password"
            name="password"
          />
          <text-input
            v-else
            v-model="user.password"
            type="password"
            label="Password"
            :value="user.password"
            name="password"

            help="Leave empty to keep existing password"
          />

          <div class="form-check">
            <input v-model="user.active" type="radio" class="form-check-input" id="user-active" :value="1">
            <label for="user-active" class="form-check-label">Active</label>
          </div>

          <div class="form-check">
            <input v-model="user.active" type="radio" class="form-check-input" id="user-active-2" :value="0">
            <label for="user-active-2" class="form-check-label">Inactive</label>
          </div>

          <hr>

          <div class="float-start">
            <input type="submit" class="btn btn-primary me-2" value="Save">
            <router-link to="/admin/users" class="btn btn-outline-secondary">Cancel</router-link>
          </div>

          <div class="float-end">
            <a href="javascript:void(0);" v-if="(this.$route.params.userId > 0) &&
              (parseInt(String(this.$route.params.userId), 10) !== store.user.id)"
              class="btn btn-danger"
               @click="confirmDelete(this.user.id)">Delete</a>
          </div>

          <div class="clearfix">

          </div>

        </form-tag>
      </div>
    </div>
  </div>
</template>

<script>
import Security from "@/components/security";
import FormTag from "@/components/forms/FormTag";
import TextInput from "@/components/forms/TextInput";
import notie from 'notie'
import router from "@/router";

import {store} from "@/components/store";

export default {
  name: "UserEdit",
  beforeMount() {
    Security.requireToken()

    if(parseInt(String(this.$route.params.userId), 10) > 0){
    //  edit
      fetch(process.env.VUE_APP_API_URL + "/admin/users/get/" + this.$route.params.userId, Security.requestOptions(""))
          .then(res => res.json())
          .then(data => {
            if (data.error){
              this.$emit('error', data.message)
            } else {
              this.user = data
            //  password should be empty for existing users
              this.user.password = ""
            }
          })
    }

  },
  data () {
    return {
      user: {
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        active: 0
      },
      store,
    }
  },
  components: {
    'form-tag': FormTag,
    'text-input': TextInput,
  },
  methods: {
    submitHandler (){
      const payload = {
        id: parseInt(String(this.$route.params.userId), 10),
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        password: this.user.password,
        active: this.user.active
      }

      fetch(`${process.env.VUE_APP_API_URL}/admin/users/save`, Security.requestOptions(payload))
          .then(res => res.json())
          .then(data => {
            if(data.error){
              this.$emit('error', data.message)
            } else {
              this.$emit('success', "Changes saved")
              router.push("/admin/users")
            }
          })
          .catch(error => {
            this.$emit('error', error)
          })
    },
    confirmDelete(id){
      console.log(id)
      notie.confirm({
        text: "Are you sure?",
        submitText: "Delete",
        submitCallback: function () {
          console.log('deletando', id)

          let payload = {
            id,
          }

          fetch(process.env.VUE_APP_API_URL + "/admin/users/delete", Security.requestOptions(payload))
              .then(res => res.json())
              .then(data => {
                if (data.error) {
                  this.$emit('error', data.message)
                } else {
                  this.$emit('success', "User deleted")
                  router.push("/admin/users")
                }
              })

        }
      })
    },
  },
}
</script>

<style scoped>

</style>