import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

interface AdminUser {
    userId: number;
    userName: string;
    userAccount: string;
    userPhoneNumber: string;
    userRole: number;

}

const useAdminUserStore = defineStore('adminUserStore', () => {

    const AdminUser = reactive(<AdminUser>{})
    return { AdminUser }
});

export default useAdminUserStore