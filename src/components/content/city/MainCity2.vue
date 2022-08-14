<template>
  <div>
    <h2>{{ cityName }}</h2>
    <div style="width: 1000px;height: 650px" id="main"></div>

    <!--    <h2>{{cityNm}}</h2>-->
  </div>

</template>
<!--<script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&ak=aYNu34AYwt3QTaApv4nNH5tSAxe7NIGe&callback=init"></script>-->
<script>
import {getLks} from "../../../../api/data";
import {pinyin} from "pinyin-pro";
import {MP} from "@/components/content/city/map";

export default {
  name: 'MainCity',
  data() {
    return {
      data: [],
      geoCoordMap: {},
      ok: ['esc'],
      status: false,
    }
  },
  computed: {
    cityName() {
      console.log(this.$route.params.cityname);
    }
  },
  methods: {
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
  beforeMount() {
    //这里放获取json数据
    const that = this

    getLks().then(function (response) {
      console.log('获取数据response:' + response)
      const dd = response.data.data
      const ge = response.data.geo
      that.data = dd
      that.geoCoordMap = ge
      // console.log(that.data)
      // console.log(that.geoCoordMap);
      const chartDom = document.getElementById('main');
      const myChart = that.$echarts.init(chartDom);
	  window.onresize = function (ec) { // 监听窗口大小变化
	          // console.log(ec)
	          myChart.resize()       // 自适应大小变化
	      }
      that.$nextTick(() => {
        MP().then(() => {
        myChart.setOption(
            {
              title: {
                text: '确诊人员流调信息',
                subtext: '',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              bmap: {
                center: [104.114129, 37.550339],
                zoom: 5,
                roam: true,
                mapStyle: {
                  styleJson: [
                    {
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
              series: [
                {
                  name: 'pm2.5',
                  type: 'scatter',
                  coordinateSystem: 'bmap',
                  data: that.convertData(that.data),
                  symbolSize: function (val) {
                    return Math.min(Math.max(7, val[2] * 3), 20);
                  },
                  // symbolSize: function (val) {
                  //   return val[1] / 10;
                  // },
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
            }
        )
      })
        })
    }).catch(function (error) {
      console.log(error)
    })
  },

}
</script>

<style scoped>

</style>