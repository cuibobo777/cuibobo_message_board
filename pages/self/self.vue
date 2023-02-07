<template>
	<view class="self">
		<view class="top">
			<view class="group" @click="toUserInfo">
				<view class="userinfo">
					<view class="pic">
						<image v-if="hasLogin&&userInfo.avatar_file&&userInfo.avatar_file.url" 
						:src="userInfo.avatar_file.url" 
						mode="aspectFill"></image>
						<image v-else src="../../static/images/my_fill.png" mode="aspectFill"></image>
					</view>
					<view class="text" v-if="hasLogin">
						<view class="nickname">{{userInfo.nickname||userInfo.username||userInfo.mobile}}</view>
						<view class="year">
							<uni-dateformat :date="userInfo.register_date" :threshold="[3600,99*365*24*60*60*1000]" />
							注册
						</view>
					</view>
					<view class="text" v-else>
						<view class="nickname">
							点击登录
						</view>
					</view>
				</view>

				<view class="more">
					<text class="iconfont icon-right"></text>
				</view>
			</view>

			<view class="bg">
				<image v-if="hasLogin&&userInfo.avatar_file&&userInfo.avatar_file.url"
				:src="userInfo.avatar_file.url" 
				mode="aspectFill"></image>
				<image v-else src="../../static/images/my_fill.png" mode="aspectFill"></image>
			</view>
		</view>
		
		<view class="main">
			<view class="info">
				<view class="item"><text>{{userArtInfo.likeCount || 0}}</text>获赞</view>
				<!-- <view class="item"><text>11</text>评论</view> -->
				<view class="item"><text>{{userArtInfo.artCount}}</text>发文</view>
			</view>
			
			<view class="list">
				<view class="group">
					<view class="item" @click="toMyArt">
						<view class="left">
							<text class="iconfont icon-solution"></text>
							<text class="text">我的长文</text>
						</view>
						<view class="right">
							<text class="iconfont icon-right"></text>
						</view>
					</view>
					<view class="item" @click="toMyLike">
						<view class="left">
							<text class="iconfont icon-like"></text>
							<text class="text">我的点赞</text>
						</view>
						<view class="right">
							<text class="iconfont icon-right"></text>
						</view>
					</view>
					<view class="item">
						<view class="left">
							<text class="iconfont icon-edit"></text>
							<text class="text">评论过的</text>
						</view>
						<view class="right">
							<text class="iconfont icon-right"></text>
						</view>
					</view>
				</view>
				
				<view class="group">
					<view class="item">
						<view class="left">
							<text class="iconfont icon-audit"></text>
							<text class="text">关于</text>
						</view>
						<view class="right">
							<text class="iconfont icon-right"></text>
						</view>
					</view>
					<view class="item" @click="toFeedback">
						<view class="left">
							<text class="iconfont icon-comment"></text>
							<text class="text">意见反馈</text>
						</view>
						<view class="right">
							<text class="iconfont icon-right"></text>
						</view>
					</view>				
				</view>
				
				<view class="group">
					<view class="item" @click="logout">
						<view class="left">
							<text class="iconfont icon-poweroff"></text>
							<text class="text">退出登录</text>
						</view>
						<view class="right">
							<text class="iconfont icon-right"></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script setup>
	import { onLoad } from "@dcloudio/uni-app"
	import { store, mutations } from '@/uni_modules/uni-id-pages/common/store.js'
	import { computed, reactive } from "vue";
	
	const db = uniCloud.database();
	const userInfo = computed(() => {
		return store.userInfo
	})
	const hasLogin =  computed(() => {
		return store.hasLogin
	})
	const userArtInfo = reactive({
		artCount:0,
		likeCount:0
	})
	
	onLoad(() => {
		getInfo()
	})
	
	//获取统计数据
	const getInfo = async () => {
		if(!hasLogin.value) return
		let artCount = await db.collection("board_article").where(`user_id == $cloudEnv_uid && delState != true`)
		.count()
		let likeCount = await db.collection("board_article").where(`user_id == $cloudEnv_uid && delState != true`)
		.groupBy('user_id')
		.groupField('sum(like_count) as likeScore').get()
		userArtInfo.artCount = artCount.result.total
		userArtInfo.likeCount = likeCount.result.data[0]?.likeScore
	}
	
	//跳转到我的文章列表
	const toMyArt = () => {
		if(toLoginPage()) return
		uni.navigateTo({
			url:"/pages/board_article/list"
		})
	}
	
	//跳转到我点赞的文章列表
	const toMyLike = () => {
		if(toLoginPage()) return
		uni.navigateTo({
			url:"/pages/board_like/list"
		})
	}
	
	// 跳转到意见反馈
	const toFeedback = () => {
		if(toLoginPage()) return
		uni.navigateTo({
			url: "/uni_modules/uni-feedback/pages/opendb-feedback/opendb-feedback"
		})
	}
	
	
	// 跳转到个人信息编辑
	const toUserInfo = () => {
		uni.navigateTo({
			url: '/uni_modules/uni-id-pages/pages/userinfo/userinfo',
		})
		// if(hasLogin.value){
		// 	uni.navigateTo({
		// 		url: '/uni_modules/uni-id-pages/pages/userinfo/userinfo'
		// 	})	
		// } else {
		// 	let route = this.$mp.page.route;
		// 	uni.navigateTo({
		// 		url: '/uni_modules/uni-id-pages/pages/login/login-withpwd?uniIdRedirectUrl=/'+route
		// 	})
		// }
	}
			
	
	// 退出登录
	const logout = () => {
		if(toLoginPage()) return
		uni.showModal({
			title:"是否确认退出?",
			success: res => {
				if(res.confirm){
					mutations.logout()
				}
			}
		})
	}
	
	const toLoginPage = () => {
		if(!hasLogin.value){
			uni.showToast({
				title:"未登录",
				icon:'none'	
			})
			return true
		}
		return false
	}

</script>

<style lang="scss" scoped>
	.self {
		.top {
			height: 300rpx;
			background: #bbb;
			padding: 0 30rpx;
			padding-top: var(--status-bar-height);
			position: relative;
			display: flex;
			align-items: center;

			.group {
				position: relative;
				z-index: 10;
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				color: #fff;

				.userinfo {
					display: flex;
					width: 100%;
					align-items: center;

					.pic {
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
						overflow: hidden;
						border: 2px solid #fff;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.text {
						padding-left: 20rpx;

						.nickname {
							font-size: 44rpx;
							font-weight: 600;
						}

						.year {
							font-size: 26rpx;
							opacity: 0.6;
							padding-top: 5rpx;
						}
					}
				}

				.more {
					.iconfont {
						font-size: 40rpx;
					}
				}

			}

			.bg {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
					filter: blur(20px);
					transform: scale(2);
					opacity: 0.5;
				}
			}
		}

		.main {
			width: 100%;
			min-height: 200rpx;
			background: #fff;
			border-radius: 30rpx;
			transform: translateY(-30rpx);
			padding: 30rpx 0;

			.info {
				padding: 10rpx 30rpx;
				display: flex;
				font-size: 30rpx;

				.item {
					padding-right: 20rpx;
					color: #888;

					text {
						font-weight: 600;
						color: #333;
					}
				}
			}

			.list {
				.group {
					padding: 15rpx 30rpx;
					border-bottom: 15rpx solid #f4f4f4;

					.item {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 25rpx 0;
						font-size: 36rpx;
						color: #555;
						border-bottom: 1rpx solid #f8f8f8;

						.left {
							display: flex;
							align-items: center;

							.iconfont {
								font-size: 38rpx;
								margin-right: 10rpx;
							}
						}

						.right {
							.iconfont {
								font-size: 26rpx;
							}
						}
					}

					.item:last-child {
						border: none;
					}
				}

				.group:last-child {
					border: none;
				}
			}
		}
	}
</style>
