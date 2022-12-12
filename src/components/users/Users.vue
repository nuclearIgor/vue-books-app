<template>
  <div class="container">
    <div class="row">
      <div class="col">

        <h1 class="mt-3">All users</h1>

      </div>

      <hr>

      <table v-if="this.ready" class="table table-compact table-striped">
        <thead>
        <tr>
          <th>User</th>
          <th>Email</th>
          <th>Active</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="u in this.users" v-bind:key="u.id">
            <td>
              <router-link :to="`/admin/users/${u.id}`">{{u.first_name}}, {{u.last_name}}</router-link>
            </td>
            <td>{{u.email}}</td>
            <td v-if="u.active === 1">
              <span class="badge bg-success">Active</span>
            </td>
            <td v-else>
              <span class="badge bg-danger">Inactive</span>
            </td>

            <td v-if="u.token.id > 0">
              <a href="javascript:void(0)">
                <span class="badge bg-success" @click="logUserOut(u.id)">Logged in</span>
              </a>
            </td>

            <td v-else >
              <span class="badge bg-danger">Not logged in</span>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else>loading</p>

    </div>
  </div>
</template>

<script>


import Security from "@/components/security";
import notie from 'notie'
import {store} from "@/components/store";

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms))
// }


export default {
// eslint-disable-next-line vue/multi-word-component-names
  name: "Users",
  data (){
    return {
      users: [],
      ready: false,
      store
    }
  },
  beforeMount() {
    Security.requireToken()

    fetch(process.env.VUE_APP_API_URL + "/admin/users", Security.requestOptions(""))
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            notie.alert({
              type: "error",
              text: res.message
            })
          } else {
            // sleep(1000).then(() => {

            this.users = res.data.users
            this.ready = true
            console.log(res.data)
              // })
          }
        })
        .catch(error => console.log(error))
  },
  methods: {
    logUserOut(id){
      if(id !== store.user.id){
          notie.confirm({
            text: "log this user out?",
            submitText: "Log out",

            submitCallback: () => {
              console.log("logging out user ", id)
              fetch(process.env.VUE_APP_API_URL + "/admin/log-user-out/" + id, Security.requestOptions(""))
                  .then(res => res.json())
                  .then(data => {
                    if (data.error) {
                      // can't this.$emit here using the function(){} syntax because this being a callback it would refer to the window object
                      // es6 () => {} syntax makes "submitCallback inherit "this" and thus would work
                      this.$emit
                      notie.alert({
                        type: "error",
                        text: data.message
                      })
                    } else {
                      notie.alert({
                        type: "success",
                        text: data.message
                      })
                      this.$emit('forceUpdate')
                    }
                  })
            }
          })
      } else {
        this.$emit('error', "you can't log yourself out")
      }

    }
  }
}



</script>

<style scoped>

</style>