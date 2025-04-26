<template>
    <div class="chat-container">
        <!-- 侧边栏 - 好友列表 -->
        <div class="sidebar">
            <div class="user-search">
                <el-input v-model="friend_name" placeholder="搜索好友..." type="text"></el-input>
            </div>
            <div class="friends-list" id="friendsList">
                <el-table :data="tableData" style="width: 100%" @row-click="handleRowClick">
                    <el-table-column prop="username" label="好友列表" />
                    <el-table-column align="right">
                        <template #default="scope">
                            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <!-- 聊天主区域 -->
        <div class="chat-main">
            <div class="chat-header">
                <div class="chat-user-info">
                    <div class="chat-user-avatar">用户</div>
                    <div class="chat-user-name" id="chatTitle">{{ chooseUsername }}</div>
                </div>
                <div class="chat-actions">
                    <button class="chat-action-button" id="addFriendBtn" @click="addFriend()"><i
                            class="fas fa-user-plus"></i></button>
                    <button class="chat-action-button" id="toggleAIBtn"><i class="fas fa-robot"></i></button>
                </div>
            </div>
            <div class="chat-messages" id="chatMessages">
                <div class="message" v-for="(message, index) in messages" :key="index">
                    <div :class="message.align === 'left' ? 'friend-usermane' : 'sender-username'">{{ message.username
                        }}
                    </div>
                    <div :class="message.align === 'left' ? 'message-left' : 'message-right'">{{ message.text }}</div>
                    <div :class="message.align === 'left' ? 'message-left' : 'message-right'"> translate: {{
                        message.translate
                        }}
                    </div>
                </div>
            </div>
            <div class="chat-input-container">
                <div class="chat-tools">
                    <button class="chat-tool-button" id="emojiBtn"><i class="fas fa-smile"></i></button>
                    <div class="language-selector">
                        <select id="messageLanguage">
                            <option value="zh">中文</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                </div>
                <div class="chat-input-wrapper">
                    <textarea v-model="sendMsg" @keyup.enter="sendMessage" class="chat-input" id="messageInput"
                        placeholder="输入消息..."></textarea>
                    <button class="chat-send-btn" id="sendButton" @click="sendMessage"><i
                            class="fas fa-paper-plane"></i></button>
                </div>
            </div>
        </div>

        <!-- AI助手区域 -->
        <div class="ai-assistant-container" id="aiAssistantPanel">
            <div class="ai-assistant-header">
                智能问答
            </div>
            <div class="ai-assistant-chat" id="aiResponseContainer">
                <div class="ai-messages" id="aiChatMessages">
                    <div class="message" v-for="(aiMessage, index) in aiMessages" :key="index">
                        <div :class="aiMessage.align === 'left' ? 'message-left' : 'message-right'">{{ aiMessage.text }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="ai-input-container">
                <div class="ai-input-wrapper">
                    <input type="text" @keyup.enter="askAiHandle" v-model="askAi" class="ai-input" id="aiQuestionInput"
                        placeholder="输入问题...">
                    <button class="ai-send-btn" id="submitAIBtn" @click="askAiHandle"><i
                            class="fas fa-paper-plane"></i></button>
                </div>
            </div>
        </div>
    </div>
    <div id="friendsModal" class="modal">
        <div class="modal-content">
            <span class="close" id="closeFriendsModal">&times;</span>
            <h3>好友管理</h3>
            <div class="friends-modal-content">
                <div class="search-container">
                    <input type="text" id="searchUserInput" placeholder="搜索用户...">
                    <button id="searchUserBtn">搜索</button>
                </div>
                <div class="modal-friends-list" id="modalFriendsList">
                    <!-- 好友列表将通过JavaScript动态生成 -->
                </div>
                <div class="search-results" id="searchResults">
                    <!-- 搜索结果将通过JavaScript动态生成 -->
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref, onUnmounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import service from "../../request/http.js";
let tableData = ref([]);
const username = sessionStorage.getItem("username");
const chooseUsername = ref("选择一个好友开始聊天");
onMounted(() => {
    service.get("/api/auth/friends/list?username=" + username).then((response) => {
        if (response.status == 200 && response.data.code == 200) {
            let dataList = response.data.data.friends;
            let friends = new Array();
            for (let username of dataList) {
                let user = {
                    username: username
                };
                console.log(user);
                friends.push(user);
            }
            console.log(friends);
            tableData.value = friends;
        } else {
            ElMessage({
                message: "系统异常，请稍后重试。",
                type: 'error',
            })
        }
    });
});

const handleRowClick = (row, column, event) => {
    let friendUsername = row.username;
    chooseUsername.value = friendUsername;
    sessionStorage.setItem("chatPartner", friendUsername);
    startHeartBeat();
}

const addFriend = () => {
    ElMessageBox.prompt('请输入用户名', '添加好友', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
    }).then(({ value }) => {
        let addFriendData = {
            username: username,
            friendUsername: value
        }
        console.log(addFriendData);
        service.post("/api/auth/friends/add", addFriendData).then((response) => {
            console.log(response.data);
            if (response.status == 200 && response.data.code == 200) {
                let user = {
                    username: value
                };
                currentFriends = tableData.value;
                currentFriends.push(user);
                tableData.value = currentFriends;
            } else {
                ElMessage({
                    message: "系统异常，请稍后重试。",
                    type: 'error',
                })
            }
        });
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '添加好友失败，请稍后再试',
        })
    })
};

let messages = ref([]);

function handleDelete(index, row) {
    let frendUsername = row.username;
    let userinfo = {
        username: username,
        friendUsername: frendUsername
    }
    service.delete("/api/auth/friends/remove", { data: userinfo }).then((response) => {
        if (response.status == 200 && response.data.code == 200) {
            let friends = tableData.value;
            friends.splice(index);
            tableData.value = friends;
        } else {
            ElMessage({
                message: "系统异常，请稍后重试。",
                type: 'error',
            })
        }
    });
}

let sendMsg = ref('');
const sendMessage = () => {
    let chatPartner = sessionStorage.getItem("chatPartner");
    if (chatPartner == null) {
        ElMessage({
            message: "请选择您的聊天对象。",
            type: 'error',
        })
        return;
    }
    let msg = sendMsg.value;
    let msgObj = {
        senderUsername: username,
        receiverUsername: chatPartner,
        content: msg
    }
    service.post("/api/auth/message/send", msgObj).then((response) => {
        if (response.status == 200 && response.data.code == 200) {
            sendHeartBeat();
        } else {
            ElMessage({
                message: "发送失败，请稍后再试",
                type: 'error',
            })
        }
    });
}

let askAi = ref('');
let aiMessages = ref([]);
let aiMsgSpeakList = new Array();
const askAiHandle = () => {
    aiMsgSpeakList = aiMessages.value;
    let msg = askAi.value;
    if (msg == 'clean') {
        aiMsgSpeakList.length = 0;
        aiMessages.value = aiMsgSpeakList;
        return;
    }
    let aiMessageList = {
        text: msg,
        align: 'right'
    }
    aiMsgSpeakList.push(aiMessageList)
    aiMessages.value = aiMsgSpeakList;
    askAi.value = '';
    let msgObj = {
        question: msg,
    }
    service.post("/api/auth/ai/ask", msgObj).then((response) => {
        if (response.status == 200 && response.data.code == 200) {
            console.log(response);
            let aiAnsower = response.data.data;
            aiAnsower = aiAnsower.replace('/\n+/g', "<br>");
            let aiAnsowerist = {
                text: aiAnsower,
                align: 'left'
            }
            aiMsgSpeakList.push(aiAnsowerist);
            aiMessages.value = aiMsgSpeakList;
        } else {
            ElMessage({
                message: "发送失败，请稍后再试",
                type: 'error',
            })
        }
    });
}


const heartBeatTimer = ref(null);
const heartBeatInterval = 3000;

const startHeartBeat = () => {
    sendHeartBeat();
    heartBeatTimer.value = setInterval(sendHeartBeat, heartBeatInterval);
}

const stopHeartBeat = () => {
    if (heartBeatTimer.value) {
        clearInterval(heartBeatTimer.value)
        heartBeatTimer.value = null
    }
}
const sendHeartBeat = () => {
    let friendUsername = sessionStorage.getItem("chatPartner");
    let url = '/api/auth/message/list?username=' + username + '&friendUsername=' + friendUsername;
    service.get(url).then(response => {
        let messageList = response.data.data;
        let currentMessages = new Array();
        for (let singleMessage of messageList) {
            console.log(singleMessage);
            let align = "";
            let senderUseranme = singleMessage.senderUsername;
            let speakUsername = "";
            if (username == senderUseranme) {
                align = "right";
            } else {
                align = "left";
                speakUsername = senderUseranme;
            }
            let message = {
                text: singleMessage.content,
                translate: singleMessage.translatedContent,
                username: speakUsername,
                align: align
            };
            currentMessages.push(message);
        }
        messages.value = currentMessages;
        sendMsg.value = "";
    }).catch(error => {
        console.error('获取聊天记录失败，请稍后再试', error);
        stopHeartBeat();
        startHeartBeat();
    })
}

onUnmounted(() => {
    stopHeartBeat()
});
</script>
<style>
/* 聊天界面布局 */
.chat-container {
    display: flex;
    height: 100%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    /* overflow: hidden; */
}

/* 侧边栏样式 */
.sidebar {
    width: 300px;
    background-color: #f9f9f9;
    border-right: 1px solid #eaeaea;
    display: flex;
    flex-direction: column;
}

/* 用户搜索 */
.user-search {
    padding: 15px;
    border-bottom: 1px solid #eaeaea;
}

.search-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

/* 好友列表 */
.friends-list {
    flex: 1;
    overflow-y: auto;
}

.friend-item {
    display: flex;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #eaeaea;
    cursor: pointer;
    transition: background-color 0.3s;
}

.friend-item:hover {
    background-color: #f0f0f0;
}

.friend-item.active {
    background-color: #e8f4fd;
    border-left: 3px solid #3498db;
}

.friend-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #3498db;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
    margin-right: 15px;
}

.friend-info {
    flex: 1;
}

.friend-name {
    font-weight: 500;
    margin-bottom: 5px;
}

.friend-status {
    font-size: 12px;
    color: #7f8c8d;
}

.friend-status.online {
    color: #2ecc71;
}

.friend-unread {
    background-color: #e74c3c;
    color: white;
    font-size: 12px;
    font-weight: bold;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 聊天区域 */
.chat-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: white;
}

/* 聊天头部 */
.chat-header {
    height: 4rem;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 1rem;
}

.chat-user-info {
    display: flex;
    align-items: center;
}

.chat-user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #3498db;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
    margin-right: 15px;
}

.chat-user-name {
    font-weight: 500;
}

.chat-actions {
    display: flex;
    padding-right: 1rem;
}

.chat-action-button {
    background: none;
    border: none;
    font-size: 18px;
    margin-left: 15px;
    cursor: pointer;
    color: #7f8c8d;
    transition: color 0.3s;
}

.chat-action-button:hover {
    color: #3498db;
}

/* 聊天消息区域 */
.chat-messages {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background-color: #f9f9f9;
    display: flex;
    flex-direction: column;

}

.message {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

.message.outgoing {
    flex-direction: row-reverse;
}

.message-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #95a5a6;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
    margin-right: 10px;
}

.message.outgoing .message-avatar {
    margin-right: 0;
    margin-left: 10px;
    background-color: #3498db;
}

.message-content {
    max-width: 70%;
}

.message-bubble {
    padding: 12px 15px;
    border-radius: 18px;
    background-color: #e8e8e8;
    position: relative;
    display: inline-block;
}

.message.outgoing .message-bubble {
    background-color: #3498db;
    color: white;
}

.message-text {
    margin-bottom: 5px;
}

.message-text-original {
    font-style: italic;
    font-size: 0.85em;
    opacity: 0.8;
    margin-top: 3px;
}

.message-time {
    font-size: 12px;
    color: #7f8c8d;
    margin-top: 5px;
}

.message.outgoing .message-time {
    text-align: right;
}

/* 聊天输入区域 */
.chat-input-container {
    padding: 15px;
    border-top: 1px solid #eaeaea;
}

.chat-input-wrapper {
    display: flex;
    position: relative;
}

.chat-input {
    flex: 1;
    padding: 1rem 1rem;
    border: 1px solid #ddd;
    border-radius: 24px;
    font-size: 14px;
    resize: none;
    height: 1rem;
    margin-right: 10px;
}

.chat-input:focus {
    outline: none;
    border-color: #3498db;
}

.chat-send-btn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #3498db;
    color: white;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s;
}

.chat-send-btn:hover {
    background-color: #2980b9;
}

.chat-tools {
    display: flex;
    margin-bottom: 10px;
}

.chat-tool-button {
    background: none;
    border: none;
    font-size: 16px;
    margin-right: 15px;
    cursor: pointer;
    color: #7f8c8d;
    transition: color 0.3s;
}

.chat-tool-button:hover {
    color: #3498db;
}

/* 语言选择 */
.language-selector {
    margin-right: 15px;
    display: flex;
    align-items: center;
}

.language-selector select {
    padding: 5px 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

/* AI助手区域 */
.ai-assistant-container {
    width: 300px;
    border-left: 1px solid #eaeaea;
    display: flex;
    flex-direction: column;
    background-color: #f9f9f9;
}

.ai-assistant-header {
    border-bottom: 1px solid #eaeaea;
    font-weight: 600;
    font-size: 1.5rem;
    text-align: center;
    color: #3498db;
    height: 4rem;
    line-height: 4rem;
}

.ai-assistant-chat {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
}

.ai-message {
    margin-bottom: 15px;
}

.ai-message-user {
    background-color: #e8f4fd;
    padding: 10px;
    border-radius: 15px 15px 15px 0;
    margin-bottom: 10px;
}

.ai-message-assistant {
    background-color: #ffffff;
    padding: 10px;
    border-radius: 15px 15px 0 15px;
    border: 1px solid #eaeaea;
}

.ai-input-container {
    padding: 15px;
    border-top: 1px solid #eaeaea;
}

.ai-input-wrapper {
    display: flex;
}

.ai-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 18px;
    font-size: 14px;
    resize: none;
    margin-right: 10px;
}

.ai-input:focus {
    outline: none;
    border-color: #3498db;
}

.ai-send-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #3498db;
    color: white;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s;
}

.ai-send-btn:hover {
    background-color: #2980b9;
}

.message-left {
    background-color: gray;
    align-self: flex-start;
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #e0e0e0;
}

.message-right {
    background-color: #42b983;
    align-self: flex-end;
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #e0e0e0;
}

.friend-usermane {
    align-self: flex-start;
}

.sender-username {
    align-self: flex-end;
}
</style>