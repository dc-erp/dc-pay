export default {
  dataEndPoint: "http://188.166.173.4/api/v1",
  meEndpoint: "http://188.166.173.4/api/v1/auth/me",
  loginEndpoint: "http://188.166.173.4/api/v1/auth/login",
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'dcPayrollToken',
  onTokenExpiration: 'logout' // logout | refreshToken
}
