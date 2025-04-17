<template>
  <div class="container">
    <div class="text-center" style="margin-top: 100px;">
        <h1 style="font-size: 36px; margin-bottom: 20px;text-align: center;">
            欢迎使用跨语言智能聊天平台
        </h1>
        <p style="font-size: 18px; max-width: 800px; margin: 0 auto 40px;text-align: center;">
            突破语言障碍，与全球用户无缝交流。内置智能翻译和AI助手，让您的沟通更加高效便捷。
        </p>
    </div>

    <!-- 特性展示 -->
    <div style="margin-top: 80px; display: flex; justify-content: space-between; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 300px; background: white; margin: 10px; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="font-size: 24px; margin-bottom: 15px;">
                <i class="fas fa-language" style="color: #3498db;"></i> 实时翻译
            </div>
            <p>
                利用百度翻译API，实现多种语言之间的实时翻译，让不同母语的用户可以无障碍交流。
            </p>
        </div>

        <div style="flex: 1; min-width: 300px; background: white; margin: 10px; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="font-size: 24px; margin-bottom: 15px;">
                <i class="fas fa-robot" style="color: #3498db;"></i> AI助手
            </div>
            <p>
                接入星火大模型，为您提供智能问答服务，解决各类问题，提升沟通效率。
            </p>
        </div>

        <div style="flex: 1; min-width: 300px; background: white; margin: 10px; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="font-size: 24px; margin-bottom: 15px;">
                <i class="fas fa-shield-alt" style="color: #3498db;"></i> 安全可靠
            </div>
            <p>
                采用JWT token认证，确保您的聊天记录和个人信息安全加密，私密性有保障。
            </p>
        </div>
    </div>
</div>

</template>
<script setup>
</script>