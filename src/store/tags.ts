import { defineStore } from 'pinia';
import { computed, ref, Ref } from 'vue';

interface ListItem {
	name: string;
	path: string;
	title: string;
}

const useTagsStore = defineStore('tags', () => {

	const list = ref(<ListItem[]>[])

	const show = computed(() => {
		return list.value.length > 0;
	})

	const nameList = computed(() => {
		return list.value.map(item => item.name);
	})

	const delTagsItem = (index: number) => {
		list.value.splice(index, 1)
	}


	const setTagsItem = (data: ListItem) => {
		list.value.push(data);
	}
	const clearTags = () => {
		list.value = [];
	}
	const closeTagsOther = (data: ListItem[]) => {
		list.value = data;
	}
	const closeCurrentTag = (data: any) => {
		for (let i = 0, len = list.value.length; i < len; i++) {
			const item = list.value[i];
			if (item.path === data.$route.fullPath) {
				if (i < len - 1) {
					data.$router.push(list.value[i + 1].path);
				} else if (i > 0) {
					data.$router.push(list.value[i - 1].path);
				} else {
					data.$router.push('/');
				}
				list.value.splice(i, 1);
				break;
			}
		}
	}

	return { list, nameList, show, delTagsItem, setTagsItem, clearTags, closeTagsOther, closeCurrentTag }
})

export default useTagsStore