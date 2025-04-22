<template>
    <div>
        <el-form class="login_form">
            <div class="title">
                <p>注册</p>
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
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter()
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
        console.log(response.data);
        if (response.status == 200 && response.data.code == 200) {
            let userInfo = response.data.data;
            sessionStorage.setItem("isLogin", "success");
            sessionStorage.setItem("username", userInfo.username);
            ElMessage({
                message: "登录成功。",
                type: 'success',
            })
        } else {
            ElMessage({
                message: "登录失败，请稍后重试。",
                type: 'error',
            })
        }
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