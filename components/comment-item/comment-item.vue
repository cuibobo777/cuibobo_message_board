<template>
	<view>
		<view class="comment-item" @click="goReply">
			<view class="avatar">
				<u-avatar :src="getAvatar(item)" size="50"></u-avatar>
			</view>

			<view class="wrap">
				<view class="username">
					{{getName(item)}}
					<text v-if="!props.closeBtn" class="iconfont icon-close" @click.stop="delComment"></text>
					
				</view>
				<view class="comment-content">{{item.comment_content}}</view>
				<view class="info">
					<view class="reply-btn" v-if="!props.childState">{{item.totalReply || ''}}回复 </view>
					<view>
						<uni-dateformat :date="item.comment_date" :threshold="[60000,3600000*24*30]">
						</uni-dateformat>
					</view>
					<view>{{item.province}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, defineEmits } from "vue";
import { getAvatar, getName } from "@/utils/tools.js"
const db = uniCloud.database()
const utilsObject = uniCloud.importObject("utilsObject",{
		customUI:true
})
const props = defineProps({
	item:{
		type: Object
	},
	childState: {
		type: Boolean,
		default: false
	},
	closeBtn: {
		type: Boolean,
		default: false
	}
})
const closeBtn = ref(false)
const emit = defineEmits(['commentRemove'])
const sendEmit = (data)=>{
	emit('commentRemove',data)
}

// 点击删除按钮
const delComment = () =>{
	let uid = uniCloud.getCurrentUserInfo().uid
	if(props.item?.user_id[0]._id == uid  || uniCloud.getCurrentUserInfo()?.role[0] == "webmaster" || uniCloud.getCurrentUserInfo()?.role[0] == "admin") {
		uni.showModal({
			title:"确认是否删除",
			success: res=>{
				if(res.confirm){
					removeComment()
				}
			}
		})
	} else {
		uni.showToast({
			title: "无权限",
			icon:"error"
		})
	}
}

// 从数据库中移除评论
const removeComment = ()=>{
	let deletedNum = ref(0)
	db.collection("board_comment").where(`_id == '${props.item._id}' || reply_comment_id == '${props.item._id}'`).remove().then(res=>{
		deletedNum.value = res.result.deleted * -1
		console.log(deletedNum);
		uni.showToast({
			title:"删除成功"
		})
		sendEmit(props.item._id)
		utilsObject.operation("board_article","comment_count",props.item.article_id, parseInt(deletedNum.value))
	})
}

const goReply = () =>{
	if(props.childState) return
	uni.setStorageSync("replyItem",props.item)
	uni.navigateTo({
		url:"/pages/reply/reply"
	})
}

</script>

<style lang="scss" scoped>
	.comment-item {
		display: flex;

		.wrap {
			flex: 1;
			padding-left: 20rpx;
			padding-bottom: 20rpx;

			.username {
				font-size: 26rpx;
				color: #666;
				padding: 10rpx 0;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.iconfont {
					font-size: 20rpx;
					padding: 10rpx;
					color: #999;
				}
			}

			.comment-content {
				font-size: 34rpx;
				color: #111;
				line-height: 1.8em;
			}

			.info {
				font-size: 26rpx;
				color: #666;
				display: flex;
				padding: 10rpx 0;
				align-items: center;

				view {
					margin-right: 25rpx;
				}

				.reply-btn {
					padding: 6rpx 18rpx;
					background: #e4e4e4;
					border-radius: 30rpx;
				}
			}
		}
	}
</style>
