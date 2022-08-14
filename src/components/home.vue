<template>
<div>
  <h2>home</h2>
  <router-link to="/home/msg" tag="button">message</router-link>
  <router-link to="/home/news">news</router-link>
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: "home",
  data(){
    return {
      message:'hello',
    }
  },
  created() {
  },
  destroyed() {
  }
}
</script>

<style scoped>

</style>