<template>
  <div>
    <div :v-if="left.length>0" class="lef">
      <div v-for="(item,index) in city_name" class="ll">
        <router-link :to="'/city/'+city_name[index]" @click.native="flash">
          <p>{{ left[index] }}</p>
          <el-divider></el-divider>
        </router-link>
      </div>
    </div>
    <!--    <div>
      <br>
    </div> -->

    <!--    <div class="crt"><strong><p>{{ curt_city }}</p></strong></div>-->
    <div style="width: 1000px;height: 800px" id="main" class="one" @click=""></div>
    <div v-if="mm.length==0" class="els">
      <br>
      <h3>暂无确诊人员外出情况</h3>
    </div>
    <div class="dadazhanshi" v-if="mm.length!=0">
      <div>
        <h2 class="hh2">本市有其他省市旅居史确诊人员的流调信息</h2>
      </div>

      <!-- v-for="(item,index) in mm" style="float: left; margin-top: 0px;"> -->

      <div class="panel panel-default myPanel panel-primary"
           v-for="(item,index) in mm">
        <div class="panel-header">编号:{{ item[0][0] }}&nbsp&nbsp确诊日期:{{ item[0][1] }}</div>
        <div class="panel-body">
          <a style="font-size: 14px">日期</a>
          <a style="font-size: 14px" class="zhongback">地点</a>

          <p v-for="i in item">
            <a>{{ i[2] }}</a>
            <a class="bigback">{{ i[3] }}</a>
          </p>
        </div>
      </div>


      <!-- <el-row :gutter="12" class="onmus"> -->
      <!-- <el-col :span="6" class="myCard" v-for="(item,index) in mm"> -->
      <!-- <el-card shadow="hover" class="subCard" style="margin-top: 0px;"> -->
      <!-- <p>编号:{{ item[0][0] }}</p> -->
      <!-- <el-divider></el-divider> -->
      <!-- <p>确诊日期:{{ item[0][1] }}</p> -->
      <!-- <a style="font-size: 14px">日期</a> -->
      <!-- <a style="font-size: 14px" class="zhongback">地点</a> -->

      <!-- <p v-for="i in item"> -->
      <!-- <a>{{ i[2] }}</a> -->
      <!-- <a class="bigback">{{ i[3] }}</a> -->
      <!-- </p> -->
      <!-- <router-view></router-view> -->
      <!-- </el-card> -->
      <!-- </el-col> -->
      <!-- </el-row> -->
      <!-- <ul>
        <li v-for="(item,index) in mm" class="dazhanshi" id="forli">
          <a style="font-size: 18px">编号:{{ item[0][0] }}</a>
          <a style="font-size: 18px" class="back">确诊日期:{{ item[0][1] }}</a>
          <br>
          <br>
          <div>
            <a style="font-size: 14px">日期</a>
            <a style="font-size: 14px" class="zhongback">地点</a>

            <p v-for="i in item">
              <a>{{ i[2] }}</a>
              <a class="bigback">{{ i[3] }}</a>
            </p>
          </div>
        </li>
      </ul> -->
    </div>
  </div>

</template>
<script>
import {
  pinyin
} from "pinyin-pro";
import {getOnec} from "../../../../api/data";
import {MP} from './map.js'

export default {
  name: 'MainCity',
  data() {
    return {
      data: [],
      geoCoordMap: {},
      ok: ['esc'],
      status: false,
      left: [],
      city_name: [],
      curt_city: '',
      mm: [],
      select_data: [],
    }
  },
  computed: {
    cityName() {
      return (this.$route.params.cityname)
    }
  },
  methods: {
    flash() {
      this.$router.go(0)
    },
    dazhanshi(event) {
      // this.select_data.splice(0)
      console.log(event)
      let testLi = document.getElementById('forli').getElementsByTagName('li');
      for (let i = 0; i < testLi.length; i++) {
        testLi[i].addEventListener("click", function (num) {
          return function () {
            console.log(this.dd[i]);
          }
        }(i))
      }
    },
    convertData() {
      const res = [];
      for (let i = 0; i < this.data.length; i++) {
        let geoCoord = this.geoCoordMap[this.data[i].name];
        if (geoCoord) {
          res.push({
            name: this.data[i].name,
            value: geoCoord.concat(this.data[i].value)
          });
        }
      }
      // console.log(res)
      return res;
    },
  },
  mounted() {
    //这里放获取json数据
    const that = this;
    getOnec({cityName: this.cityName}).then(function (response) {
      const dd = response.data.data
      const ge = response.data.geo
      const left = response.data.left
      const val = response.data.val
      const mm = response.data.mm
      that.left = left
      for (let i of that.left) {
        that.city_name.push(pinyin(i, {
          toneType: 'none'
        }).replace(/\s*/g, ""))
      }
      that.data = dd
      that.geoCoordMap = ge
      that.curt_city = val
      that.mm = mm

      that.$nextTick(() => {
        setTimeout(() => {
		// 方法区
          MP().then(() => {
          const chartDom = document.getElementById('main');
          const myChart = that.$echarts.init(chartDom);
          myChart.setOption({
            title: {
              left: 'center',
              text: that.curt_city
            },
            tooltip: {
              trigger: 'item'
            },
            bmap: {
              center: [104.114129, 37.550339],
              zoom: 5,
              roam: true,
              mapStyle: {
                styleJson: [{
                  featureType: 'water',
                  elementType: 'all',
                  stylers: {
                    color: '#d1d1d1'
                  }
                },
                  {
                    featureType: 'land',
                    elementType: 'all',
                    stylers: {
                      color: '#f3f3f3'
                    }
                  },
                  {
                    featureType: 'railway',
                    elementType: 'all',
                    stylers: {
                      visibility: 'off'
                    }
                  },
                  {
                    featureType: 'highway',
                    elementType: 'all',
                    stylers: {
                      color: '#fdfdfd'
                    }
                  },
                  {
                    featureType: 'highway',
                    elementType: 'labels',
                    stylers: {
                      visibility: 'off'
                    }
                  },
                  {
                    featureType: 'arterial',
                    elementType: 'geometry',
                    stylers: {
                      color: '#fefefe'
                    }
                  },
                  {
                    featureType: 'arterial',
                    elementType: 'geometry.fill',
                    stylers: {
                      color: '#fefefe'
                    }
                  },
                  {
                    featureType: 'poi',
                    elementType: 'all',
                    stylers: {
                      visibility: 'off'
                    }
                  },
                  {
                    featureType: 'green',
                    elementType: 'all',
                    stylers: {
                      visibility: 'off'
                    }
                  },
                  {
                    featureType: 'subway',
                    elementType: 'all',
                    stylers: {
                      visibility: 'off'
                    }
                  },
                  {
                    featureType: 'manmade',
                    elementType: 'all',
                    stylers: {
                      color: '#d1d1d1'
                    }
                  },
                  {
                    featureType: 'local',
                    elementType: 'all',
                    stylers: {
                      color: '#d1d1d1'
                    }
                  },
                  {
                    featureType: 'arterial',
                    elementType: 'labels',
                    stylers: {
                      visibility: 'off'
                    }
                  },
                  {
                    featureType: 'boundary',
                    elementType: 'all',
                    stylers: {
                      color: '#fefefe'
                    }
                  },
                  {
                    featureType: 'building',
                    elementType: 'all',
                    stylers: {
                      color: '#d1d1d1'
                    }
                  },
                  {
                    featureType: 'label',
                    elementType: 'labels.text.fill',
                    stylers: {
                      color: '#999999'
                    }
                  }
                ]
              }
            },
            series: [{
              name: 'pm2.5',
              type: 'scatter',
              coordinateSystem: 'bmap',
              data: that.convertData(that.data),

              symbolSize: function (val) {
                return Math.min(Math.max(7, val[2] * 3), 20);
              },
              encode: {
                value: 2
              },
              label: {
                formatter: '{b}',
                position: 'right',
                show: false
              },
              emphasis: {
                label: {
                  show: true
                }
              }
            },
              // {
              //   name: 'Top 5',
              //   type: 'effectScatter',
              //   coordinateSystem: 'bmap',
              //   data: this.convertData(
              //       this.data
              //           .sort(function (a, b) {
              //             return b.value - a.value;
              //           })
              //           .slice(0, 6)
              //   ),
              //   symbolSize: function (val) {
              //     return val[2] / 10;
              //   },
              //   encode: {
              //     value: 2
              //   },
              //   showEffectOn: 'render',
              //   rippleEffect: {
              //     brushType: 'stroke'
              //   },
              //   label: {
              //     formatter: '{b}',
              //     position: 'right',
              //     show: true
              //   },
              //   itemStyle: {
              //     shadowBlur: 10,
              //     shadowColor: '#333'
              //   },
              //   emphasis: {
              //     scale: true
              //   },
              //   zlevel: 1
              // }
            ]
          })
        })
	}, 5000);

      })
    }).catch(function (error) {
      console.log(error)
    })
  },

}
</script>

<style scoped>
.one {
  /* margin: 25px 25px; */
  margin-left: 150px;
}


.lef {
  padding: 0;
  /*position: fixed;*/
  float: left;
  top: 0;
  z-index: -1;
  bottom: 0;
  width: 150px;
  height: 800px;
  background-color: #EBEBEB;
  /*pointer-events:none;*/
  overflow: scroll
}

.ll {
  margin-left: 10px;
  text-align: left;
  size: 16px;
  /* margin-top: 5px; */
  margin-bottom: 15px;
  color: black;
  /*pointer-events:none;*/
  /*overflow:hidden*/

}

.ll:first-child {
  margin-top: 70px;
}

a {
  text-decoration: none;
  color: black;
}

.crt {
  text-align: center;
  margin-left: 75px;
}

.crt p {
  size: 30px;
}

.dadazhanshi {
  width: 95%;
  height: auto;
}

.dazhanshi {

  width: 500px;
  padding: 15px;
  left: 50%;
  margin: 40px auto 0;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .4);
}

.dazhanshi:hover {
  cursor: pointer;
}

.dadazhanshi {
  margin: 10px 25px;
}


.dadazhanshi ul {
  /*float: left;*/
  overflow: hidden;
  zoom: 1;
}

.dadazhanshi ul li {
  height: fit-content;

  /*float: left;*/
  float: left;
  width: 500px;
  padding: 15px;
  left: 50%;
  margin-left: 80px;
  margin-right: 100px;
  margin-top: 40px;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .4);
}

.zhanshi {

  margin-right: 4px;
}

.back {
  margin-left: 45px;

}

.zhongback {
  margin-left: 60px;
}

.bigback {
  margin-left: 30px;
  line-height: 135%;
}

.els {
  text-align: center;
}

.hh2 {
  text-align: center;
  font-size: 22px;
  color: #555555;
}

.myCity {
  color: #283443;
  padding-left: 20px;
}

.el-divider--horizontal {
  margin: 20px 0;
  /* background: 0 0; */
  /* border-top: 1px dashed #e8eaec; */
}

.myCard {
  margin-top: 20px;
}

.subCard {
  background-color: #F8F9FA;
}

.panel {
  background-color: #fff;
  border: solid 1px transparent
}

.panel-header {
  border-bottom: solid 1px transparent;
  padding: 8px 15px;
  font-size: 14px;
  font-weight: 700;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

/*面板标题*/
.panel-body {
  padding: 15px;
  height: 350px;
  overflow: scroll;
}

/*面板内容*/
.panel-footer {
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
  padding: 5px 20px
}

/*面板页脚*/
/*默认面板*/
.panel-default {
  border-color: #ddd
}

.panel-default > .panel-header {
  border-color: #ddd;
  background-color: #f5f5f5;
  color: #444
}

/*主要面板*/
.panel-primary {
  border-color: #5a98de
}

.panel-primary > .panel-header {
  border-color: #5a98de;
  background-color: #5a98de;
  color: #fff
}

/*次要面板*/
.panel-secondary {
  border-color: #3bb4f2
}

.panel-secondary > .panel-header {
  border-color: #3bb4f2;
  background-color: #3bb4f2;
  color: #fff
}

/*成功面板*/
.panel-success {
  border-color: #5eb95e
}

.panel-success > .panel-header {
  border-color: #5eb95e;
  background-color: #5eb95e;
  color: #fff
}

/*警告面板*/
.panel-warning {
  border-color: #f37b1d
}

.panel-warning > .panel-header {
  border-color: #f37b1d;
  background-color: #f37b1d;
  color: #fff
}

/*危险面板*/
.panel-danger {
  border-color: #dd514c
}

.panel-danger > .panel-header {
  border-color: #dd514c;
  background-color: #dd514c;
  color: #fff
}

.myPanel {
  width: 300px;
  /* height: 350px;
  overflow: scroll; */
  margin-left: 20px;
  float: left;
  margin-top: 15px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

</style>
