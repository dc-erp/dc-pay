import axios from 'axios'

export const apiRequest = axios.create({
    baseURL: 'http://localhost:4000/api/v1',
    withCredentials: true,
})

interface userData {
    organizationId: string;
    userId: string;
}

const getLocalStorageData = (): userData => {
    // @ts-ignore
    const userData = JSON.parse(window.localStorage.getItem('userData'))

    return { organizationId: userData?.organizationId, userId: userData?.id }
}

apiRequest.interceptors.request.use((config: any) => {
    const { userId, organizationId } = getLocalStorageData()
    if (organizationId) {
        config.headers['X-Organization-Id'] = organizationId;
    }
    if (userId) {
        config.headers['X-User-Id'] = userId;
    }

    return config;
});


export default apiRequest

const buildDefaultParams = (req: any) => ({
    baseURL: 'http://localhost:4000/api/v1',
    withCredentials: true,
    headers: req ? req.headers ? req.headers.cookie ? { cookie: req.headers.cookie } : undefined : undefined : undefined
})

export const getInitialProps = async (url: any, ctx: any, Router: any, options: any = {}) => {
    try {
        const res = await axios({
            method: 'get',
            url,
            ...buildDefaultParams(ctx.req),
            ...options
        })

        return res
        
    } catch (e: any) {
        console.log(e)
    }
}
export const postData = ('u')
