<template>
  <div>
    <cape-header/>
    <template v-if="siteData.status === 'ERROR'">
      <div class="row content">
        <div class="col">
          <div class="card bg-error my-2">
            <div class="card-body text-center">
              <h2>Unable to load data</h2>
              <p>An error has occurred. The error was: {{ siteData.error_message }}.</p>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="siteData.status == 'LOADING'">
      <div class="row content">
        <div class="col">
          <div class="card bg-primary text-white my-2">
            <div class="card-body text-center">
              <div
                class="spinner-border"
                role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <p>Please wait while the data loads.</p>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="siteData.status == 'OK'">
      <cape-dataset :dataset="defaultDataset"/>
    </template>
  </div>
</template>


<script>
import CapeDataset from './components/CapeDataset.vue'
import { useEnvironmentStore } from './stores/environmentStore'
import { mapState } from 'pinia'
import CapeHeader from './components/CapeHeader.vue'
import { DatasetBuilder } from '@/builders/DatasetBuilder'
import { FilterFormStateBuilder } from '@/builders/FilterFormStateBuilder'

export default {
  el: '#app',
  name: 'CapeApp',
  components: {
    CapeDataset,
    CapeHeader
  },
  props: {

    siteData: {
      type: Object,
      default: null
    }
  },

  computed: {
    ...mapState(useEnvironmentStore, ['appStatus'])
  },

  created: function () {
    /*
            if (typeof this.data_location === 'undefined') {
                this.siteData.status = "ERROR";
                this.siteData.error_message = "Please ensure that local.js sets the property data_location";
                return;
            }

    TODO fix load error messages
            if (!CapeTools.is_object(data)) {
                this.siteData.status = "ERROR";
                this.siteData.error_message = "Downloaded data is not a JSON object";
                return;
            }

            if (response.body.status == "ERROR") {
                return;
            }
    */

    this.datasets_by_id = {}
    // populate records by ID. Nb. This is using the wrong ID data for now. TODO
    for (let ds_i = 0; ds_i < this.siteData.datasets.length; ++ds_i) {

      let destinationDataset = DatasetBuilder.build(this.siteData.datasets[ds_i])

      // add dataset to our dataset collection
      this.datasets_by_id[destinationDataset.config.id] = destinationDataset

      // first dataset becomes the default
      if (ds_i == 0) {
        this.defaultDataset = destinationDataset
      }
    }
    this.filterFormState = FilterFormStateBuilder.build(this.defaultDataset)
  }
}

</script>

<style>
@import '~bootstrap/dist/css/bootstrap.css';
</style>
