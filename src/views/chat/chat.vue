<template>
    <div class="chat-container">
        <!-- 侧边栏 - 好友列表 -->
        <div class="sidebar">
            <div class="user-search">
                <el-input v-model="friend_name" placeholder="搜索好友..." type="text"></el-input>
            </div>
            <div class="friends-list" id="friendsList">
                <!-- 好友列表项将通过JavaScript动态生成 -->
            </div>
        </div>

        <!-- 聊天主区域 -->
        <div class="chat-main">
            <div class="chat-header">
                <div class="chat-user-info">
                    <div class="chat-user-avatar">用户</div>
                    <div class="chat-user-name" id="chatTitle">选择一个好友开始聊天</div>
                </div>
                <div class="chat-actions">
                    <button class="chat-action-button" id="addFriendBtn"><i class="fas fa-user-plus"></i></button>
                    <button class="chat-action-button" id="toggleAIBtn"><i class="fas fa-robot"></i></button>
                </div>
            </div>
            <div class="chat-messages" id="chatMessages">
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
                    <textarea class="chat-input" id="messageInput" placeholder="输入消息..."></textarea>
                    <button class="chat-send-btn" id="sendButton"><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>
        </div>

        <!-- AI助手区域 -->
        <div class="ai-assistant-container" id="aiAssistantPanel">
            <div class="ai-assistant-header">
                <h3>智能问答</h3>
            </div>
            <div class="ai-assistant-chat" id="aiResponseContainer">
                <!-- AI助手的聊天记录 -->
            </div>
            <div class="ai-input-container">
                <div class="ai-input-wrapper">
                    <input type="text" class="ai-input" id="aiQuestionInput" placeholder="输入问题...">
                    <button class="ai-send-btn" id="submitAIBtn"><i class="fas fa-paper-plane"></i></button>
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
import { onMounted } from 'vue'
onMounted(() => {
    let isLogin = sessionStorage.getItem("isLogin");
    if (isLogin == "success") {

    }
})
</script>
<style>
/* 聊天界面布局 */
.chat-container {
    display: flex;
    height: calc(100vh - 80px);
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
    padding: 15px;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
}

.message {
    display: flex;
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
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 24px;
    font-size: 14px;
    resize: none;
    height: 48px;
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
    padding: 15px;
    border-bottom: 1px solid #eaeaea;
    font-weight: 500;
    text-align: center;
    color: #3498db;
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
</style>