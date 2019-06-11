<template>
    <div>
        <div class="ui_title">账号信息</div>
	<div class="ms_bindbox ui_phone">
		<div class="ms_bind">
			<div class="ms_bindL">
				<div class="ms_bindL2">手机号</div>
			</div>
			<div class="ms_bindR"><span class="ui_phones">13856386632</span>
			<span style="color: #26a5f9;margin-left: .2rem;" @click="$router.push({path:'/',query:{logo:'modify'}})">修改</span></div>
		</div>
	</div>
	<!-- <div class="ms_bindbox ui_idMsg">
		<div class="ms_bind">
			<div class="ms_bindL">
				<div class="ms_bindL2">实名认证</div>
			</div>
			<div class="ms_bindR ui_idMsgs"></div>
		</div>
	</div> -->
    </div>
</template>
<style scoped>
@import url("../../assets/css/style.css");
@import url("../../assets/css/animate.min.css");
@import url("../../assets/css/common.css");
</style>