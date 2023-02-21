<!-- eslint-disable prettier/prettier -->
<template>
    <div>

        <div class="user-title">
            <h3>用户列表</h3>
            <a-button type="primary" @click="() => { visible = true }">添加用户</a-button>
        </div>
        <a-table :data-source="data" style="padding: 0 5px;" :scroll="{ y: 400 }" :columns="columns">
            <template v-slot:bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'action'">
                    <span>
                        <a style="margin-right: 5px;" @click="upUserState(record)">{{ record?.State ? '禁用' : '启用' }}</a>
                        <a style="margin-right: 5px;" @click="delUserInfo(record.id)">删除</a>
                        <a @click="updataPwd(record.id)">更改密码</a>
                    </span>
                </template>
            </template>
        </a-table>
        <a-modal v-model:visible="visible" title="添加用户" :footer="null" @cancel="resetForm">
            <a-form ref="formRef" :model="formState" :rules="rules">
                <a-form-item ref="name" label="账号" name="userName">
                    <a-input v-model:value="formState.userName" />
                </a-form-item>
                <a-form-item ref="name" has-feedback label="密码" name="userPwd">
                    <a-input v-model:value="formState.userPwd" type="password" />
                </a-form-item>
                <a-form-item ref="name" has-feedback label="确认密码" name="confirmpwd">
                    <a-input v-model:value="formState.confirmpwd" type="password" />
                </a-form-item>
                <a-form-item label="用户权限" name="Grade">
                    <a-select v-model:value="formState.Grade" placeholder="选择用户权限">
                        <a-select-option value="1">管理员</a-select-option>
                        <a-select-option value="2">普通用户</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="是否启用" name="State">
                    <a-switch v-model:checked="formState.State" />
                </a-form-item>

                <a-form-item :wrapper-col="{ span: 14, offset: 9 }">
                    <a-button type="primary" @click="onSubmit">保存</a-button>
                    <a-button style="margin-left: 10px" @click="resetForm">清空</a-button>
                </a-form-item>
            </a-form>
        </a-modal>
        <a-modal v-model:visible="upPwdVisible" title="更改密码" :footer="null" @cancel="resetForm">
            <a-form ref="formRef" :model="formState" :rules="rules">
                <a-form-item ref="name" has-feedback label="密码" name="userPwd">
                    <a-input v-model:value="formState.userPwd" type="password" />
                </a-form-item>
                <a-form-item ref="name" has-feedback label="确认密码" name="confirmpwd">
                    <a-input v-model:value="formState.confirmpwd" type="password" />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 14, offset: 9 }">
                    <a-button type="primary" @click="onSubmitPwd">修改</a-button>
                    <a-button style="margin-left: 10px" @click="closePwdForm">取消</a-button>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<!-- eslint-disable prettier/prettier -->

<script setup lang="ts">



import { createVNode, onMounted, reactive, ref, toRaw } from 'vue';
import { addUser, changePwd, delUser, getUserAll, upDataState } from '@/api/api';
import { message, Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

const data = ref()
const formRef = ref();
const visible = ref<boolean>(false);
const upPwdVisible = ref<boolean>(false);
const formState = reactive({
    userName: '',
    userPwd: '',
    confirmpwd: '',
    Grade: '1',
    State: true,
    id: 0
});
const getUserInfo = async () => {
    const res = await getUserAll()
    console.log(res);

    if (res.status) {
        data.value = res.data.map((item: any) => {
            item.StateText = item.State ? '启用' : '停用'
            switch (item.Grade) {
                case 1:
                    item.Grade = '管理员'; break;
                default: item.Grade = '普通用户'
            }
            return item
        })
    }
}
onMounted(() => {
    getUserInfo()

})
const delUserInfo = async (id: number) => {
    Modal.confirm({
        title: '删除提示',
        icon: createVNode(ExclamationCircleOutlined),
        content: '确认要删除此账号?',
        okText: '确定',
        cancelText: '取消',
        async onOk() {
            try {
                const res = await delUser(id)
                if (res.status) {
                    message.success(res.statusText)
                    getUserInfo()
                }
            } catch {
                return console.log('Oops errors!');
            }
        }
    })
}
const upUserState = async ({ id, State }: any) => {
    const res: any = await upDataState(id, !State)
    if (res.status) {
        getUserInfo()
    }
    message.success(`${!State ? '启用' : '禁用'}${res.message}`)

}
const validatePass = async (rule: any, value: any) => {
    if (value === '') {
        return Promise.reject('请确认密码');
    } else if (value !== formState.userPwd) {
        return Promise.reject("两次密码不一致");
    } else {
        return Promise.resolve();
    }
};

const onSubmit = () => {
    formRef.value
        .validate()
        .then(async () => {
            console.log('values', formState, toRaw(formState));
            const { userName, userPwd, Grade, State } = formState
            const res = await addUser(userName, userPwd, Number(Grade), State)
            console.log(res);
            if (res.status) {
                message.success(res.statusText)
                getUserInfo()
                visible.value = false
                // modal.destroy()
                formRef.value.resetFields();
                return true
            }

            message.error(res.statusText)
        })
        .catch((error: any) => {
            console.log('error', error);
        });
};


const onSubmitPwd = () => {
    formRef.value
        .validate()
        .then(async () => {
            console.log('values', formState, toRaw(formState));
            const { userPwd, id } = formState
            const res = await changePwd(Number(id), userPwd)
            if (res.status) {
                message.success(res.statusText)
                getUserInfo()
                upPwdVisible.value = false
                formRef.value.resetFields();
                return true
            }

            message.error(res.statusText)
        })
        .catch((error: any) => {
            console.log('error', error);
        });
};
const closePwdForm = () => {
    formRef.value.resetFields();
    upPwdVisible.value = false

}
const resetForm = () => {
    formRef.value.resetFields();
};

const updataPwd = (id: number) => {
    upPwdVisible.value = true
    formState.id = id
}
const columns = [
    {
        title: '用户名称',
        dataIndex: 'userName',
        width: 150,
        align: 'center'

    },
    {
        title: '用户权限',
        dataIndex: 'Grade',
        width: 120,
        align: 'center'
    },
    {
        title: '状态',
        dataIndex: 'StateText',
        width: 120,
        align: 'center'
    },
    {
        title: '操作',
        dataIndex: 'action',
        width: 120,
        align: 'center'
    },
]

const rules = {
    userName: [
        {
            required: true,
            message: '请输入名字',
            trigger: 'blur',
        }
    ],
    userPwd: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
        },
    ],
    confirmpwd: [
        {
            required: true,
            validator: validatePass,
            trigger: 'blur',
        },
    ],
    Grade: [
        {
            required: true,
            message: '请选择用户权限',
            trigger: 'change',
        },
    ],
};


</script>
<!-- eslint-disable prettier/prettier -->

<style lang="less" scoped>
.user-title {
    display: flex;
    justify-content: space-between;
    margin: 12px;
}
</style>
