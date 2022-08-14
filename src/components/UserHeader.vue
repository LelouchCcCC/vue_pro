<template>
  <div>


    <div class="box_fixed">
      <!--         id="boxFixed"-->
      <!--         :class="{'is_fixed' : isFixed}"-->

      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
               background-color="#f3f3f3">
        <el-menu-item index="1" id="daily">
          <router-link to="home">每日更新数据</router-link>
        </el-menu-item>

        <el-menu-item index="2">
          <router-link to="query">密接查询</router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link to="feedback">信息反馈</router-link>
        </el-menu-item>
      </el-menu>

    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "UserHeader",
  data() {
    return {
      activeIndex: '1',
      isFixed: false,
      offsetTop: 0
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    initHeight() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.isFixed = scrollTop > this.offsetTop ? true : false;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.initHeight);
    this.$nextTick(() => {
      this.offsetTop = document.querySelector('#boxFixed').offsetTop;
    })
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style scoped>
#daily {
  width: 200px;
}

.box_fixed {
  position: sticky;
  top: 0;
  z-index: 999;
}

.isFixed {
  position: fixed;
  left: 0px;
  top: 0px;
}

.is_fixed {
  position: fixed;
  top: 0;
  left: 50%;
  margin-left: -250px;
  z-index: 999;
}
</style>