<template>
	<view class="edit">
		<view class="art-title">
			<input type="text" v-model="richArt.title" placeholder="输入一个标题" placeholder-class="placeholder-class">
		</view>
		<view class="content">
			<editor 
			class="richTextEditor"
			placeholder="请输入内容~~"
			show-img-size
			show-img-toolbar
			show-img-resize
			@ready="onReady"
			@focus="onFocus"
			@statuschange="onStatuschange"
			></editor>
		</view>
		<view class="buttons">
			<u-button type="primary" @click="onSubmit" :disabled="!richArt.title.length">确认发表</u-button>
		</view>
		<view class="edit-tools" v-if="toolsShow">
			<view class="item" @click="toHeader">
				<text class="iconfont icon-zitibiaoti" :class="headerShow ? 'active' : ''"></text>
			</view>
			<view class="item" @click="toBold">
				<text class="iconfont icon-bold" :class="boldShow ? 'active' : ''" ></text>
			</view>
			<view class="item" @click="toItalic">
				<text class="iconfont icon-italic" :class="italicShow ? 'active' : ''"></text>
			</view>
			<view class="item" @click="addInsertDivider"><text class="iconfont icon-line"></text></view>
			<view class="item" @click="InsertImage"><text class="iconfont icon-image"></text></view>
			<view class="item" @click="editOk"><text class="iconfont icon-check"></text></view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from "vue";
import { getImgSrc, getProvince } from '@/utils/tools.js'
import { onLoad } from '@dcloudio/uni-app'
	const db = uniCloud.database();
	const richArt = reactive({
		title:'',
		content:'',
		description:'',
		picurls:'',
		province:''
	})
	let editorCtx = ""
	const toolsShow = ref(false) 
	const headerShow = ref(false)
	const boldShow = ref(false)
	const italicShow = ref(false)
	const editArtId = ref("")
	const instance = getCurrentInstance()
	
	onLoad((e)=>{
		editArtId.value = e.id
		// console.log(editArtId);
		getProvince().then(res=>{
			richArt.province = res
		})
		getEditArt()
	})
	
	//初始化
	const onReady = () => {
		uni.createSelectorQuery().in(instance).select(".richTextEditor").fields({
			size:true,
			context:true
		},res => {
			editorCtx = res.context
		}).exec()
	}
	
	//检查状态变化
	const checkStatus = (name, detail, obj) => {
		if (detail.hasOwnProperty(name)) {
			obj.value = true
		} else {
			obj.value = false
		}
	}
	
	//解决H标签无法自己回弹问题
	const onStatuschange = (e) => {
		let detail = e.detail
		checkStatus('header', detail, headerShow)
	}
	
	// 上传照片
	const InsertImage = () => {
		uni.chooseImage({
			success:async res => {
				for (let item of res.tempFiles) {
					let fileType = item.path.substring(item.path.lastIndexOf("."))
					let randomName = Date.now() + "" + String(Math.random()).substr(3,6) + fileType
					uni.showLoading({
						title:"上传中",
						mask:true
					})
					let res = await uniCloud.uploadFile({
						filePath:item.path,
						cloudPath:item.name || randomName
					})
					editorCtx.insertImage({
						src:res.fileID
					})
					uni.hideLoading()
				}
			}
		})
	}
	
	//提交文章
	
	const onSubmit = () => {
		editorCtx.getContents({
			success: res => {
				richArt.content = res.html
				richArt.description = res.text.slice(0,50)
				richArt.picurls = getImgSrc(res.html)
				uni.showLoading({
					title:"发布中"
				})
				addArticle()
			}
		})
	}
	
	// 获取需要修改的文章
	const getEditArt = () =>{
		if(!editArtId.value) return
		db.collection("board_article").doc(editArtId.value).get().then(res=>{
			richArt.title = res.result.data[0].title
			richArt.content = res.result.data[0].content
			setEditArt()
		})
	}
	
	
	// 文章入库
	const addArticle = () => {
		if(!editArtId.value){
			db.collection("board_article").add(richArt).then(res=>{
				uni.hideLoading()
				uni.showToast({
					title:"发布成功"
				})
				setTimeout(()=>{
					uni.reLaunch({
						url:"/pages/index/index"
					})
				},900)
			})
		} else {
			db.collection("board_article").doc(editArtId.value).update(richArt).then(res=>{
				uni.hideLoading()
				uni.showToast({
					title:"修改成功"
				})
				setTimeout(()=>{
					uni.navigateTo({
						url:"/pages/index/index"
					})
				},900)
			})
		}
	}
	
	//获得焦点后显示工具栏
	const onFocus = () => {
		toolsShow.value = true
	}
	
	//增加标题
	const toHeader = () => {
		headerShow.value = !headerShow.value
		editorCtx.format('header', headerShow ? 'H2':false)
	}
	
	//加粗
	const toBold = () => {
		boldShow.value = !boldShow.value
		editorCtx.format('bold')
	}
	
	//斜体
	const toItalic = () => {
		italicShow.value = !italicShow.value
		editorCtx.format('italic')
	}
	
	//增加分割线
	const addInsertDivider = () => {
		editorCtx.insertDivider()
	}
	
	// 初始化编辑对象
	const setEditArt = ()=>{
		editorCtx.setContents({
			html: richArt.content
		})
	}
	
	//编辑完成
	const editOk = () => {
		toolsShow.value = !toolsShow.value
	}
</script>

<style lang="scss" scoped>

.edit {
	padding: 30rpx;
	
	.art-title {
		input {
			height: 100rpx;
			font-size: 42rpx;
			border-bottom: 1px solid #0f505e ;
			margin-bottom: 30rpx;
		}
		.placeholder-class {
			color: #999;
		}
	}
	
	.content {
		.richTextEditor {
			height: calc(100vh - 480rpx);
			margin-bottom: 30rpx;
			.ql-container {
				height: 100%;
			}
		}
	}
	
	.edit-tools {
		width: 100%;
		height: 90rpx;
		display: flex;
		background: #fff;
		align-items: center;
		border-top: 1px solid #eee;
		justify-content: space-around;
		left: 0;
		bottom: 30 rpx;
		position: fixed;
		.iconfont {
			font-size: 38rpx;
			color: #bbb;
			&.active {
				color: #0f505e;
			}
		}
	}
}
</style>
