<template>
  <div id="bgpic" :style="bgg">
    <div>
      <!-- <button @click="switch1">点击切换查询方式</button> -->
      <el-button type="primary" @click="switch1" plain>点击切换查询方式</el-button>
      <br>
      <div v-if="isu" class="change">
        <h1>自述经历</h1>
        <br>
        <div class="sheng">
          <label style="font-size: 20px;">您目前生活的城市（仅填写一个）:</label>
          <!-- <input type="text" :value="city" @input='city = $event.target.value'> -->
          <!-- <el-label -->
          <el-input :rows="10" style="display:inline; margin-left: 0%;" v-model="city" placeholder="请输入城市名称">
          </el-input>
        </div>
        <br>
        <br>
        <div>
          <!-- <textarea name="summary" id="zishujingli" rows="7" cols="90" :value="ak1"
                  @input='ak1 = $event.target.value' placeholder="此处请填写您最近的行动"></textarea> -->
          <el-input type="textarea" :rows="5" placeholder="此处请填写您最近的行动" v-model="ak1">
          </el-input>

          <!--      <input type="text" id="zishujingli" key="experience" :value="ak1" @input='ak1 = $event.target.value'>-->
        </div>

        <br>
        <div class="lab">
          <h2 style="font-size: 22px">填写格式如下所示</h2>
          <br>
          <label>2月8日，12:30到苏州大学附属儿童医院总院后回家。<br>
            2月9-11日，居家。<br>
            2月12日，9：10到苏州大学附属儿童医院总院后回家。<br>
            2月13日，8:13打车前往市立医院本部呼吸科门诊，15：00至万科美好荟华润超市和全家超市后回家。<br>
            2月14日，集中隔离。<br>
            2月15日，核酸检测阳性后，闭环转运至市定点医疗机构隔离治疗。</label>
          <br>
        </div>

        <div class="tijiao">
          <!-- <button @click="commit1" v-if="!show_more">提交</button> -->
          <el-button type="primary" @click="commit1" v-if="!show_more" plain>提交</el-button>
        </div>
        <div class="liubai">
          <br>
        </div>
      </div>

      <div v-else class="change">
        <div class="changee">
          <div class="tocent">
            <!-- <button @click="add">增加一条数据</button> -->
            <el-button @click="add" type="info" plain>增加一条数据</el-button>
          </div>
          <!-- <ul> -->
          <div v-for="(item,index) in msg" class="wuwuwu">
            <div>
              <!-- <input type="text" :value=item.action @input.prevent="msg[index].action = $event.target.value"> -->
              <el-input style="width: 400px;margin-top: 10px" v-model="msg[index].action"
                        placeholder="请输入地点"></el-input>
              <h3 style="margin-top: 10px;">{{ item.action }}</h3>
              <!-- <input type="text" :value=item.date @input="msg[index].date = $event.target.value"> -->
              <el-input style="margin-top: 10px;" v-model="msg[index].date" placeholder="请输入时间"></el-input>
              <h3 style="margin-top: 10px;">{{ item.date }}</h3>
            </div>
          </div>
          <!-- </ul> -->
          <div class="final_comt">
            <!-- <button @click="final_commit">最终提交</button> -->
            <el-button style="margin-top: 8px" @click="final_commit" type="success" plain>最终提交</el-button>
          </div>
          <div><br></div>

        </div>
      </div>

    </div>
    <div v-if='show_more' class="changee">
      <div class="tocent">
        <!-- <button @click="add">增加一条数据</button> -->
        <el-button @click="add" type="info" plain>增加一条数据</el-button>
      </div>
      <!-- <ul> -->
      <div v-for="(item,index) in msg" class="wuwuwu">
        <div>
          <!-- <input type="text" :value=item.action @input.prevent="msg[index].action = $event.target.value"> -->
          <el-input style="width: 400px;margin-top: 10px" v-model="msg[index].action" placeholder="请输入地点"></el-input>
          <h3 style="margin-top: 10px;">{{ item.action }}</h3>
          <!-- <input type="text" :value=item.date @input="msg[index].date = $event.target.value"> -->
          <el-input style="margin-top: 10px;" v-model="msg[index].date" placeholder="请输入时间"></el-input>
          <h3 style="margin-top: 10px;">{{ item.date }}</h3>
        </div>
      </div>
      <!-- </ul> -->
      <div class="final_comt">
        <!-- <button @click="final_commit">最终提交</button> -->
        <el-button style="margin-top: 8px" @click="final_commit" type="success" plain>最终提交</el-button>
      </div>
      <div><br></div>

    </div>
    <div v-else-if="show_final" class="fl" id="fl">
      <br>
      <div v-if="len>0">

        <h2>与确诊人员有的相同地点：</h2>
        <ul>
          <li v-for="(item,index) in back_fir" v-if="!item.length==0" class="red">{{ msg[index].action }}</li>
        </ul>
      </div>
      <div v-else-if="!show_hand">
        <h2>请稍后</h2>
      </div>
      <div v-else>
        <h2>暂未发现与确诊病例相同的地点</h2>
      </div>

    </div>

  </div>


</template>

<script>
import {
  pinyin
} from "pinyin-pro";

export default {
  name: "Judge",
  data() {
    return {
      isu: true,
      ak1: '',
      ak2: '',
      city: '',
      msg: [],
      show_more: false,
      back_fir: [],
      back_sec: [],
      show_final: false,
      len: 0,
      show_hand: false,
      theHeight: 1000,
      bgg: {
        height: "1000px"
      },

    }
  },
  watch: {
    msg() {
      this.show_more = true
    },
    // len(){
    //   alert('你很可能是密接')
    // }
  },
  methods: {
    switch1() {
      this.isu = !this.isu
    },
    final_commit() {
      this.show_more = !this.show_more
      this.show_final = true
      let that = this
      console.log(that.msg)
      this.axios({
        method: 'get',
        url: '/fin_com',
        params: {
          msg: that.msg,
          city: that.city,
        }
      }).then(function (response) {
        // console.log('获取数据response:' + response)
        // console.log(response.data.fir)
        // console.log(response.data.sec)
        that.back_fir = response.data.fir
        that.back_sec = response.data.sec
        // console.log(that.back_fir)
        for (let i = 0; i < that.back_fir.length; i++) {
          // console.log(that.back_fir[i])
          if (that.back_fir[i] != 0) {
            that.len += 1
          }
          // console.log(that.len)
        }
        that.show_hand = false
        // if (that.len>0){
        //   alert('你很可能是密接')
        // }
      }).catch(function (error) {
        console.log(error)
      })
    },
    commit1() {
      let that = this
      this.axios({
        method: 'get',
        url: '/fenci1',
        params: {
          txt: that.ak1,
          city: that.city,
        }
      }).then(function (response) {
        // console.log('获取数据response:' + response)
        that.msg = response.data.lst
        // console.log(that.msg)
        // console.log('111111111111111', this.theHeight)
      }).catch(function (error) {
        console.log(error)
      })
      this.theHeight += 1000
      this.bgg.height = this.theHeight + 'px'
    },
    commit2() {
      let that = this
      this.axios({
        method: 'post',
        url: '',
        params: {}
      }).then(function (response) {
        console.log('获取数据response:' + response)
      }).catch(function (error) {
        console.log(error)
      })
    },
    add() {
      this.msg.push({
        'action': '',
        'date': '',
      })
      this.theHeight += 150
      this.bgg.height = this.theHeight + 'px'
    },
  },
  mounted() {
    if (this.len > 0) {
      alert('你很可能是密接')
    }
  },
  updated() {


  }
}
</script>

<style scoped>
#bgpic {
  background-image: url("../../../assets/img/jug_bg.png");
  /* width: 100%; */
  /* height: 1000px; */
  /*position:fixed;*/
  /*background-size:100% 100%;*/
}


.red {
  color: red;
}

.tijiao {
  display: block;
  height: 39px;
  width: 55px;
  text-align: center;
  margin: 20px auto;
  margin-bottom: 208px;
}


.tocent {
  text-align: center;
  margin: 20px auto;
}

#zishujingli {
  width: 500px;
  height: 100px;
}

.change {
  height: 500px;
  width: 800px;
  text-align: center;
  border-radius: 20px;
  margin: auto;
  /*position: absolute;*/
  /*top: 105px;*/
  /*left: 0;*/
  /*right: 0;*/
  /*bottom: 0;*/
}

.wuwuwu {
  float: left;
  margin-left: 50px;
  background-color: #D2D2D2;
  margin-top: 50px;
  text-align: center;
}

.wuwuwu:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, .4);
}

.lab {
  text-align: left;
  margin-left: 150px;
}

.changee h2 {
  display: inline;
}

.changee li {
  width: 500px;
  height: auto;

}

.changee ul {
  /*float: left;*/
  overflow: hidden;
  display: inline-block;
  width: auto;
  margin-left: 235px;
}

.changee ul li {
  height: fit-content;
  width: 500px;
  margin-right: 30px;
  margin-bottom: 30px;

  /*float: left;*/
  float: left;
}

.final_comt {

  margin-top: 25px;
  text-align: center;
  margin-bottom: 160px;
}

.fl {
  transition: 500ms;
  margin-top: 20px;
}

.fl ul {
  overflow: hidden;
  display: inline-block;
  width: auto;
  margin-left: 235px;
}

.fl ul li {
  height: fit-content;
  width: 500px;
  margin-right: 30px;
  margin-bottom: 30px;
  /*float: left;*/
  float: left;
}

.fl h2 {
  margin-bottom: 25px;
  text-align: center;
}

/* .el-input__inner {
  width: 130px;
} */

/deep/ .el-input__inner {
  width: 200px;
}
</style>
