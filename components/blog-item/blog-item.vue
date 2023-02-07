<template>
	<view class="blogitem" v-if="isDel">
		<view class="header">
			<view class="user-info">
				<view class="avatar">
					<image 
					:src="getAvatar(item)" 
					mode="aspectFill"></image>
				</view>
				<view class="nickname">
					{{getName(item)}}
				</view>
				<view class="time">
					<uni-dateformat :date="item.publish_date" format="MM月dd hh:mm" :threshold="[60000,3600000*24*30]">
					</uni-dateformat>
				</view>
			</view>

			<view class="more" @click="clickMore">
				<uni-icons type="more-filled" size="20"></uni-icons>
			</view>
		</view>

		<view class="content">
			<view class="title" @click="toDetail">
				{{item.title}}
			</view>
			<view class="text" @click="toDetail">
				<view class="context u-skeleton-rect" v-if="item.description">
					{{item.description}}
				</view>
			</view>
			<view class="piclist" v-if="item.picurls.length">
				<view class="pic" v-for="(pic,index) in item.picurls" :key="index">
					<image @click="previewPic(index)" :src="pic" mode="aspectFill"></image>
				</view>					
			</view>
		</view>

		<view class="art-info">
			<view class="info-item">
				<text class="iconfont icon-eye"></text><text>{{item.view_count}}</text>
			</view>
			<view class="info-item">
				<text class="iconfont icon-message" @click="toDetail"></text>
				<text>{{item.comment_count ? item.comment_count : "评论"}}</text>
			</view>
			<view class="info-item" @click="clickLike" :class="item.isLike ? 'active' : ''">
				<text class="iconfont icon-like"></text>
				<text>{{item.like_count ? item.like_count : "点赞"}}</text>
			</view>
		</view>
		
		<u-action-sheet :list="list" 
		v-model="acSheetShow"
		:cancel-btn="true"
		:mask-close-able="true"
		:border-radius="25"
		@click="clickSheet"
		></u-action-sheet>
	</view>
</template>

<script setup>
	import { ref, reactive } from "vue";
	import { onLoad } from "@dcloudio/uni-app"
	import { getAvatar, getName, likeFun } from "@/utils/tools.js"
	import { store } from "@/uni_modules/uni-id-pages/common/store.js" 
	import pageJson from "@/pages.json"
	const props = defineProps({
		item:{
			type:Object
		}
	})
	const db = uniCloud.database();
	const acSheetShow = ref(false)
	const isDel = ref(true)
	const likeTime = ref(0)
	const list = reactive([
		{ 
			text: "修改",
			type: "edit",
			disabled: true
		},
		{ 
			text: "删除",
			type: "del",
			color: "#f56c6c",
			disabled: true
		}
	])
	
	// 点击弹出弹框并确认权限
	const clickMore = () => {
		let uid = uniCloud.getCurrentUserInfo().uid
		if(props.item?.user_id[0]._id == uid  || uniCloud.getCurrentUserInfo()?.role[0] == "webmaster" || uniCloud.getCurrentUserInfo()?.role[0] == "admin") {
			list.forEach(item => {
				item.disabled = false
			})
		} 
		acSheetShow.value = true
	}
	
	// 点击弹窗按钮
	const clickSheet = (index) => {
		if(list[index].type == "del"){
			delFun()
		} else if (list[index].type == "edit"){
			editFun()
		}
	}
	
	//点赞
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
		if (time - likeTime.value < 1000){
			uni.showToast({
				title:"操作太频繁，请稍后...",
				icon:"none"
			})
			return
		}
		props.item.isLike ? props.item.like_count-- : props.item.like_count++
		props.item.isLike = !props.item.isLike
		likeTime.value = time
		//调用点赞方法
		likeFun(props.item._id)
	}
	
	// 修改文章
	const editFun= () => {
		console.log(props.item._id);
		uni.navigateTo({
			url:"/pages/edit/edit?id=" + props.item._id
		})
	}
	
	// 删除文章
	const delFun = () => {
		uni.showLoading({
			title:"删除中..."
		})
		db.collection("board_article").doc(props.item._id).update({
			delState: true
		}).then(res => {
			isDel.value = false
			uni.hideLoading()
			uni.showToast({
				title:"删除成功",
				icon:"none"
			})
		}).catch(err => {
			uni.hideLoading()
		})
	}
	
	const previewPic = (index) => {
		uni.previewImage({
			urls:props.item.picurls,
			current:indexs
		})
	}
	const toDetail = () => {
		// console.log(props.item);
		uni.navigateTo({
			url:"/pages/detail/detail?id=" + props.item._id
		})
	}
</script>

<style lang="scss" scoped>
	.blogitem {
		border-radius: 30rpx;
		background-color: #fff;
		padding: 15rpx;
		.header {
			display: flex;
			font-size: 32rpx;
			align-items: center;
			justify-content: space-between;

			.user-info {
				display: flex;
				align-items: center;

				.avatar {
					width: 50rpx;
					height: 50rpx;
					border-radius: 50%;
					border-radius: 50%;
					overflow: hidden;
					image {
						width: 100%;
						height: 100%;
						display: block;
					}
				}

				.nickname {
					margin-left: 5rpx;
					color: #222;
					padding-left: 10rpx;
				}

				.time {
					color: #888;
					font-size: 22rpx;
					padding-left: 20rpx;
				}
			}

			.more {
				padding: 5rpx;

				.iconfont {
					font-size: 50rpx;
					color: #888;
				}
			}
		}

		.content {
			padding: 15rpx 0 30rpx;

			.title {
				font-size: 44rpx;
				color: #000;
				font-weight: 600;
				text-align: justify;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.text {
				padding-top: 10rpx;
				padding-bottom: 10rpx;
				font-size: 30rpx;
				text-align: justify;
				color: #888;

				.context {
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}

			.piclist {
				display: flex;
				padding-top: 20rpx;

				.pic {
					width: 225rpx;
					height: 225rpx;
					margin-right: 6rpx;
					overflow: hidden;
					image {
						width: 100%;
						height: 100%;
					}

					&:first-child {
						border-radius: 20rpx 0 0 20rpx;
					}

					&:last-child {
						border-radius: 0 20rpx 20rpx 0;
					}

					&:only-child {
						border-radius: 20rpx;
					}

				}
			}
		}
	
		.art-info {
			display: flex;
			align-items: center;
			justify-content: space-around;
			font-size: 26rpx;
			color: #0f505e;
			.info-item{
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 15rpx 0 15rpx;
				flex: 1;
				.iconfont{
					font-size: 32rpx;
					padding-right: 10rpx;
				}
			}
			.info-item.active {
				color: #880a11;
			}
		}
	
	}
</style>
