

<template>
    <div>
        <div v-if="results.length == 0" class="card mb-1">
            <div class="card-body">No records match your filter terms.</div>
        </div>

        <div v-else>
            <results-summary v-bind:results="results" v-bind:options="options" v-bind:visible_records_count="visible_records.length"></results-summary>
            <div v-for="record in visible_records" v-bind:key="record" >
                <summary-card v-bind:record="record"></summary-card>
            </div>
            <div class="floating-summary">
                <results-summary v-bind:results="results" v-bind:options="options" v-bind:visible_records_count="visible_records.length"></results-summary>
            </div>
        </div>

    </div>
</template>


<script>
import ResultsSummary from "./ResultsSummary.vue";
import SummaryCard from "./SummaryCard.vue";
export default {
    name: "cape-results",
    components: { ResultsSummary, SummaryCard },
    props: ["results","options"],
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

