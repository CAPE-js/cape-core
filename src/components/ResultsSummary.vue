
<template>
  <div class="results-summary">
    <div class="card mb-1">
      <div class="card-body">
        <div>
          <div
            v-if="visible_records_count==results.length"
            class="record-count"
          >
            Showing all {{ visible_records_count }} matching records.
          </div>
          <div
            v-else
            class="record-count"
          >
            Showing first {{ visible_records_count }} of {{ results.length }} matching records.
          </div>
          <div class="switch switch-sm">
            <input
              id="show-all-results"
              v-model="options.show_all_results"
              type="checkbox"
              class="switch"
            >
            <label for="show-all-results">Show all matches</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
    name: "results-summary", 
    props: ["results", "visible_records_count", "options"],
}
</script>

