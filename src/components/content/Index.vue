<template>
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>中国新冠肺炎流调溯源</title>
  </head>
  <body>

  <div>
    <div class="pp">
      <h2>全国近7天内有疫情的城市（数据为3月5日前搜集的数据）</h2>
    </div>
	<el-row :gutter="12" class="onmus">
	  <el-col :span="6" class="myCard" v-for="(item,index) in dd">
	    <el-card shadow="hover" class="subCard">
	      <router-link :to="'/city/'+city_name[index]">
	        <div :class="city_name[index]">
	          <p>{{ item[0][0] }}</p>
			  <!-- <el-divider></el-divider> -->
	          <p>{{ item[0][1] }}</p>
	          <p>{{ item[1] }}</p>
	        </div>
	      </router-link>
	      <router-view></router-view>
	    </el-card>
	  </el-col>
	</el-row>
  </div>


  </body>
  </html>
</template>

<script>
import {pinyin} from "pinyin-pro";
import {getTst} from "../../../api/data";

export default {
  name: "Index",
  data() {
    return {
      dd: [],
      city_name: [],
    }
  },
  methods: {},
  mounted: function () {
    //这里放获取json数据
    let that = this
    getTst().then(function (response) {
      console.log('获取数据response:' + response)
      const dd = response.data.key
      that.dd = dd
      for (let i of that.dd) {
        that.city_name.push(pinyin(i[0][0], {toneType: 'none'}).replace(/\s*/g, ""))
      }
      // console.log(that.city_name)
      // console.log('books:' + JSON.stringify(that.bodys, null, 4))
    }).catch(function (error) {
      console.log(error)
    })
  }

}
</script>

<style scoped>


table, th, td {
  border: 1px solid black;
  cellpadding: 1px;
  cellspacing: 1px;
  text-align: center;
}

table {
  width: 100%;
}

p {
  text-align: center;
  line-height: 200%;
}

#body {
  width: 950px;
  margin: auto;
}
.pp {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
}
.disp {
  margin: 10px 25px;
}

.disp ul {
  /*float: left;*/
  overflow: hidden;
  display: inline-block;
}

.disp ul li {
  height: fit-content;
  width: 300px;
  margin-right: 30px;
  margin-bottom: 30px;
  background-color: #666666;
  /*float: left;*/
  float: left;
  transition: all 0.9ms;
  color: black;
  border-radius: 10px;
}

.onmus:hover {
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  /*margin-top: 90px;*/
}

.router-link-active {
  text-decoration: none;
  color: #fff;
}

a {
  text-decoration: none;
  color: black;
}

.myCard {
	margin-top: 20px;
}

.subCard {
	background-color: #F8F9FA;
}
</style>