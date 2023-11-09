<template>
  <div class="cape-results-summary">
    <div class="card mb-1">
      <div class="card-body">
        <div>
          <div
            v-if="visibleRecordsCount==results.length"
            class="cape-record-count"
          >
            Showing all {{ visibleRecordsCount }} matching records.
          </div>
          <div
            v-else
            class="cape-record-count"
          >
            Showing first {{ visibleRecordsCount }} of {{ results.length }} matching records.
          </div>
          <div class="switch switch-sm">
            <input
              :id="id"
              v-model="options.show_all_results"
              class="switch"
              type="checkbox"
            >
            <label :for="id">Show all matches</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "ResultsSummary",
  props: {
    results: {type: Array, default: null},
    visibleRecordsCount: {type: Number, default: 0},
    options: {type: Object, default: null},
    name: {type: String, default: ''}
  },
  computed: {
    id: function () {
      return "show-all-results-" + this.name;
    }
  }
}
</script>

