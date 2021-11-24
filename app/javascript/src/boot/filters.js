// src/boot/filters.js
import { date } from 'quasar'

export default ({ Vue }) => {
  Vue.filter('dateFormatPtBR', function (value) {
    return date.formatDate(value, 'DD/MM/YYYY HH:mm:ss')
  })
  Vue.filter('statusColor', function (value) {
    switch (value) {
      case 'Não':
        return 'red'
      case 'Sim':
        return 'green'
      case 'Enviado':
        return 'green'
      case 'Vencido':
        return 'red'
      case 'Aceito':
        return 'primary'
      case 'Login efetuado':
        return 'secondary'
      case 'Não enviado - possível problema':
        return 'orange'
      default:
        return 'primary'
    }
  })
  Vue.filter('errorMessageFormat', function (value) {
    if (value !== undefined && value !== null) {
      return value.join(', ')
    } else {
      return null
    }
  })
}
