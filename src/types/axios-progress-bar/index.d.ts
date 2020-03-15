declare module 'axios-progress-bar' {
  import { AxiosStatic } from 'axios'

  export function loadProgressBar(config: any, instance: AxiosStatic): void
}
