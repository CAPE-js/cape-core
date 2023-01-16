<template>
  <div 
    v-if="showWarning" 
    id="non-prod-warning"
    class="row content"    
  >
    <div class="col">
      <div class="card bg-warning my-2">
        <div class="card-body text-center">
          This is a {{ environmentDescription }} instance of this service. It uses the following build: <em>{{ buildId }}</em>.
        </div>
        <span 
          class="dismissable" 
          title="Hide this message"
          aria-label="Close"
          @click="close"          
        >x</span>
      </div>
    </div>
  </div>  
</template>


<script>
import { useEnvironmentStore } from '../stores/environmentStore'
import { mapState } from 'pinia'

export default {

  data() {
    return {
        closed: false
      }
    },

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

    showWarning(state) {
      return !this.closed && state.appStatus != "prod";
    }
  },

  methods: {
    close() {
      this.closed = true;
    }
  }

  
}

  
</script>

<style scoped>
.dismissable {
  position: absolute;
  right: 10px;
  top: 0;
  font-size: large;
  cursor: pointer;
}
</style>