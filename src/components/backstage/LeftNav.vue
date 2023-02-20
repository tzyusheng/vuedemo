<!-- eslint-disable prettier/prettier -->

<template>
    <div>
        <slot></slot>
        <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline" theme="dark"
            :collapsed="collapsed">
            <template v-for="item in list" :key="item.key">
                <template v-if="!item.children">
                    <a-menu-item :key="item.key" @click="menuTo(item?.name)">
                        <template #icon>
                            <component :is="item.icon" />
                        </template>
                        {{ item.title }}
                    </a-menu-item>
                </template>
                <template v-else>
                    <SubMenu :key="item.key" :menu-info="item" :menuTo="menuTo" />
                </template>
            </template>
        </a-menu>
    </div>
</template>
<!-- eslint-disable prettier/prettier -->

<script lang="ts" setup>
import { ref, defineProps, onMounted } from 'vue';
import {
    AlignRightOutlined,
    UserOutlined
} from '@ant-design/icons-vue';
import SubMenu from "./LeftNavItem.vue"
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute()
const list = [
    {
        key: '1',
        title: '文章管理',
        icon: AlignRightOutlined,
        children: [{
            key: '1.1',
            title: '发布文章',
            name: 'newArticle'
        }, {
            key: '1.2',
            title: '删除文章',
            name: 'delArticle',

        }, {
            key: '1.3',
            title: '推荐文章',
            name: 'recommendArticle',
        }]
    },
    {
        key: '2',
        title: '用户管理',
        icon: UserOutlined,
        name: 'userMange'

    },
];

defineProps(["collapsed"])
const selectedKeys = ref([""]);
const openKeys = ref(['1']);
const menuTo = (name = "blogbackstage") => {
    router.push({
        name,
    })
}
const getopenKeys = (openKeysData: Array<string>) => {
    openKeysData.pop()
    let str = "";
    const openKeysArr = openKeysData.map((item: string, index: number) => {
        if (index === 0) {
            str += item
            return str
        }
        str += `.${item}`
        return str
    })

    return openKeysArr;
}

const selectMenuItem = (data: any) => {
    const urlStr = route.path.split("/").at(-1)
    data.forEach((item: any) => {
        if (item?.children) {
            return selectMenuItem(item?.children)
        } else {
            if (item?.name === urlStr) {
                selectedKeys.value = [item.key]
                let openKeysData = item.key.split('.');
                openKeys.value = getopenKeys(openKeysData)
            }
        }

    })
}

onMounted(() => {
    selectMenuItem(list)
})

</script>

