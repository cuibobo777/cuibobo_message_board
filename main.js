import App from './App'
import uView from './uni_modules/vk-uview-ui'

import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(uView)
  return {
    app
  }
}