<script>
export default {
    name: "index-card",
    props: ["record"],
    mounted: function() {
        // enable tooltips
        $('[data-toggle="tooltip"]').tooltip();
    },
    template: "#templateIndexCard"
}
</script>
