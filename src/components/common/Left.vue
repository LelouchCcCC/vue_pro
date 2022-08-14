<template>
  <div>
    <h2>left</h2>
    <button @click="kk">matao</button>
  </div>

</template>

<script>
import index from '@/components/content/Index';
export default {
  name: "Left",
  components:{
    index
  },
  methods:{
    kk(){
      console.log(this.$refs.aaa)
    }
  }
}
</script>

<style scoped>

</style>