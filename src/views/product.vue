<template>
	<div>
		<div class="container">
			<div class="handle-box">

				<!-- <el-input v-model="query.name" placeholder="商品名称" class="handle-input mr10"></el-input> -->
				<!-- <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button> -->
				<el-button type="primary" :icon="Plus">新增</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column label="ID" width="55" align="center">
					<template #default="scope">
						{{ scope.$index + 1 }}
					</template>
				</el-table-column>
				<el-table-column label="商品图片">

					<template #default="scope">
						<img :src="scope.row.productPicture.includes('http:') ? scope.row.productPicture : 'http://127.0.0.1:3000/' + scope.row.productPicture"
							class="img" height="80" width="80" :alt="scope.row.productName">
					</template>


				</el-table-column>
				<el-table-column prop="productName" label="商品名称"></el-table-column>
				<el-table-column label="商品分类">
					<template #default="scope">
						{{ categoryMap.get(scope.row.categoryId) }}
					</template>
				</el-table-column>
				<el-table-column prop="productTitle" label="商品简介"></el-table-column>
				<el-table-column prop="productIntro" label="商品规格"></el-table-column>

				<el-table-column prop="productPrice" label="商品原价"></el-table-column>
				<el-table-column prop="productSellingPrice" label="商品特价"></el-table-column>

				<el-table-column label="操作" width="220" align="center">
					<template #default="scope">
						<el-button text :icon="Edit" @click="handleEdit(scope.$index, scope.row)" v-permiss="2">
							编辑
						</el-button>
						<el-button text :icon="Delete" class="red" @click="handleDelete(scope.$index)" v-permiss="2">
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
			<el-form label-width="70px">
				<el-form-item label="商品图片">
					<el-input v-model="form.productName"></el-input>
				</el-form-item>
				<el-form-item label="商品名称">
					<el-input v-model="form.productName"></el-input>
				</el-form-item>


				<el-form-item label="商品类别">
					<el-select v-model="form.categoryId" placeholder="Select">
						<el-option v-for="(item, index) in category" :key="index" :label="item.categoryName"
							:value="item.categoryId" />
					</el-select>
				</el-form-item>


				<el-form-item label="商品简介">
					<el-input v-model="form.address"></el-input>
				</el-form-item>
				<el-form-item label="商品规格">
					<el-input v-model="form.address"></el-input>
				</el-form-item>
				<el-form-item label="商品原价">
					<el-input v-model="form.address"></el-input>
				</el-form-item>
				<el-form-item label="商品特价">
					<el-input v-model="form.address"></el-input>
				</el-form-item>



				<!-- <el-selection label="商品分类"></el-selection> -->
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
	productId: number;
	productName: string;
	categoryId: string;
	categoryName: string;
	productTitle: string;
	productIntro: string;
	productPicture: string;
	productPrice: string;
	productSellingPrice: string;
	productNum: string;
	productSales: string;
}

interface Category {
	categoryId: number;
	categoryName: string;
}

const query = reactive({
	// address: '',
	// name: '',
	currentPage: 1,
	pageSize: 10
});
const tableData = ref<TableItem[]>([]);
const pageTotal = ref(0);
// 获取表格数据
const getData = () => {
	instance({
		url: '/admin/product/getAll',
		data: {
			currentPage: query.currentPage,
			pageSize: query.pageSize,
		}
	}).then(res => {
		tableData.value = res.data
		pageTotal.value = res.total
	})
}
const category = ref<Category[]>([])
let categoryMap = new Map()


const getCategory = (currentPage: number, pageSize: number) => {
	instance({
		url: '/admin/category/get',
		data: {
			currentPage: currentPage,
			pageSize: pageSize,
		}
	}).then(res => {
		res.data.forEach(element => {
			categoryMap.set(element.categoryId, element.categoryName)
		});
		category.value = res.data
	})
}
getData()

getCategory(1, 100)
// 查询操作
const handleSearch = () => {
	// query.currentPage = 1;
	// getData();
};
// 分页导航
const handlePageChange = (val: number) => {
	query.currentPage = val;
	getData();
};

// 删除操作
const handleDelete = (index: number) => {
	// 二次确认删除
	ElMessageBox.confirm('确定要删除吗？', '提示', {
		type: 'warning'
	})
		.then(() => {
			ElMessage.success('删除成功');
			tableData.value.splice(index, 1);
		})
		.catch(() => { });
};

// 表格编辑时弹窗和保存
const editVisible = ref(false);

let form = reactive({
	productName: '',
	address: '',
	categoryId: '',
	productTitle: '',
	productIntro: '',
	productPrice: '',
	productSellingPrice: '',

});

const handleEdit = (index: number, row: any) => {

	form.name = row.name;
	form.address = row.address;
	editVisible.value = true;
};
const saveEdit = () => {
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
