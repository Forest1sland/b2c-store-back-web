import { defineStore } from 'pinia';
import { ref } from 'vue';
interface ObjectList {
	[key: string]: string[];
}

export const usePermissStore = defineStore('permiss', () => {

	//登录用户
	const keys = localStorage.getItem('ms_keys');

	//权限设置
	const key = keys ? ref(JSON.parse(keys)) : ref(<string[]>[])
	const defaultList = ref(<ObjectList>{
		1: ['1', '2'],
		2: ['1']
	})



	const handleSet = (val: string[]) => {
		key.value = val;
	}
	return { keys, key, defaultList, handleSet }
});
