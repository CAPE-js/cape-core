

<template>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">Field id</th>
                    <th scope="col">Field name</th>
                    <th scope="col">Field type</th>
                    <th scope="col">Description</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="field in dataset.config.fields" v-bind:key="field" >
                    <td>{{ field.id }}</td>
                    <td>{{ field.label }}</td>
                    <td>{{ field.type }} <span v-if="field.multiple"> list</span></td>
                    <td>{{ field.description }}</td>
                </tr>
                </tbody>
            </table>
</template>

<script>
export default {
    anem: "fields-table", 
    data: function () {
        var data = {};
        data.dataset = this.$root.defaultDataset;
        return data;
    }
}
</script>












