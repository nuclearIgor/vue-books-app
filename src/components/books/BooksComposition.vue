<template>
<!--  must remove all references to 'this'-->
  <div class="container">
    <div class="row">
      <div class="col">

        <h1 class="mt-3">books</h1>

        <hr>

        <div class="filters text-center">
          <span class="filter me-1" v-bind:class="{active: currentFilter === 0}" v-on:click="setFilter(0)">All</span>
          <span class="filter me-1" v-bind:class="{active: currentFilter === 1}" @click="setFilter(1)">Science Fiction</span>
          <span class="filter me-1" v-bind:class="{active: currentFilter === 2}" @click="setFilter(2)">Fantasy</span>
          <span class="filter me-1" v-bind:class="{active: currentFilter === 3}" @click="setFilter(3)">Romance</span>
          <span class="filter me-1" v-bind:class="{active: currentFilter === 4}" @click="setFilter(4)">Thriller</span>
          <span class="filter me-1" v-bind:class="{active: currentFilter === 5}" @click="setFilter(5)">Mystery</span>
          <span class="filter me-1" v-bind:class="{active: currentFilter === 6}" @click="setFilter(6)">Horror</span>
          <span class="filter me-1" v-bind:class="{active: currentFilter === 7}" @click="setFilter(7)">Classic</span>
        </div>

        <hr>

        <div>
          <div class="card-group">

            <!--            transition-group must be the wrapping element -->
            <transition-group class="p-3 d-flex flex-wrap" tag="div" appear name="books">


              <div v-for="b in books" :key="b.id">
                <div class="card me-2 ms-1 mb-3" style="width: 10rem;"
                     v-if="b.genres.some(item => item.id == currentFilter)  || currentFilter === 0">

                  <router-link :to="`/books/${b.slug}`">
                    <img  class="card-img-top"
                          :src="`${imgPath}/covers/${b.slug}.jpg`"
                          :alt="`cover for ${b.title}`">
                  </router-link>

                  <div class="card-body text-center">
                    <h6 class="card-title">{{b.title}}</h6>
                    <span class="book-author">{{b.author.author_name}}</span>

                    <br>
                    <small class="text-muted book-genre" v-for="(g, index) in b.genres" v-bind:key="g.id">
                      <em class="me-1">{{g.genre_name}}
                        <template v-if="index !== (b.genres.length -1)">,</template>
                      </em>
                    </small>
                  </div>
                </div>
              </div>
            </transition-group>


          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {ref, onMounted} from "vue";

export default {
  name: "BooksComposition",
  emits: ["error"],
  props: {},

  setup(props, ctx) {
    //setup state
    let ready = ref(false)
    let currentFilter = ref(0)
    const imgPath = ref(process.env.VUE_APP_IMAGE_URL)
    let books = ref({})

  //  use onMounted lifecycle hook to get books
    onMounted(() => {
      console.log('composition component')
      fetch(process.env.VUE_APP_API_URL + '/books')
          .then(response => response.json())
          .then(data => {
            if (data.error) {
              ctx.emit('error', data.message)
            } else {
              books.value = data.data.books
              ready.value = true
            }
          }).catch(err => {
              ctx.emit('error', err)
      })
    })


    function setFilter (filter) {
      currentFilter.value = filter
    }


    // return data and methods
    return {
      currentFilter,
      imgPath,
      books,
      setFilter,
      ready
    }

  }
}
</script>


<style scoped>
.filters {
  height: 2.5em;
}

.filter {
  padding: 6px;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.35s;
  border: 1px solid silver;
}

.filter.active {
  background: lightgreen;
}

.filter:hover {
  background: lightgray;
}

.book-author, .book-genre {
  font-size: 0.8em;
}
/*  transition styles */
.books-move {
  transition: all 500ms ease-in-out 50ms;
}
.books-enter-active {
  transition: all 500ms ease-in-out;
}
.books-leave-active {
  transition: all 500ms ease-in;
}
.books-enter, .books-leave-to {
  opacity: 0;
}

</style>