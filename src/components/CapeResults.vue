

<template>
  <div id="results">
    <div
      v-if="results.length == 0"
      id="cape-no-matching-results"
      class="card mb-1"
    >
      <div class="card-body">
        No records match your filter terms.
      </div>
    </div>

    <div v-else>
      <results-summary
        :results="results"
        :options="options"
        :visible-records-count="visible_records.length"
        name="top"
      />
      <div
        v-for="record in visible_records"
        :key="record"
      >
        <summary-card :record="record" />
      </div>
      <div class="floating-summary">
        <results-summary
          :results="results"
          :options="options"
          :visible-records-count="visible_records.length"
          name="floating"
        />
      </div>
    </div>
  </div>
</template>


<script>
import ResultsSummary from "./ResultsSummary.vue";
import SummaryCard from "./SummaryCard.vue";
export default {
    name: "CapeResults",
    components: { ResultsSummary, SummaryCard },
    props: { options: { type: Object, default: null}, results: { type: Array, default: ()=>[] }},
    computed: {
        visible_records: function() {
            if (this.options.show_all_results) {
                return this.results;
            } else {
                return this.results.slice(0, 50);
            }
        }
    }
}
</script>

