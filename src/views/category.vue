<template>
	<div>
		<div class="container">
			<div class="handle-box">

				<!-- <el-input v-model="query.name" placeholder="种类名称" class="handle-input mr10"></el-input>
				<el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button> -->
				<el-button type="primary" :icon="Plus" @click="handleAdd()">新增</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column label="ID" width="55" align="center">
					<template #default="scope">
						{{ scope.$index + 1 }}
					</template>

				</el-table-column>
				<el-table-column prop="categoryName" label="种类名"></el-table-column>

				<el-table-column label="操作" width="220" align="center">
					<template #default="scope">
						<el-button text :icon="Edit" @click="handleEdit(scope.$index, scope.row)" v-permiss="2">
							编辑
						</el-button>
						<el-button text :icon="Delete" class="red" @click="handleDelete(scope.row.categoryId)"
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
		<el-dialog :title="dialogName" v-model="editVisible" width="30%">
			<el-form label-width="70px">
				<el-form-item label="类别名">
					<el-input v-model="form.categoryName"></el-input>
				</el-form-item>

			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
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

interface TableItem {
	categotyId: string;
	categoryName: string;
}


const tableData = ref<TableItem[]>([]);
const pageTotal = ref(0);

// 获取数据
const getData = () => {
	instance({
		url: '/admin/category/get',
		data: {
			currentPage: query.currentPage,
			pageSize: query.pageSize,
		}
	}).then(res => {
		tableData.value = res.data
		pageTotal.value = res.total
	})
}

const query = reactive({
	// address: '',
	// name: '',
	currentPage: 1,
	pageSize: 10
});

getData()




// 分页导航
const handlePageChange = (val: number) => {
	query.currentPage = val;
	getData();
};

// 删除操作
const handleDelete = (categoryId: number) => {
	// 二次确认删除
	ElMessageBox.confirm('确定要删除吗？', '提示', {
		type: 'warning'
	}).then(() => {
		ElMessageBox.confirm('当前操作会删除该类别下所有商品，是否删除？', '提示', {
			type: 'warning'
		}).then(() => {

			instance({
				url: '/admin/category/del',
				data: {
					categoryId: categoryId
				}
			}).then(res => {
				getData()
			})
		});

	});
};

// 表格编辑时弹窗和保存
const editVisible = ref(false);

let form = reactive({
	categoryId: '',
	categoryName: ''
});


const dialogName = ref()

const handleEdit = (index: number, row: any) => {
	form.categoryId = row.categoryId;
	form.categoryName = row.categoryName;
	dialogName.value = '编辑'
	editVisible.value = true;
};
const saveEdit = () => {
	editVisible.value = false;

	if (dialogName.value == '添加') {
		instance({
			url: '/admin/category/add',
			data: {
				categoryName: form.categoryName
			}
		}).then(res => {
			getData()
		})
	} else if (dialogName.value == '编辑') {
		instance({
			url: '/admin/category/update',
			data: {
				categoryId: form.categoryId,
				categoryName: form.categoryName
			}
		}).then(res => {
			getData()
		})
	}



};


const handleAdd = () => {
	form.categoryId = ''
	form.categoryName = ''
	editVisible.value = true
	dialogName.value = '添加'
}

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
