<template>
  <div >
<!--    <user-header class="box_fixed"-->
<!--                 id="boxFixed"-->
<!--                 :class="{'is_fixed' : isFixed}"></user-header>-->
    <user-header></user-header>


  </div>

</template>

<script>

import UserHeader from "@/components/UserHeader";

export default {
  name: "UserHome",
  components: {
    UserHeader
  },
  data() {
    return {
      isFixed: false,
      offsetTop: 0
    }
  },
  mounted() {
  },
  methods: {
  },
}
</script>

<style scoped>

#building {
  /*background: url("../../src/pic/loginBack.jpg");*/

  /*position: sticky;*/
  /*top: 0;*/

  /*background-size: 100% 100%;*/
  /*color: black;*/
}

.is_fixed {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.isFixed {
	position: fixed;
	left: 0px;
	top: 0px;
}
</style>