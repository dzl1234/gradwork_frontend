<template>
    <div class="main_box">
        <div class="main_head">
            <div class="main_head_title">多语言聊天</div>
            <div class="user_info">
                <div class="login_btn" @click="clickLogin()">登录</div>
                <div class="register_btn" @click="clickRegister()"> 注册</div>
            </div>
        </div>
        <div class="main_body">
            <div class="main-border">
                <router-view />
            </div>
        </div>
        <footer class="main_footer">
            <p>© 2025 跨语言智能聊天平台 dzl版权所有</p>
        </footer>
    </div>
    <login v-show="isVisible" @doClose="onDoClose"></login>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router";
import login from "../login/login.vue";
const router = useRouter();
const isVisible = ref(false);
function clickLogin() {
    isVisible.value = !isVisible.value;
}

const onDoClose = (doClose) => {
    if (doClose == 1) {
        isVisible.value = false;
    }
}
</script>

<style>
.main_box {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

    -webkit-touch-callout: none;
    /*系统默认菜单被禁用*/
    -webkit-user-select: none;
    /*webkit浏览器*/
    -khtml-user-select: none;
    /*早期浏览器*/
    -moz-user-select: none;
    /*火狐*/
    -ms-user-select: none;
    /*IE10*/
    user-select: none;
    z-index: 1；
}

.main_head {
    height: 3rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #42A7FF;
}

.main_body {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: row;
    overflow: hidden;
}

.main_footer {
    height: 3rem;
    width: 100%;
    background-color: #34495e;
    color: white;
    text-align: center;
}

.main-border {
    width: 100%;
    padding-top: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-bottom: 0.5rem;
    overflow: hidden;
    background-color: rgb(241, 244, 245);
    order: 2;
}

.main_head_title {
    color: white;
    font-weight: 700;
    font-size: 1.5rem;
    padding-left: 2rem;
    text-align: center;
}

.user_info {
    color: white;
    padding-right: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.login_btn,
.register_btn {
    color: white;
    padding-right: 1rem;
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
}
</style>