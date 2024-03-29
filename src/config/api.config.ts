export const API_URL = `${process.env.APP_URL}/api`

export const getAuthUrl = (string: string) => `/auth${string}`
export const getUsersUrl = (string: string) => `/users${string}`
export const getTagsUrl = (string: string) => `/tag${string}`
export const getWorkUrl = (string: string) => `/work${string}`
export const getServicePrice = (string: string) => `/service-price${string}`
export const getMessageUrl = (string: string) => `/message${string}`
