<template>
    <div>
        <el-form class="login_form">
            <div class="title">
                <p>登录</p>
            </div>
            <el-form-item label="账号" class="username_label">
                <el-input v-model="formData.username" placeholder="请输入您的用户名" type="text"></el-input>
            </el-form-item>
            <el-form-item label="密码" class="password_label">
                <el-input v-model="formData.password" placeholder="请输入您的密码" type="password"></el-input>
            </el-form-item>
            <div class="click_place">
                <el-button type="primary" @click="submitClick">确认</el-button>
                <el-button type="danger" @click="cancelClick">取消</el-button>
            </div>
        </el-form>
    </div>
</template>
<script setup>
import service from "../../request/http.js";
import { ref } from 'vue'
import { reactive } from 'vue'

const formData = reactive({
    username: '',
    password: ''
})

const submitClick = () => {
    let username = formData.username;
    let password = formData.password;
    service.post("/api/auth/login", {
        username: username,
        password: password

    }).then((response) => {
        sessionStorage.setItem("isLogin", 1)
        sessionStorage.setItem("username", response.data.username);
        doCloseWindow();
    });
}

const emit = defineEmits(['doClose'])
const cancelClick = () => {
    doCloseWindow() // 触发事件并传递值
}
function doCloseWindow() {
    emit('doClose', 1)
}
</script>
<style>
.login_form {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    height: 16rem;
    width: 30rem;
    background-color: white;
    flex-direction: column;
    display: flex;
    border-radius: 8px;
}

.title {
    font-weight: 500;
    font-size: 1.3rem;
    text-align: center;
}

.username_label,
.password_label {
    margin: 0 auto;
    padding-top: 1rem;
    width: 20rem;
    text-align: center;
}

.click_place {
    padding-top: 2rem;
    text-align: center;
}
</style>