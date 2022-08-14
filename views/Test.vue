<template>
  <div class="get-bounding">
    <div class="box">
      <h4>吸顶测试</h4>
      <h4>吸顶测试</h4>
      <h4>吸顶测试</h4>
      <h4>吸顶测试</h4>
      <h4>吸顶测试</h4>
      <h4>吸顶测试</h4>
      <h4>吸顶测试</h4>
      <h4>吸顶测试</h4>
      <div class="box_fixed"
           id="boxFixed"
           :class="{'is_fixed' : isFixed}">
        我是来测试的、哇咔咔
      </div>
      <h3>快下来</h3>
      <h4>吸顶测试</h4>
      <h4>吸顶测试</h4>
      <h4>吸顶测试</h4>
      <h4>吸顶测试</h4>
      <h4>吸顶测试</h4>
      <h4>吸顶测试</h4>
      <h4>吸顶测试</h4>
      <h4>吸顶测试</h4>
      <h4>吸顶测试</h4>
      <h4>吸顶测试</h4>
      <h4>吸顶测试</h4>
      <h4>吸顶测试</h4>
      <h4>吸顶测试</h4>
      <h4>吸顶测试</h4>
      <h4>吸顶测试</h4>
      <h4>吸顶测试</h4>
      <h4>吸顶测试</h4>
      <h4>吸顶测试</h4>
      <h4>吸顶测试</h4>
    </div>
    <!-- <div class="pride_tab isFixed"
         v-show="headerFixed"
         id="pride_tab_fixed">
      <div class="pride_tab">
        <ul class="imgs-list">
          <li v-for="(item,index) in list"
              :key="index"
              class="list-img"><img :src="item"
                 alt=""></li>
        </ul>
      </div>
    </div> -->
    <div class="blank-green">随便了，反正是就是一段空白</div>
  </div>
</template>
<script>
export default {
  name:'Test',
  data () {
    return {
      isFixed: false,
      offsetTop: 0
    }
  },
  mounted () {
    window.addEventListener('scroll', this.initHeight);
    this.$nextTick(() => {
      this.offsetTop = document.querySelector('#boxFixed').offsetTop;
    })
  },
  methods: {
    initHeight () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.isFixed = scrollTop > this.offsetTop ? true : false;
    },
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
}

</script>
<style lang="scss" scoped>
.isFixed {
	position: fixed;
	left: 0px;
	top: 0px;
}
.blank {
	height: 660px;
	background: red;
	width: 100%;
}
.blank-green {
	height: 660px;
	background: green;
	width: 100%;
}
.imgs-list {
	display: flex;
	height: 60px;
	.list-img {
		img {
			height: 60px;
			object-fit: contain;
		}
	}
}
.box_fixed {
	width: 500px;
	height: 40px;
	border: 2px dashed pink;
	border-radius: 20px;
	margin: 0 auto;
	line-height: 40px;
	background: #eee;
}
.is_fixed {
	position: fixed;
	top: 0;
	left: 50%;
	margin-left: -250px;
	z-index: 999;
}
</style>
