<template>
	<view class="detail">
		<view class="container">
			<view v-if="loadStatus">
					正在加载中...
			</view>
			<view v-else>
				<view class="title">{{art.title}}</view>
				<view class="auth-info">
					<view class="avatar">
						<image 
						:src="getAvatar(art)" 
						mode="aspectFill"></image>
					</view>
					<view class="info">
						<view class="name">
							{{getName(art)}}
						</view>
						<view class="small">
							<uni-dateformat :date="art.publish_date" format="yyyy年MM月dd hh:mm:ss"></uni-dateformat>
							· 发布于{{art.province}}</view>
					</view>
				</view>
				<view class="content">
					<u-parse :html="art.content"></u-parse>
				</view>
				<view class="like">
					<view class="btn" :class="art.isLike ? 'active' : ''" @click="clickLike">
						<text class="iconfont icon-like-fill"></text>
						<text v-if="art.like_count">{{art.like_count}}</text>
					</view>
					<view class="users">
						<template v-for="(avatar,index) in avatarArr" :key="index">
							<image v-if="avatar.user_id[0].avatar_file" :src="getAvatar(avatar)" mode="aspectFill"></image>
						</template>
					</view>
					<view class="text"><text class="num">{{art.view_count}}</text>人看过</view>
				</view>
			</view>
		</view>
	
		<view class="comments">
			<view style="padding-bottom: 50rpx;" v-if="!commentArr.length && onComment">
				<u-empty text="没有人在这里留言" mode="message"></u-empty>
			</view>
			<view v-else class="content">
				<view class="item" v-for="item in commentArr" :key="item._id">
					<comment-item :item="item" @commentRemove="P_commentRemove"></comment-item>									
				</view>
			</view>
			<uni-load-more color="#0f505e" :status="loadingState"></uni-load-more>
		</view>
		<comment-frame :comment="comment" @commentEnv="P_commentEnv"></comment-frame>
		
	</view>
</template>

<script setup>
	import {
		onLoad,
		onReachBottom
	} from "@dcloudio/uni-app"
	import {
		onMounted,
		reactive,
		ref
	} from "vue";
	import pageJson from "@/pages.json"
	import { getName, getAvatar, likeFun, getProvince } from "@/utils/tools.js"
	import { store } from "@/uni_modules/uni-id-pages/common/store.js" 
	const db = uniCloud.database();
	const utilsObject = uniCloud.importObject("utilsObject",{
		customUI:true
	})
	const artId = ref("")
	const where = ref("")
	const likeTime = ref(0)
	const loadStatus = ref(true)
	const comment = reactive({
		article_id: "",
		comment_type: 0
	})
	let art = {}
	const avatarArr = reactive([])
	const commentArr = reactive([])
	const onComment = ref(false)
	const loadingState = ref("more")
	const noMore = ref(false)
	
	onLoad((e) => {
		if(!e.id){
			errFun()
			return
		}
		artId.value = e.id
		comment.article_id = e.id
		getArtDetail()
		readUpdate()
		avatarArr.length = 0
		getLikeUser()
		loadingState.value = "loading"
		getComment()
		loadingState.value = "more"
	})
	
	// 获取评论列表
	
	const getComment = async () => {
		let commentTemp = db.collection("board_comment").where(`article_id == '${artId.value}' && 
	comment_type == 0`).orderBy("comment_date desc").skip(commentArr.length).limit(5).getTemp()
		let userTemp = db.collection("uni-id-users").field("_id,nickname,username,avatar_file").getTemp()
		
		let res = await db.collection(commentTemp, userTemp).get()
		
		let idArr = res.result.data.map(item => item._id)
		
		let replyArr = await db.collection("board_comment").where({
			reply_comment_id: db.command.in(idArr),
		}).groupBy("reply_comment_id").groupField('count(*) as totalReply').get()
		
		res.result.data.forEach(item => {
			let index = replyArr.result.data.findIndex(find =>{
				return find.reply_comment_id == item._id
			})
			if(index>-1) item.totalReply = replyArr.result.data[index].totalReply
		})
		if(res.result.data.length == 0){
				noMore.value = true
				loadingState.value = "noMore"
				onComment.value = true
		} 
		commentArr.push(...res.result.data)
		
	}
	
	onReachBottom(()=>{
		loadingState.value = "loading"
		if(noMore.value) {
			loadingState.value = "noMore"
			return
		}
		getComment()
	})
	
	
	// 接收子组件增加的评论 回调函数
	const P_commentEnv = (e) =>{
		commentArr.unshift({
			...e,
			...comment,
			user_id:[store.userInfo],
			comment_date: Date.now()
		})
	}

	// 删除评论回调
	const P_commentRemove = (e) => {
		let index = commentArr.findIndex(item=> item._id == e)
		commentArr.splice(index,1)
	}

	const errFun = () => {
		uni.showToast({
			title:"参数有误",
			icon:"none"
		})
		setTimeout(() => {
			uni.reLaunch({
				url:"/pages/index/index"
			})
		},1000)
	}
	
	const getArtDetail = () => {
		let artTemp = db.collection("board_article").where(`_id == '${artId.value}'`).getTemp()
		let userTemp = db.collection("uni-id-users").field("_id,nickname,username,avatar_file").getTemp()
		let likeTemp = db.collection("board_like").where(`article_id=="${artId.value}" && user_id==$cloudEnv_uid`).getTemp()
		
		let tempArr = [artTemp, userTemp]
		if(store.hasLogin) tempArr.push(likeTemp) 
		
		db.collection(...tempArr).get({getOne:true}).then(res => {
			if(!res.result.data){
				errFun();
				return;
			}
			let isLike = false
			if(store.hasLogin) isLike = res.result.data._id?.board_like?.length ? true : false
			res.result.data.isLike = isLike
			art = reactive(res.result.data)
			loadStatus.value = false
		}).catch(err => {
			errFun()
		})
	}
	
	// 修改阅读量
	const readUpdate = () => {
		utilsObject.operation("board_article","view_count",artId.value,1).then(res => {
		})
	}

	// 点赞
	const clickLike = () => {
		if(!store.hasLogin) {
			uni.showModal({
				title:'是否前往登录',
				success: res => {
					if(res.confirm){
						uni.navigateTo({
							url:"/" + pageJson.uniIdRouter?.loginPage
						})
					}
				}
			})
		}
		let time = Date.now()
		if (time - likeTime.value < 2000){
			uni.showToast({
				title:"操作太频繁，请稍后...",
				icon:"none"
			})
			return
		}
		art.isLike ? art.like_count-- : art.like_count++
		art.isLike = !art.isLike
		likeTime.value = time
		//调用点赞方法
		likeFun(artId.value)
	}

	// 获取点赞头像
	const getLikeUser = () => {
		let likeTemp = db.collection("board_like").where(`article_id == '${artId.value}'`).getTemp()
		let userTemp = db.collection("uni-id-users").field("_id, avatar_file").getTemp()
		db.collection(likeTemp, userTemp).orderBy("publish_date desc").limit(5).get().then(res => {
			res.result.data = res.result.data.reverse()
			avatarArr.push(...res.result.data)
		})
	}

</script>

<style lang="scss" scoped>
	.detail {
		background: #f9f9f9;
		min-height: calc(100vh - var(--window-top));

		.container {
			padding: 35rpx;
			background: #fff;

			.title {
				font-size: 46rpx;
				color: #0f505e;
				line-height: 1.4em;
				font-weight: 700;
			}

			.auth-info {
				display: flex;
				padding: 20rpx 0 50rpx;
				align-items: center;

				.avatar {
					width: 60rpx;
					height: 60rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}

				.info {
					font-size: 30rpx;
					color: #444;
					margin-left: 20rpx;

					.small {
						font-size: 20rpx;
						color: #999;
					}
				}
			}

			.content {}

			.like {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 80rpx 50rpx 50rpx;

				.btn {
					display: flex;
					width: 240rpx;
					height: 120rpx;
					background: #aaa;
					border-radius: 80rpx;
					color: #fff;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					font-size: 28rpx;

					.iconfont {
						font-size: 50rpx;
					}

					&.active {
						background: #0f505e;
						color: #e2b898;
					}
				}

				.text {
					font-size: 26rpx;
					color: #555;

					.num {
						color: #0f505e;
					}
				}
			}

			.users {
				display: flex;
				justify-content: center;
				padding: 30rpx;

				image {
					width: 30rpx;
					height: 30rpx;
					border-radius: 50%;
					border: 3px solid #fff;
					margin-left: -20rpx;
				}
			}
		}
		
		.comments {
			padding: 30rpx;
			padding-bottom: 120rpx;
			.item{
				padding:10rpx 0;
			}
		}
	}
</style>
