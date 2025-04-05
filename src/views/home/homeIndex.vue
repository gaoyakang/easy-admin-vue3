<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12" style="padding-left: 20px">
        <h2 class="section-title">
          easy-admin后台管理框架：v{{ version }}
          <el-tag type="danger" style="margin-left: 5px">免费开源</el-tag>
        </h2>

        <p class="description">
          easy-admin管理系统使用nestjs实现，她可以用于所有的Web应用程序，如网站管理后台，网站会员中心，CMS，CRM，OA等等，当然，您也可以对她进行深度定制，以做出更强系统。所有前端后台代码封装过后十分精简易上手，出错概率低。系统会陆续更新一些实用功能。
        </p>
        <div class="buttons">
          <el-button
            type="primary"
            size="mini"
            icon="MostlyCloudy"
            plain
            @click="goTarget('https://github.com/gaoyakang/easy-admin-vue3')"
          >
            访问github
          </el-button>
          <el-button
            size="mini"
            icon="HomeFilled"
            plain
            @click="goTarget('http://localhost:3000/api/')"
          >
            访问文档
          </el-button>
        </div>
      </el-col>

      <el-col :sm="24" :lg="12" style="padding-left: 50px">
        <el-row>
          <el-col :span="12">
            <h2 class="section-title">技术选型</h2>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <h4 class="tech-title">后端技术</h4>
            <ul class="tech-list">
              <li>node</li>
              <li>nestjs</li>
              <li>typeorm</li>
              <li>redis</li>
              <li>mysql</li>
              <li>...</li>
            </ul>
          </el-col>
          <el-col :span="6">
            <h4 class="tech-title">前端技术</h4>
            <ul class="tech-list">
              <li>Vue3</li>
              <li>Element-Plus</li>
              <li>Axios</li>
              <li>Sass</li>
              <li>...</li>
            </ul>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-divider />
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="info-card">
          <template v-slot:header>
            <div class="card-header">
              <span>联系信息</span>
            </div>
          </template>
          <div class="card-body">
            <el-link href="https://github.com/gaoyakang" target="_blank">
              gaoyakang
            </el-link>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="info-card">
          <template v-slot:header>
            <div class="card-header">
              <span>更多优质产品</span>
            </div>
          </template>
          <div class="card-body">
            <p>
              <el-link href="https://mrx.wiki" target="_blank">
                online-logisim
              </el-link>
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="info-card">
          <template v-slot:header>
            <div class="card-header">
              <span>贡献者</span>
            </div>
          </template>
          <div class="card-body">
            <p>
              <el-link href="https://github.com/gaoyakang" target="_blank">
                gaoyakang
              </el-link>
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const version = ref('1.0.0');

function goTarget(url) {
  window.open(url, '__blank');
}
</script>

<style scoped lang="scss">
.home {
  font-family: 'Open Sans', 'Helvetica Neue', Arial, sans-serif;
  color: #333;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  .section-title {
    font-size: 24px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }

  .description {
    font-size: 14px;
    line-height: 1.8;
    color: #777;
    margin-bottom: 20px;
  }

  .version {
    font-size: 14px;
    margin-bottom: 10px;
    color: #666;
  }

  .tag {
    margin-bottom: 15px;
  }

  .buttons {
    display: flex;
    gap: 10px;
    margin-top: 15px;
  }

  .tech-title {
    font-size: 16px;
    font-weight: 500;
    color: #2c3e50;
    margin-bottom: 10px;
  }

  .tech-list {
    list-style-type: none;
    padding-left: 0;
    margin: 0;
    li {
      padding: 5px 0;
      font-size: 14px;
      color: #666;
      border-bottom: 1px dashed #eee;
    }
  }

  .info-card {
    margin-bottom: 20px;
    border-radius: 8px;
    overflow: hidden;
    transition:
      transform 0.3s,
      box-shadow 0.3s;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .card-header {
      background-color: #f5f7fa;
      padding: 12px 15px;
      font-weight: 500;
      color: #2c3e50;
    }

    .card-body {
      padding: 15px;
      font-size: 14px;
    }
  }

  .el-link {
    color: #409eff;
    font-weight: 500;
    transition: color 0.3s;

    &:hover {
      color: #66b1ff;
    }
  }
}
</style>
