import { defineStore } from 'pinia';
import { ref } from 'vue';
const useSidebarStore = defineStore('sidebar', () => {

	const collapse = ref(false)


	const handleCollapse = () => {
		collapse.value = !collapse.value;
	}
	return { collapse, handleCollapse }
})
export default useSidebarStore