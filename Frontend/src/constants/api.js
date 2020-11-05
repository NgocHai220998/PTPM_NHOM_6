import AppConfig from './config'

let envConfig = AppConfig.prod

if (process.env.NODE_ENV === 'development') {
  envConfig = AppConfig.dev
}
if (process.env.NODE_ENV === 'local') {
  envConfig = AppConfig.local
}

const config = envConfig

const API = {
  REGISTER: `${config.BACKEND_ADDRESS}/api/users`,
  LOGIN: `${config.BACKEND_ADDRESS}/api/users/login`,
  FORGOT_PASSWORD: `${config.BACKEND_ADDRESS}/api/users/forgot-password`,
  GET_CODE: `${config.BACKEND_ADDRESS}/api/users/send-email-code`,
  SEND_EMAIL_REGISTER: `${config.BACKEND_ADDRESS}/api/users/send-email-register`
}

const SOCKET_EVENT = {
  socket: 'socket'
}

export {
  API,
  SOCKET_EVENT
}
