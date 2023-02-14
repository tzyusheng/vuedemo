<!-- eslint-disable prettier/prettier -->

<template>
    <a-sub-menu :key="menuInfo?.key">
        <template #icon>
            <!-- <MailOutlined /> -->
            <component :is="menuInfo?.icon" />

        </template>
        <template #title>{{ menuInfo?.title }}</template>
        <template v-for="item in menuInfo?.children" :key="item.key">
            <template v-if="!item.children">
                <a-menu-item :key="item.key" @click="menuTo(item?.name)">
                    <template #icon>
                        <!-- <PieChartOutlined /> -->
                        <component :is="item.icon" />
                    </template>
                    {{ item.title }}
                </a-menu-item>
            </template>
            <template v-else>
                <SubMenu :menu-info="item" :key="item.key" :menuTo="menuTo" />
            </template>
        </template>
    </a-sub-menu>
</template>
<!-- eslint-disable prettier/prettier -->

<script lang="ts" setup>
import { defineProps } from 'vue'
import SubMenu from './LeftNavItem.vue'
defineProps(["menuInfo", "menuTo"])
</script>