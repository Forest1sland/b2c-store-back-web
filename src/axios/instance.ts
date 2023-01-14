import axios from "axios";
import { ElMessage } from "element-plus";

import { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

class Request {
    private instance: AxiosInstance | undefined

    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config)
    }
    request(config: AxiosRequestConfig): Promise<AxiosResponse> {
        return new Promise<AxiosResponse>((resolve, reject) => {
            this.instance?.request(config)
                .then((res) => {
                    ElMessage(res.data.msg)
                    if (res.data.code == '200') {
                        resolve(res.data.data);
                    }

                })
                .catch((err) => {
                    if (err.response.data.status != '200') {
                        ElMessage.error(err.message)
                    }
                    reject(err);
                })
        })
    }
}
const instance = new Request({
    url: '/api',
    method: 'post'
})
export default instance