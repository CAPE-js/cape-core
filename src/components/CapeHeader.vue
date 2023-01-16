<script>
import NonProdWarning from './NonProdWarning.vue';

export default {
    name: "CapeHeader",
    props: { dataset: { type: Object, default: null } },
    template: "#templateHeader",
    // eslint-disable-next-line
    components: {
        NonProdWarning
    }
};

</script>