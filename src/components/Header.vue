<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">

        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
          </li>


          <li class="nav-item">
              <router-link class="nav-link active" to="/books">Books</router-link>
          </li>

          <li v-if="store.token !== '' " class="nav-item dropdown">
            <a href="#" id="navBarDropDown" data-bs-toggle="dropdown" class="nav-link dropdown-toggle" aria-expanded="false">
              admin
            </a>
              <ul class="dropdown-menu" aria-labelledby="navBarDropDown">
                <li>
                  <router-link to="/admin/users" class="dropdown-item">Manage users</router-link>
                </li>
                <li>
                  <router-link to="/admin/users/0" class="dropdown-item">Add user</router-link>
                </li>
                <li>
                  <router-link to="/admin/books" class="dropdown-item">Manage books</router-link>
                </li>


                <li>
                  <router-link :to="{name: 'BookEdit', params: {bookId:0}}" class="dropdown-item">Add book</router-link>
                </li>

              </ul>

          </li>



          <li class="nav-item">
            <router-link v-if="store.token == ''"  class="nav-link" to="/login">Login</router-link>
            <a v-else class="nav-link" href="javascript:void(0);" @click="logout">Logout</a>
          </li>
        </ul>

        <span class="navbar-text">{{ store.user.first_name ?? ''}}</span>

      </div>
    </div>
  </nav>
</template>

<script>
import {store} from "@/components/store";
import router from "@/router";
import Security from "@/components/security";

export default {
  name: "Header-component",
  data () {
    return {
      store
    }
  },
  methods: {
    logout () {
      const payload = {
        token: store.token,
      }

      fetch(process.env.VUE_APP_API_URL + '/users/logout', Security.requestOptions(payload))
          .then(res => res.json)
          .then(res => {
            if(res.error){
              console.log(res.message)
              return
            }

            store.token = ""
            store.user = {}

            document.cookie = "_site_data=; Path=/; SameSite=Strict; Secure; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"

            router.push('/login')
          })

    }
  }
}
</script>
