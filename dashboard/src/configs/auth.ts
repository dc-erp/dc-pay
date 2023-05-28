export default {
  dataEndPoint: "https://188.166.173.4/api/v1",
  meEndpoint: "https://188.166.173.4/api/v1/auth/me",
  loginEndpoint: "https://188.166.173.4/api/v1/auth/login",
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'dcPayrollToken',
  onTokenExpiration: 'logout' // logout | refreshToken
}
