export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Whistle サッカー/フットサルチーム検索サービス',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/pwa',
  ],

  manifest: {
    name: "Whistle",
    lang: "ja",
    short_name: "Whistle",
    title: "Whistle",
    "og:title": "Whistle",
    description: "Whistleはアマチュアサッカー/フットサルチームを登録・検索できるプラットフォームです。週末の練習試合の相手を、ともに高めあえる地元の仲間を探しにいきましょう。",
    "og:description": "Whistleはアマチュアサッカー/フットサルチームを登録・検索できるプラットフォームです。週末の練習試合の相手を、ともに高めあえる地元の仲間を探しにいきましょう。",
    theme_color: "#163956",
    background_color: "#ffffff",
    "icons": [
    {
      "src": "/icon.png",
      "sizes": "512x512",
      "type": "image/png"
    }
    ]
  },

  workbox: {
    dev: false, // Service Workerを開発環境で使用するかどうか
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',

    '@nuxtjs/dotenv'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  
  transpile: [
    "vee-validate/dist/rules"
  ],
  
  }
}
