export default {
  dataEndPoint: "https://tomari.media/api/v1",
  meEndpoint: "https://tomari.media/api/v1/auth/me",
  loginEndpoint: "https://tomari.media/api/v1/auth/login",
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'dcPayrollToken',
  onTokenExpiration: 'logout' // logout | refreshToken
}
