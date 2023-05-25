export default {
  dataEndPoint: "http:/ec2-3-91-61-122.compute-1.amazonaws.com/api/v1",
  meEndpoint: "http://ec2-3-91-61-122.compute-1.amazonaws.com/api/v1/auth/me",
  loginEndpoint: "http://ec2-3-91-61-122.compute-1.amazonaws.com/api/v1/auth/login",
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'dcPayrollToken',
  onTokenExpiration: 'logout' // logout | refreshToken
}
