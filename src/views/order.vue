<template>
	<div>
		<div class="container">
			<div class="handle-box">

				<!-- <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input> -->
				<!-- <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button> -->

			</div>

			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column label="ID" width="55" align="center">
					<template #default="scope">
						{{ scope.$index + 1 }}
					</template>
				</el-table-column>
				<el-table-column prop="orderId" label="订单号"></el-table-column>
				<el-table-column label="下单用户">
					<template #default="scope">{{ scope.row.userId }}</template>
				</el-table-column>
				<el-table-column label="下单种类" align="center">
					<template #default="scope">
						{{ scope.row.detailList.length }}
					</template>
				</el-table-column>
				<el-table-column label="下单总数" align="center">
					<template #default="scope">
						{{
							scope.row.detailList.reduce((prev: number, cur: OrderDetail) =>
								prev + cur.productNum
								, 0)
						}}
					</template>
				</el-table-column>
				<el-table-column prop="addressId" label="地址"></el-table-column>
				<el-table-column label="订单总额" align="center">
					<template #default="scope">
						{{
							scope.row.detailList.reduce((prev: number, cur: OrderDetail) =>
								prev + cur.productNum * cur.productPrice
								, 0)
						}}
					</template>
				</el-table-column>

				<el-table-column prop="date" label="下单时间"></el-table-column>

			</el-table>
			<div class="pagination">
				<el-pagination background layout="total, prev, pager, next" :current-page="query.currentPage"
					:page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
			</div>
		</div>

	</div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
import { instance } from '../utils/instance'
interface OrderDetail {
	detailId: number;
	orderId: number,
	productId: number,
	productName: string,
	productNum: number,
	productPicture: string,
	productPrice: number,
}
interface TableItem {
	addressId: number;
	detailList: OrderDetail[];
	orderId: number;
	userId: number;
	userName: string;
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
		url: '/admin/order/getAll',
		data: {
			currentPage: query.currentPage,
			pageSize: query.pageSize,
		}
	}).then(res => {
		tableData.value = res.data
		pageTotal.value = res.total
	})
};
getData();


// 查询操作
// const handleSearch = () => {
// 	query.currentPage = 1;
// 	getData();
// };
// 分页导航
const handlePageChange = (val: number) => {
	query.currentPage = val;
	getData();
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
