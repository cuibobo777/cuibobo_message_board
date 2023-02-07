<template>
	<view class="home">
		<view class="topbar">
			<u-tabs :list="navList" :current="current" active-color="#0f505e" inactiveColor="#888" @change="changeNav">
			</u-tabs>
		</view>
		<view class="content">
			<view class="item" v-for="item in artList" :key="item._id">
				<blog-item :item="item"></blog-item>
			</view>
		</view>
		<view class="edit" @click="toEdit">
			<text class="iconfont icon-edit"></text>
		</view>
		<uni-load-more color="#0f505e" :status="loadingState"></uni-load-more>
	</view>
</template>

<script setup>
	import { ref, reactive, onMounted } from 'vue'
	import { onLoad, onReachBottom, onPullDownRefresh } from "@dcloudio/uni-app"
	import { store } from "@/uni_modules/uni-id-pages/common/store.js"
	let navList = reactive([{
			name: "最新",
			type: "publish_date"
		},
		{
			name: "热门",
			type: "view_count"
		}
	])
	const db = uniCloud.database();
	const dbCmd = db.command
	let artList = reactive([])
	const current = ref(0)
	const loadingState = ref("more")
	const noMore = ref(false)
	
	onLoad(() => {
		loadingState.value = "loading"
		getArt()
		loadingState.value = "more"
	})
	
	
	//上拉刷新
	onPullDownRefresh(()=>{
		artList.length = 0
		loadingState.value = "loading"
		noMore.value = false
		getArt()
		loadingState.value = "more"
		uni.stopPullDownRefresh()
	})
	
	// 触底加载
	onReachBottom(()=>{
		loadingState.value = "loading"
		// console.log(noMore.value);
		if(noMore.value) {
			loadingState.value = "noMore"
			return
		}
		getArt()
	})
	
	
	// const refresh = () => {
		
	// 	// let artTemp = db.collection("board_article").where(`delState != true`).field("title,description,province,user_id,publish_date,picurls,comment_count,view_count,like_count").getTemp()
	// 	// let userTemp = db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp()
	// 	// db.collection(artTemp, userTemp).orderBy(navList[current.value].type,'desc').limit(5).get().then(async res => {
	// 	// 	artList = reactive(res.result.data)
	// 	// })
	// }

	// 获取文章
	const getArt = () => {
		let artTemp = db.collection("board_article").where(`delState != true`).field("title,description,province,user_id,publish_date,picurls,comment_count,view_count,like_count").getTemp()
		let userTemp = db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp()
		// console.log(artList.length);
		db.collection(artTemp, userTemp).orderBy(navList[current.value].type,'desc').skip(artList.length).limit(5).get().then(async res => {
			if(res.result.data.length == 0){
				noMore.value = true
				loadingState.value = "noMore"
			}
			
			let idArr = res.result.data.map(item => item._id)
			
			let likeRes = await db.collection("board_like").where({
				article_id: dbCmd.in(idArr),
				user_id: uniCloud.getCurrentUserInfo().uid
			}).get()
			
			likeRes.result.data.forEach(item => {
				let findIndex = res.result.data.findIndex(find =>{
					return item.article_id == find._id
				})
				res.result.data[findIndex].isLike = true
			})
			
			artList.push(...res.result.data)
			// console.log(artList);
		})
	}
	
	const changeNav = (index) => {
		current.value = index
		artList.length = 0
		loadingState.value = "more"
		noMore.value = false
		getArt()
	}
	
	// 跳转至编辑页面
	const toEdit = () => {
		uni.navigateTo({
			url:"/pages/edit/edit"
		})
	} 
</script>

<style lang="scss" scoped>
	.home {
		.topbar {
			margin-bottom: 20rpx;
		}

		.loading-state {
			padding: 30rpx;
		}

		.content {
			background-color: #f9f9f9;
			.item {
				padding: 13rpx 30rpx;
			}
		}

		.edit {
			width: 120rpx;
			height: 120rpx;
			background: #880a11;
			border-radius: 50%;
			color: #e2b898;
			position: fixed;
			z-index: 99;
			bottom: 150rpx;
			right: 50rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			box-shadow: 0 0 10rpx rgba(136, 10, 17, 0.8);

			.iconfont {
				font-size: 50rpx;
			}
		}
	}
</style>
