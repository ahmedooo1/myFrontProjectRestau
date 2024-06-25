export default {
  // Disable server-side rendering
  ssr: false,

  // Global page headers
  head: {
    titleTemplate: '%s - NF-EAT',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Découvrez une expérience culinaire unique chez NF-EAT' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'robots', content: 'index, follow' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/assets/images/NF-EAT transparent.png' }
    ]
  },

  // Global CSS
  css: [
    '~/assets/css/tailwind.css',
    'vue-toastification/dist/index.css'
  ],

  // Plugins to run before rendering page
  plugins: [
    '~/plugins/toastification.js',
  ],

  // Auto import components
  components: true,

  // Modules for dev and build
  buildModules: [
  ],

  // Modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/tailwindcss',
  ],


  axios: {
    baseURL: 'http://api.aa-world.store/api', // Replace with your API base URL
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer',
        },
        user: {
          property: false, // Set to false since you are handling user manually
          autoFetch: true,
        },
        endpoints: {
          login: { url: '/login_check', method: 'post' },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/user/getcurrent', method: 'post' },
        },
      },
    },
  },

  // Build Configuration
  build: {
    transpile: ['vue-chartjs', 'chart.js'],
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@babel/preset-env'),
            {
              targets: isServer
                ? { node: 'current' }
                : { browsers: ['last 2 versions'], ie: 11 },
              modules: false
            }
          ]
        ]
      },
      plugins: [
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-class-properties'
            ]
    },
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  // Extend routes
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'admin-menu',
        path: '/admin/menu',
        component: resolve(__dirname, 'pages/admin/Menu.vue')
      },
      {
        name: 'payment-amount',
        path: '/payment/:amount',
        component: resolve(__dirname, 'pages/payment/[amount].vue')
      },
      {
        name: 'menu-details',
        path: '/menu/:id',
        component: resolve(__dirname, 'pages/menu/_id.vue')
      },
        {
          name: 'mentions-legales',
          path: '/mentions-legales',
          component: resolve(__dirname, 'pages/MentionLegales.vue')
        },
        {
          name: 'politique-confidentialite',
          path: '/politique-confidentialite',
          component: resolve(__dirname, 'pages/politique-confidentialite.vue')
        },
        {
          name: 'reset-password',
          path: '/reset-password/:token',
          component: resolve(__dirname, 'pages/reset-password/_token.vue')
        },
        {
          name: 'contact',
          path: '/contact',
          component: resolve(__dirname, 'pages/contact.vue')
        }
      );
    }
  }
}
