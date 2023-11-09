<script>
//import jQuery from "jquery"
import FieldLabelAndValueIfSet from "./FieldLabelAndValueIfSet.vue"
import FieldLabelAndValue from "./FieldLabelAndValue.vue"
import FieldValue from "./FieldValue.vue"

export default {
  name: "IndexCard",
  components: {FieldLabelAndValueIfSet, FieldLabelAndValue, FieldValue},
  props: {
    record: {type: Object, default: null}
  },
  mounted: function () {
    // enable tooltips
    // jQuery('[data-toggle="tooltip"]').tooltip(); TODO another disabled tooltip
  },
  template: "#templateIndexCard"
}
</script>
