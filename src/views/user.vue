<template>
	<div>
		<div class="container">
			<div class="handle-box">
				<el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
				<el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
				<el-button type="primary" :icon="Plus">新增</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column label="ID" width="55" align="center">
					<template #default="scope">
						{{ scope.$index + 1 }}
					</template>
				</el-table-column>
				<el-table-column prop="userName" label="用户名"></el-table-column>
				<el-table-column prop="password" label="密码"></el-table-column>
				<el-table-column label="手机号">
					<template #default="scope">{{ scope.row.userPhoneNumber }}</template>
				</el-table-column>

				<el-table-column label="操作" width="220" align="center">
					<template #default="scope">
						<el-button text :icon="Edit" @click="handleEdit(scope.$index, scope.row)" v-permiss="2">
							编辑
						</el-button>
						<el-button text :icon="Delete" class="red" @click="handleDelete(scope.row.userId)"
							v-permiss="2">
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination background layout="total, prev, pager, next" :current-page="query.currentPage"
					:page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
			</div>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog title="编辑" v-model="editVisible" width="30%">
			<el-form label-width="70px" ref="ruleFormRef" :rules="rules" :model="form">
				<el-form-item label="手机号" prop="userPhoneNumber">
					<el-input v-model="form.userPhoneNumber"></el-input>
				</el-form-item>
				<el-form-item label="用户名" prop="userName">
					<el-input v-model="form.userName"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="form.password"></el-input>
				</el-form-item>

			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit(ruleFormRef)">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
import { instance } from '../utils/instance';
import type { FormInstance, FormRules } from 'element-plus'

interface TableItem {
	userId: number,
	userName: string,
	password: string,
	userPhoneNumber: string
}

const query = reactive({
	// address: '',
	// name: '',
	currentPage: 1,
	pageSize: 10
});
const tableData = ref<TableItem[]>([]);
const pageTotal = ref(0);
// 获取用户数据
const getData = () => {
	instance({
		url: '/admin/user/get',
		data: {
			currentPage: query.currentPage,
			pageSize: query.pageSize,
		}
	}).then(res => {
		console.log(res);
		tableData.value = res.data
		pageTotal.value = res.total
	})
}

getData()

// 查询操作
const handleSearch = () => {
	query.currentPage = 1;
	// getData();
};
// 分页导航
const handlePageChange = (val: number) => {
	query.currentPage = val;
	getData();
};

// 删除操作
const handleDelete = (userId: number) => {
	// 二次确认删除
	ElMessageBox.confirm('确定要删除吗？', '提示', {
		type: 'warning'
	})
		.then(() => {
			ElMessage.success('删除成功');
			// tableData.value.splice(index, 1);

			instance({
				url: '/admin/user/delete',
				data: {
					userId: userId,
				}
			}).then(res => {
				console.log(res);
				getData()

			})
		})
		.catch(() => { });
};

// 表格编辑时弹窗和保存
const editVisible = ref(false);
const form = reactive({
	userId: '',
	userName: '',
	password: '',
	userPhoneNumber: ''
});
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
	userName: [
		{ required: true, message: '请输入用户名', trigger: 'blur' },
		// { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
	],
	password: [
		{
			required: true,
			message: '请输入密码',
			trigger: 'blur',
		},
	],
	userPhoneNumber: [
		{
			required: true,
			message: '请输入手机号',
			trigger: 'blur',
		},
	],

})



const handleEdit = (index: number, row: any) => {
	form.userId = row.userId;
	form.userName = row.userName;
	form.userPhoneNumber = row.userPhoneNumber
	editVisible.value = true;
};
const saveEdit = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		if (valid) {
			instance({
				url: '/admin/user/update',
				data: {
					userId: form.userId,
					password: form.password,
					userPhoneNumber: form.userPhoneNumber,
				}
			}).then(res => {
				getData()
			})
		} else {
			console.log('error submit!', fields)
		}
	})

	editVisible.value = false;

};
</script>

<style scoped>
.handle-box {
	margin-bottom: 20px;
}

.handle-select {
	width: 120px;
}

.handle-input {
	width: 300px;
}

.table {
	width: 100%;
	font-size: 14px;
}

.red {
	color: #F56C6C;
}

.mr10 {
	margin-right: 10px;
}

.table-td-thumb {
	display: block;
	margin: auto;
	width: 40px;
	height: 40px;
}
</style>
