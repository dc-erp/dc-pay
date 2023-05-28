export default {
  dataEndPoint: "http://tomari.media/api/v1",
  meEndpoint: "http://tomari.media/api/v1/auth/me",
  loginEndpoint: "http://tomari.media/api/v1/auth/login",
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'dcPayrollToken',
  onTokenExpiration: 'logout' // logout | refreshToken
}
