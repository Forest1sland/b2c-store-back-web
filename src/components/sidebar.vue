<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="sidebar.collapse"
            background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <!-- 有子项 -->
                <template v-if="item.subs">
                    <!-- 权限设置v-premiss 有权限显示该菜单项，没有不显示 -->
                    <el-sub-menu :index="item.index" :key="item.index" v-permiss="item.permiss">
                        <template #title>
                            <el-icon>
                                <component :is="item.icon"></component>
                            </el-icon>
                            <span>{{ item.title }}</span>
                        </template>
                        <!-- 显示子项 -->
                        <template v-for="subItem in item.subs">
                            <el-menu-item :index="subItem.index" v-permiss="item.permiss">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-sub-menu>
                </template>
                <!-- 没有子项 -->
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index" v-permiss="item.permiss">
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import useSidebarStore from '../store/sidebar';
import { useRoute } from 'vue-router';

/**
 * icon 列表图标
 * index 路由路径
 * title 标题
 * permiss 权限设置
 * subs 子项列表
 */
const items = [
    {
        icon: 'Odometer',
        index: '/dashboard',
        title: '系统首页',
        permiss: '1',
    },
    {
        icon: 'Calendar',
        index: '1',
        title: '用户管理',
        permiss: '2',
        subs: [
            {
                index: '/user',
                title: '用户列表',
                permiss: '2',
            },
        ],
    },

    {
        icon: 'Edit',
        index: '3',
        title: '订单管理',
        permiss: '2',
        subs: [
            {
                index: '/category',
                title: '分类列表',
                permiss: '2',
            },
            {
                index: '/product',
                title: '商品列表',
                permiss: '2',
            },
            {
                index: '/order',
                title: '订单列表',
                permiss: '2',
            },
        ],
    },

];

const route = useRoute();
const onRoutes = computed(() => {
    return route.path;
});

const sidebar = useSidebarStore();
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
    width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}

.sidebar>ul {
    height: 100%;
}
</style>
