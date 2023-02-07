export function getImgSrc(richtext, num = 3) {
	let imgList = [];
	richtext.replace(/<img [^>]*src=['"]([^'"]+)[^>*]/g, (match, capture) => {
		imgList.push(capture)
	})
	imgList = imgList.slice(0, num)
	return imgList
}

export function getProvince() {
	return new Promise((resolve, reject) => {
		let hisProvince = uni.getStorageSync("hisProvince")
		if (hisProvince && (Date.now() - hisProvince.time < 1000 * 60 * 60)) {
			resolve(hisProvince.province)
		} else {
			getIp().then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		}
	})
}

function getIp() {
	return new Promise((resolve, reject) => {
			uni.request({
				url: "https://restapi.amap.com/v3/ip?key=cffea5404e0689048feeab6b5af21bef",
				success: res => {
					let p = ""
					typeof(res.data.province) == "string" ? p = res.data.province : p = "艾欧泽亚"
					resolve(p)
					let hpo = {
						province: p,
						time: Date.now()
					}
					uni.setStorageSync("hisProvince", hpo)
				},
				fail: err => {
					reject(err)
				}
			})
		})
	}


export function getName(item){
 	return item.user_id[0].nickname || item.user_id[0].username || item.user_id[0].mobile || "请设置昵称"
}

export function getAvatar(item){
	return item.user_id[0]?.avatar_file?.url ?? '../../static/images/my_fill.png'
}

const db = uniCloud.database();
const utilsObject = uniCloud.importObject("utilsObject",{
		customUI:true
})

export async function likeFun(artId){
	let count = await db.collection("board_like")
	.where(`article_id=="${artId}" && user_id==$cloudEnv_uid`).count()
		
	if(count.result.total) {
		db.collection("board_like").where(`article_id=="${artId}" && user_id==$cloudEnv_uid`).remove()
		utilsObject.operation("board_article","like_count",artId,-1)
	} else {
		db.collection("board_like").add({
			article_id:artId
		})
		utilsObject.operation("board_article","like_count",artId,1)
	}
}