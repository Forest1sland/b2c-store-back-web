import { defineStore } from 'pinia';
import { ref } from 'vue';
interface ObjectList {
	[key: string]: string[];
}

export const usePermissStore = defineStore('permiss', () => {

	const keys = localStorage.getItem('ms_keys');

	const key = keys ? ref(JSON.parse(keys)) : ref(<string[]>[])
	const defaultList = ref(<ObjectList>{
		admin: ['1', '2'],
		user: ['1']
	})



	const handleSet = (val: string[]) => {
		key.value = val;
	}
	return { keys, key, defaultList, handleSet }
});
