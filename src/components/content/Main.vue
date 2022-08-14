<template>
  <div>
    <Nav/>
    <router-link to="/index"></router-link>
    <router-view></router-view>
  </div>

</template>

<script>
import Nav from '@/components/common/Nav'
import Left from "@/components/common/Left";
import Cfm from "@/components/content/cfm.vue"

export default {
  name: "Main",
  components: {
    Nav,
    Left,
    Cfm
    // MainTarBar
  },
}
</script>

<style scoped>

</style>