<template>
  <div id="nav">
    <!-- <router-link :to="{ name: 'home' }">Home</router-link> -->
    <router-link :to="{ name: 'tv1' }">TV 1</router-link>
    <router-link :to="{ name: 'tv2' }">TV 2</router-link>
    <router-link :to="{ name: 'tv3' }">TV 3</router-link>
    <router-link :to="{ name: 'tv4' }">TV 4</router-link>
    <router-link :to="{ name: 'tv5' }">TV 5</router-link>
    <router-link :to="{ name: 'resultsTV' }">Results TV</router-link>
  </div>
</template>

<style scoped>

#nav {
  padding: 0px;
}

#nav a {
  font-weight: bold;
  color: white;
  padding: 0 10px;
}

#nav a.router-link-exact-active {
  color: white;
}
</style>
