<template>
  <div>
    <el-row class="home" :gutter="20" id="quan">
      <el-col :offset="1" :span="2">
        <el-card class="left_xi"></el-card>
      </el-col>
      <el-col :span="14">
        <el-card shadow="hover" class="SpiderDaily">
          <el-header>
            <div class="LeftHeader">
              <el-col :span="20">
                <p>{{ nowDate }}全国目前疫情最新状况 </p>
              </el-col>
              <el-col :span="4">
                <p style="display: inline-block;float: right">更多信息</p>
              </el-col>
            </div>
          </el-header>
          <el-col :span="20">
            <el-card shadow="none" id="RiQi">
              <el-table
                  :data="tableData"
                  style="width: 100%"
                  stripe
                  border
                  class="show_table">
                <el-table-column
                    prop="province"
                    label="省市地区"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="total"
                    label="本日新增"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="foreign"
                    label="境外新增">
                </el-table-column>
                <el-table-column
                    prop="local"
                    label="境内新增">
                </el-table-column>

              </el-table>
              <div class="blank" style="height: 10px"></div>

            </el-card>
          </el-col>

        </el-card>
        <p></p>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" style="height: 300px">
          <el-header>
            <div class="LeftHeader2">
              <el-col :span="20">
                <p>国家卫健委公告 </p>
              </el-col>
              <el-col :span="4">
                <p style="display: inline-block;float: right">更多公告</p>
              </el-col>
            </div>

          </el-header>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import {getHome} from "../../api/data";

export default {
  name: "UserMax",
  data() {
    return {
      isFixed: false,
      offsetTop: 500,
      nowDate: '',
      tableData: []
    }
  },
  mounted() {
    this.day()
    getHome().then(res => {
      this.tableData = res.data
    })
    this.$nextTick(() => {
      this.offsetTop = document.querySelector('#boxFixed').offsetTop;
    })
  },
  methods: {
    initHeight() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.isFixed = scrollTop > this.offsetTop ? true : false;
    },
    day() {
      let nowDate = new Date();
      let date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        day: nowDate.getDate(),
      }
      this.nowDate = date.year + '年' + (date.month >= 10 ? date.month : '0' + date.month) + '月' + (date.day >= 10 ? date.day : '0' + date.day) + '日 '
    },
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style scoped>
.show_table {
  height: 100%;
  overflow: hidden;
}


.el-card {
  height: 100%;
}

.SpiderDaily {
  /*height: 400px;*/
}

#RiQi {
  text-align: left;
  font-size: 16px;


}

.LeftHeader {
  /*float: left;*/
  text-align: left;
}

.LeftHeader2 {
  text-align: left;
  position: sticky;
  top: 50px;
}

.isFixed {
  position: fixed;
  left: 0px;
  top: 0px;
}

.is_fixed {
  position: fixed;
  top: 0;
  z-index: 999;
}

.left_xi {
  height: 500px;
}
</style>