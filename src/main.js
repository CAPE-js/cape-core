import { createApp, defineComponent } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import { createRouter, createWebHashHistory } from 'vue-router'
import jQuery from 'jquery'
import { CapeTools } from './utils/CapeTools.js'

import HomePage from './components/HomePage.vue'
import RecordPage from './components/RecordPage.vue'
import FieldsTable from './components/FieldsTable.vue'
import { useEnvironmentStore } from './stores/environmentStore'

fetch(data_location) // eslint-disable-line
  .then(response => response.json())
  .then(response => {
    let pages = ['data']
    if (Object.prototype.hasOwnProperty.call(response.datasets[0].config, 'extra_pages')) {
      pages = pages.concat(response.datasets[0].config.extra_pages)
    }

    const routes = [
      { name: 'root', path: '/', component: HomePage },
      { name: 'record', path: '/record/:id', component: RecordPage },
      { name: 'browse', path: '/browse/:field/:value', component: HomePage }
    ]
    pages.forEach(pageId => {
      const templateId = 'template' + pageId.charAt(0).toUpperCase() + pageId.slice(1)
      // eslint-disable-next-line
      let component = defineComponent({
        name: pageId + '-page',
        components: { FieldsTable },
        data: function () {
          const data = {}
          data.dataset = this.$root.defaultDataset
          return data
        },
        methods: {
          downloadJSON: function () {
            const filename = this.dataset.config.id + '.json'
            CapeTools.download(filename, JSON.stringify(this.dataset.raw_records), 'application/json')
          },
          downloadCSV: function () {
            const table = CapeTools.records_to_table(this.dataset.config.fields, this.dataset.records)
            const csv = CapeTools.table_to_csv(table)
            const filename = this.dataset.config.id + '.csv'
            CapeTools.download(filename, csv, 'text/csv;charset=utf-8')
          }
        },
        template: '#' + templateId
      })
      routes.push({ name: pageId, path: '/' + pageId, component })
    })

    const capeRouter = createRouter({
      routes,
      history: createWebHashHistory(),
      linkActiveClass: 'active',
      linkExactActiveClass: 'active'
    })

    capeRouter.afterEach((to, from) => {
      if (from.name !== null) {
        // coming from an existing route, rather than a first time page load
        const contentVerticalOffset = jQuery('#app').offset().top
        jQuery('html,body').scrollTop(contentVerticalOffset)
      }
    })

    // pinia is a framework used for managing global state.
    const pinia = createPinia()
    const app = createApp(App, { siteData: response }) // eslint-disable-line

    app.use(capeRouter)
    app.use(pinia)

    // read data from local.js and populate the values into the environment store
    const environmentStore = useEnvironmentStore()
    environmentStore.appStatus = app_status // eslint-disable-line
    environmentStore.buildId = build_id // eslint-disable-line

    // add any vue extensions if defined. Remap the variable name for cleaner linting
    const capeExtensions = cape_extensions // eslint-disable-line

    if (typeof capeExtensions !== 'undefined' && capeExtensions && Object.prototype.hasOwnProperty.call(capeExtensions, 'components')) {
      const extensionIds = Object.keys(capeExtensions.components)
      extensionIds.forEach(componentId => {
        app.component(componentId, capeExtensions.components[componentId])
      })
    }

    app.mount('#app')
  })
