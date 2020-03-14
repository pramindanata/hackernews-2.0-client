type Toast = any

declare module 'awesome-notifications' {
  export default class Notifier {
    success(msg?: string, options?: any): Toast
    warning(msg?: string, options?: any): Toast
    alert(msg?: string, options?: any): Toast
    info(msg?: string, options?: any): Toast
    tip(msg?: string, options?: any): Toast
    confirm(
      message,
      onOk?: () => any,
      onCancel?: () => any,
      options?: any,
    ): Toast
  }
}
