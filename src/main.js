import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router';
import { defineComponent } from 'vue'
import jQuery from 'jquery'
import { CapeTools } from './CapeTools.js'

import HomePage from './components/HomePage.vue'
import RecordPage from './components/RecordPage.vue'
import FieldsTable from './components/FieldsTable.vue'

fetch( data_location ) // eslint-disable-line
    .then( response => response.json() ) 
    .then( response => { 

        let pages = [ 'data' ];
        if( Object.prototype.hasOwnProperty.call( response.datasets[0]['config'], 'extra_pages' ) ) {
            pages = pages.concat( response.datasets[0]['config']['extra_pages'] );
        }

        let routes = [
            {name: 'root',   path: '/',                     component: HomePage},
            {name: 'record', path: '/record/:id',           component: RecordPage},
            {name: 'browse', path: '/browse/:field/:value', component: HomePage},
        ];
        pages.forEach( pageId => {
            let templateId = 'template' + pageId.charAt(0).toUpperCase() + pageId.slice(1);
            // eslint-disable-next-line
            let component = defineComponent( {
                name: pageId + "-page",
                components: { FieldsTable },
                data: function () {
                    let data = {};
                    data.dataset = this.$root.defaultDataset;
                    return data;
                },
                methods: {
                    downloadJSON: function() {
                        let filename = this.dataset.config.id+".json";
                        CapeTools.download( filename, JSON.stringify(this.dataset.raw_records), "application/json" );
                    },
                    downloadCSV: function() {
                        let table = CapeTools.records_to_table( this.dataset.config.fields, this.dataset.records );
                        let csv = CapeTools.table_to_csv( table );
                        let filename = this.dataset.config.id+".csv";
                        CapeTools.download( filename, csv, "text/csv;charset=utf-8" );
                    }
                }, 
                template: "#"+templateId
            });
            routes.push( { name: pageId, path: '/'+pageId, component: component } );
        });
            
        let capeRouter = createRouter({ routes: routes, history: createWebHashHistory() });
        capeRouter.afterEach((to, from) => {
            if( from.name !== null ) {
                // coming from an existing route, rather than a first time page load
                let content_vertical_offset = jQuery("#app").offset().top;
                jQuery('html,body').scrollTop(content_vertical_offset);
            }
        });

        let app = createApp(App, { appStatus: app_status, siteData: response }); // eslint-disable-line
        app.use(capeRouter);
        app.mount('#app')
    });


