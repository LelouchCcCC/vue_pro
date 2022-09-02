<template>
  <div class="block">
    <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期">
    </el-date-picker>
    <button @click="out()">查询</button>
    <button @click="out2()">2222</button>
    <el-input
        placeholder="请输入航班号或列车号"
        v-model="input"
        label-width="100px"
        clearable>
    </el-input>
    <el-input
        placeholder="请输入城市"
        v-model="input2"
        label-width="100px"
        clearable>
    </el-input>
  </div>

</template>


<script>
import {getQuery} from "../../api/data";
import {getPolicy} from "../../api/data";

export default {
  name: 'UserQuery',
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      value1: '',
      value2: '',
      input:'',
      input2:'',
    };
  },
  methods: {
    out() {
      let param = {
        'date':this.value1,
        'message':this.input,
      }
      console.log(param)
      getQuery(param)

    },
    out2(){
      let param = {
        'cityname':this.input2,
      }
      getPolicy(param)
    }
  }
};
</script>

<style>
.el-input {
    width: 350px;
  }

</style>