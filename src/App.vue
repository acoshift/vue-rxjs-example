<template>
  <div id="app" class="container">
    <div class="row">
      <h1>Github Search</h1>
    </div>
    <div class="row">
      <input class="u-full-width" placeholder="search..." v-model="search">
    </div>
    <div class="row">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      search: ''
    }
  },
  created () {
    this.$watchAsObservable('search')
      .pluck('newValue')
      .subscribe(
        (q) => {
          this.$router.replace({ name: 'Search', query: { q } })
        }
      )
  }
}
</script>

<style>
#app {
  color: #2c3e50;
  margin-top: 60px;
  text-align: center;
}

input {
  text-align: center;
  font-size: 30px !important;
}
</style>
