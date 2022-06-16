<script>
import jQuery from "jquery"
import FieldLabelAndValue from "./FieldLabelAndValue.vue"
export default {
    name: "index-card",
    components: { FieldLabelAndValue },
    props: ["record"],
    mounted: function() {
        // enable tooltips
        // jQuery('[data-toggle="tooltip"]').tooltip(); TODO another disabled tooltip
    },
    template: "#templateIndexCard"
}
</script>
