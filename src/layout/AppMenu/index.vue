<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#304156"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
    :collapse="$store.state.isCollapse"
    router
  >
    <el-menu-item index="/">
      <el-icon><House /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu index="/product">
      <template #title>
        <el-icon><location /></el-icon>
        <span>商品管理</span>
      </template>
      <el-menu-item index="/product/product_list">
        <el-icon><location /></el-icon>
        商品列表
      </el-menu-item>
      <el-menu-item index="/product/product_classify">
        <el-icon><location /></el-icon>
        商品分类
      </el-menu-item>
      <el-menu-item index="/product/product_attr">
        <el-icon><location /></el-icon>
        商品规格
      </el-menu-item>
      <el-menu-item index="/product/product_replay">
        <el-icon><location /></el-icon>
        商品评论
      </el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="/order">
      <template #title>
        <el-icon><location /></el-icon>
        <span>订单</span>
      </template>
      <el-menu-item index="/order/order_list">
        订单列表
      </el-menu-item>
      <el-menu-item index="/order/order_offline">
        订单在线
      </el-menu-item>
    </el-sub-menu>

    <el-menu-item
      index="/media"
    >
      <el-icon><document /></el-icon>
      <span>媒体</span>
    </el-menu-item>

    <el-sub-menu index="/permission">
      <template #title>
        <el-icon><location /></el-icon>
        <span>权限</span>
      </template>
      <el-menu-item index="/permission/permission_role">
        角色
      </el-menu-item>
      <el-menu-item index="/permission/permission_admin">
        管理员
      </el-menu-item>
      <el-menu-item index="/permission/permission_rule">
        权限规则
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
<script lang="ts" setup>

</script>
<style lang="scss" scoped>
.el-menu{
  border-right: none;
}
.el-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
