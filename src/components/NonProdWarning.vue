<template>
  <div 
    v-if="showWarning" 
    class="row content"
  >
    <div class="col">
      <div class="card bg-warning my-2">
        <div class="card-body text-center">
          This is a {{ environmentDescription }} instance of this service. It uses the following build: <em>{{ buildId }}</em>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { useEnvironmentStore } from '../stores/environmentStore'
import { mapState } from 'pinia'

export default {

  computed: {
    
    // get values from the store and expose them as computed values.
    ...mapState(useEnvironmentStore, ['appStatus', 'buildId']),

    environmentDescription: (store) => {
      switch(store.appStatus) {
        case "dev":
          return "development";   
        case "pprd":
          return "pre-production";
        case "test":
          return "test";
        default:
          throw new "Invalid appStatus";
      }
    },

    showWarning: (store) => {
      return store.appStatus != "prod";
    }

  }
}

</script>