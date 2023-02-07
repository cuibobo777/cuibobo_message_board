<template>
	<view>
		<view class="commentFrame">
			<uni-easyinput ref="uipt" @confirm="goComment" suffixIcon="paperplane" v-model="replyContent"
				:placeholder="placeholder" @iconClick="goComment">
			</uni-easyinput>
		</view>

	</view>
</template>

<script setup>
import { ref, reactive, defineEmits } from "vue";
import { getProvince } from "@/utils/tools.js"

const db = uniCloud.database();
const utilsObject = uniCloud.importObject("utilsObject",{
		customUI:true
})
const replyContent = ref("")
const props = defineProps({
	comment:{
		type: Object
	},
	placeholder:{
		type: String,
		default: "评论点什么吧~~~"
	}
})

const emit = defineEmits(["commentEnv"])
const sendEimt = (data) => {
	emit('commentEnv',data)
}

const goComment = async () => {
	let province = await getProvince()
	if(!replyContent.value) {
		uni.showToast({
			title:"内容不能为空",
			icon:"none"
		})
		return
	}
	db.collection("board_comment").add({
		comment_content: replyContent.value,
		province: province,
		...props.comment
	}).then(res=>{
		// console.log(res);
		uni.showToast({
			title:"评论成功"
		})
		utilsObject.operation("board_article","comment_count",props.comment.article_id,1)
		sendEimt({
			_id:res.result.id,
			comment_content:replyContent.value,
			province:province
		})
		replyContent.value = ''
	})

}
</script>

<style lang="scss" scoped> 
	.commentFrame {
		width: 100%;
		background: #fff;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 100;
	}
</style>
