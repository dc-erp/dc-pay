export default {
  dataEndPoint: "http://localhost:4000/api/v1",
  meEndpoint: "http://localhost:4000/api/v1/auth/me",
  loginEndpoint: "http://localhost:4000/api/v1/auth/login",
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'dcPayrollToken',
  onTokenExpiration: 'logout' // logout | refreshToken
}
