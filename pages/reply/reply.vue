<template>
	<view class="reply">
		<view class="top">
			<comment-item :closeBtn="true" :childState="true" :item="replyItem"></comment-item>
		</view>
		<view class="list">
			<view class="row" v-for="item in childCommentArr">
				<comment-item @commentRemove="P_commentRemove" :childState="true" :item="item"></comment-item>
			</view>
			<uni-load-more color="#0f505e" :status="loadingState"></uni-load-more>
		</view>

		<view>
			<comment-frame 
			:placeholder="`回复：${getName(replyItem)}`" 
			@commentEnv="P_commentEnv"
			:comment="comment">
			</comment-frame>
		</view>
	</view>
</template>

<script setup>
	import {
		getName
	} from "@/utils/tools.js"
	import {
		onLoad,
		onUnload,
		onReachBottom
	} from "@dcloudio/uni-app"
	import {
		ref, reactive
	} from "vue";
	import { store } from "@/uni_modules/uni-id-pages/common/store.js"
	
	const db = uniCloud.database();
	let replyItem = {}
	const childCommentArr = reactive([])
	const comment = reactive({
		article_id: "",
		comment_type: 1,
		reply_user_id: "",
		reply_comment_id: ""
	})
	const loadingState = ref("more")
	const noMore = ref(false)

	// 获取子评论列表
	const getComment = () => {
		let commentTemp = db.collection("board_comment").where(`article_id == '${replyItem.article_id}' && 
		comment_type == 1  && reply_comment_id == '${replyItem._id}'`).orderBy("comment_date desc")
		.skip(childCommentArr.length).limit(5).getTemp()
		let userTemp = db.collection("uni-id-users").field("_id,nickname,username,avatar_file").getTemp()
		db.collection(commentTemp, userTemp).get().then(res=>{
			if(res.result.data.length == 0){
				noMore.value = true
				loadingState.value = "noMore"
			}
			childCommentArr.push(...res.result.data)
		})
	}
	
	// 触底加载
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
		childCommentArr.unshift({
			...e,
			...comment,
			user_id:[store.userInfo],
			comment_date: Date.now()
		})
	}

	// 删除评论回调
	const P_commentRemove = (e) => {
		let index = childCommentArr.findIndex(item=> item._id == e)
		childCommentArr.splice(index,1)
	}
	
	onLoad(() => {
		let replyStorage = uni.getStorageSync('replyItem')
		if (!replyStorage) return uni.navigateBack()
		replyItem = reactive(replyStorage)
		comment.article_id = replyItem.article_id
		comment.reply_comment_id = replyItem._id
		comment.reply_user_id = replyItem.user_id[0]._id
		loadingState.value = "loading"
		getComment()
		loadingState.value = "more"
	})

	onUnload(() => {
		uni.removeStorageSync("replyItem")
	})
</script>

<style lang="scss" scoped>
	.reply {
		.top {
			padding: 30rpx;
			border-bottom: 15rpx solid #eee;
		}

		.list {
			padding: 60rpx;
			padding-bottom: 120rpx;

			.row {
				padding-bottom: 15rpx;
			}
		}
	}
</style>
