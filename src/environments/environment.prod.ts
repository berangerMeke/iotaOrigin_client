// export const environment = {
//   production: true
// };

export const environment = {
  production: false,
  base_url: 'http://127.0.1.1:8080/api/',
  auth_Url: '',
  ga: String(JSON.parse(localStorage.getItem('googleAnalyticsID') || '{}').id),  
}