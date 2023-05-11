<script>
import FieldLabelAndValueIfSet from "./FieldLabelAndValueIfSet.vue"
import FieldLabelAndValue from "./FieldLabelAndValue.vue"
import FieldValue from "./FieldValue.vue"
export default {
    name: "SummaryCard",
    components: { FieldLabelAndValueIfSet, FieldLabelAndValue, FieldValue },
    props: {
        record: { type: Object, default: null }
    },
    data: function () {
        const data = {};
        data.dataset = this.$root.defaultDataset;
        return data;
    },
    methods: {
        showIndexCard: function() {
            const record_id = this.record[this.dataset.config.id_field].value;
            this.$router.push({name: "record", params: { id: record_id }})
        }
    },
    template: "#templateSummaryCard"
}
</script>
