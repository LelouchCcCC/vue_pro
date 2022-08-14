<template>
	<el-menu :router="true" :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
		background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
		<el-menu-item :index="'/index'">处理中心</el-menu-item>
		<el-menu-item :index="'/main'">确诊总览</el-menu-item>
		<el-menu-item :index="'/jug/'">查询本人是否密接</el-menu-item>
		<!-- <el-menu-item :index="'/Mag/'">上传文件</el-menu-item> -->
<!--		<el-menu-item :index="'/login/'">上传文件</el-menu-item>-->
		<div class='title'>中国新冠肺炎流调溯源系统</div>
	</el-menu>

</template>

<script>
	export default {
		name: "Nav",
		// backgroundImgUrl: require('@/assets/img/home/home.png')
		data() {
			return {
				activeIndex: '1',
				activeIndex2: '1'
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style scoped>
	.hom {
		background-image: url("~@/assets/img/home/home.png");
	}

	.nav {
		height: 75px;
		width: 100%;
		left: 0px;
		right: 0px;
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		background-color: #d4d4d4;
	}

	.nav .top_title {
		display: inline-block;
		margin-top: 25px;
		margin-left: 40%;
		text-align: center;
		font-size: 22px;
		color: black;
	}

	.top_title:hover {
		text-shadow: 0px 2px 3px rgba(0, 0, 0, 0.4);
	}


	.nav .aa {
		float: right;
		display: block;
		margin-top: 50px;
		color: black;
		background-color: #d4d4d4;
	}

	.nav .yous {
		margin-left: 3px;
		float: left;
		display: block;
		margin-top: 5px;
		color: black;
	}

	.aa:hover {
		box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.4);

	}

	.yous:hover {
		box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.4);
	}
	
	.title {
		padding-top: 15px;
		margin-right: 50px;
		color: #FFFFFF;
		font-size: 30px;
	}
</style>
