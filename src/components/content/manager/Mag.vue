<template>
  <div>
    <Cfm ref="myConfirm"></Cfm>
    <uploader :options="options" class="uploader-example">
      <uploader-unsupport></uploader-unsupport>
	  <div class="panel-header">选择要解析的文件</div>
      <uploader-drop>
        <!-- <p>选择要解析的文件</p> -->
        <br>
        <uploader-btn @click="huidiao">选择文件</uploader-btn>
        <!--      <uploader-btn :attrs="attrs">select images</uploader-btn>-->
        <!--      <uploader-btn :directory="true">select folder</uploader-btn>-->
      </uploader-drop>
      <uploader-list></uploader-list>
      <div class="middle">
        <el-button @click="huidiao">解析</el-button>
      </div>

    </uploader>
    <div v-if="sta" class="sta">
      <h2>数据已提交</h2>
    </div>
    <div v-if="dd.length>0" class="dazhanshi">
      <div class="rgt">
        <button @click="confirm">确认</button>
      </div>
      <div class="zhanshi">
        <label>编号</label>
        <label>地点</label>
        <label>确诊日期</label>
        <label>活动时间</label>
        <label>活动地点</label>
        <div v-for="(item,index1) in dd">
          <div>
            <input type="text" v-for="(it,index2) in item" :value=it @input="dd[index1][index2]=$event.target.value"
                   class="inp">
            <div class="adt" @click="dlt(index1)"></div>
            <br>
            <br>
            <!--          <label class="xiaozhanshi" v-for="it in item">{{ it }}</label>-->
          </div>
        </div>

        <div class="middle middlemi">
          <button @click="add">增加数据</button>
        </div>

      </div>


    </div>

  </div>

</template>

<script>
import Cfm from '@/components/content/cfm.vue'

export default {
  components: {
    Cfm,
  },
  data() {
    return {
      dd: [],
      sta: false,
      options: {
        target: '//127.0.0.1:5000/upload',
        testChunks: false,
        query: {
          sta: localStorage.getItem('status')
        }
      },
      attrs: {
        accept: 'image/*'
      }
    }
  },
  methods: {
    shsh() {
      this.$refs.myConfirm.show('开', this.dd)
    },
    huidiao() {
      let that = this
      this.sta = false
      this.axios({
        method: 'get',
        url: '/huidiao',
      }).then(function (response) {
        console.log('获取数据response:' + response)
        console.log(response.data.kk)
        that.dd = response.data.kk

      }).catch(function (error) {
        console.log(error)
      })
    },
    confirm() {
      let that = this
      this.$refs.myConfirm.show('确认将数据提交？')
      this.axios({
        method: 'get',
        url: '/confirm',
        params: {
          dd: that.dd,
        }
      }).then(function (response) {
        console.log('获取数据response:' + response)
        console.log(response.data.status)
        that.sta = true
        that.dd.splice(0)
      }).catch(function (error) {
        console.log(error)
      })
    },
    dlt(index) {
      this.dd.splice(index, 1)
    },
    add() {
      this.dd.push(['', '', '', '', ''])
    }
  }
}
</script>

<style>
.uploader-example {
  width: 880px;
  padding: 15px;
  margin: 40px auto 0;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .4);
}

.uploader-example .uploader-btn {
  margin-right: 4px;
}

.uploader-example .uploader-list {
  max-height: 440px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
}

.middle {
  text-align: center;
  margin-top: 8px;
}

.sta {
  margin-top: 20px;
  margin-left: 30px;
}

.rgt {
}

.rgt button {
  float: right;
  margin-right: 10px;
  width: 45px;
  height: 29px;
}

.middle button {
 /* height: 35px;
  width: 45px; */
}

.middlemi button {
  width: 65px;
}

.inp {
  width: 150px;
  margin-right: 7.6px;
}

.dazhanshi {

  width: 880px;
  padding: 15px;
  margin: 40px auto 0;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .4);
}

.zhanshi {

  margin-right: 4px;
}

.zhanshi label {
  display: inline-block;
  font-size: 18px;
  width: 157.6px;
  height: 20px;
  margin-bottom: 10px;
}

.adt {
  display: inline-block;
  height: 10px;
  width: 10px;
  background-image: url("../../../assets/img/dlt.png");
  background-size: 100% 100%;
}

.adt:hover {
  cursor: pointer;
}

.panel-header{ 
	border-bottom:solid 1px transparent; 
	padding:8px 15px; font-size:14px; font-weight:700; 
	border-top-left-radius: 5px; 
	border-top-right-radius: 5px;
	border-color:#50BFFF; 
	background-color:#4662D9; color:#fff
}/*面板标题*/

</style>