<template>
  <div>
    <div class="row">
      <div class="col">
        <index-card
          v-if="dataset.records_by_id[ $route.params.id ]"
          :record="dataset.records_by_id[ $route.params.id ]"
        />
        <no-record v-else/>
      </div>
    </div>
  </div>
</template>

<script>
import IndexCard from "./IndexCard.vue";
import NoRecord from "./NoRecord.vue";

export default {
  name: "RecordPage",
  components: {IndexCard, NoRecord},
  data: function () {
    const data = {};
    data.dataset = this.$root.defaultDataset;
    return data;
  }
}
</script>




