<template>
    <div class="add_tabs">
        <div class="search_class">添加</div>
        <div class="search_bar">
            <el-input class="search_input" type="text" placeholder="请输入需要添加询的用户名或群名称..." v-model="friendUserName" />
            <el-button type="primary" round @click="addFriend()"> 添加 </el-button>
        </div>
        <el-radio-group v-model="radio1">
            <el-radio value="1" size="large">添加好友</el-radio>
            <el-radio value="2" size="large">加入群聊</el-radio>
            <el-radio value="3" size="large">新建群聊</el-radio>
        </el-radio-group>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import service from "../../request/http.js";
import { ElMessage } from 'element-plus';
const radio1 = ref('1')
const friendUserName = ref('');

const addFriend = () => {
    let addtag = radio1.value;
    let username = sessionStorage.getItem("username");
    if (addtag == 1) {
        doAddFriend(username);
    } else if (addtag == 2) {
        doAddGroup(username);
    } else {
        doCreateGroup(username);
    }
}

function doAddFriend(username) {
    let friendName = friendUserName.value;
    let addFriendData = {
        username: username,
        friendUsername: friendName
    }
    service.post("/api/auth/friends/add", addFriendData).then((response) => {
        console.log(response.data);
        if (response.status == 200 && response.data.code == 200) {
            ElMessage({
                message: "添加成功。",
                type: 'success',
            })
        } else {
            console.log(response.data.code);
            ElMessage({
                message: response.data.msg,
                type: 'error',
            })
        }
        doCloseWindow();
    });
}

function doAddGroup(username) {
    let groupName = friendUserName.value;
    let addGroupOjb = {
        username: username,
        groupName: groupName
    }
    service.post("/api/auth/group/join", addGroupOjb).then((response) => {
        console.log(response.data);
        if (response.status == 200 && response.data.code == 200) {
            ElMessage({
                message: "添加成功。",
                type: 'success',
            })
        } else {
            console.log(response.data.code);
            ElMessage({
                message: response.data.msg,
                type: 'error',
            })
        }
        doCloseWindow();
    });
}

function doCreateGroup(username) {
    let groupName = friendUserName.value;
    let addGroupOjb = {
        username: username,
        groupName: groupName
    }
    service.post("/api/auth/group/create", addGroupOjb).then((response) => {
        console.log(response.data);
        if (response.status == 200 && response.data.code == 200) {
            ElMessage({
                message: "创建群组成功。",
                type: 'success',
            })
        } else {
            console.log(response.data.code);
            ElMessage({
                message: response.data.msg,
                type: 'error',
            })
        }
        doCloseWindow();
    });
}


const emit = defineEmits(['doAddFriendClose'])
function doCloseWindow() {
    emit('doAddFriendClose', 1)
}
</script>
<style>
.add_tabs {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    height: 10rem;
    width: 30rem;
    padding-left: 2rem;
    padding-right: 2rem;
    background-color: white;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    text-align: center;
    border: 1px solid rgb(201, 199, 199);
}

.title {
    height: 3rem;
    background-color: white;
    display: flex;
    flex-direction: row;
}

.search_bar {
    display: flex;
    flex-direction: row;
}

.search_input {
    margin-right: 1rem;
}

.add_boarder {
    height: 100%;
}

.search_class {
    height: 3rem;
    width: 100%;
    text-align: left;
    line-height: 3rem;
}

.add_friend {
    height: 100%;
    width: 100%;
    background-color: white;
    text-align: center;
}

.add_group {
    height: 100%;
    width: 100%;
    background-color: white;
    text-align: center;
}
</style>