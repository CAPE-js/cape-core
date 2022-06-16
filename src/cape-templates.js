
/************************************************************
 * field-label-and-value
 ************************************************************/

<template>
<div>
    <div class="field-label-and-value">
      <div v-if="!typedValue" class='cape-error'>[Error, trying to render non-existant field]</div>
      <template v-else-if="typedValue.field.value != ''">
        <div class="field-label" v-if="typedValue.field.description != null" data-toggle="tooltip" v-bind:title="typedValue.field.description">{{typedValue.field.label}}</div>
        <div class="field-label" v-else>{{typedValue.field.label}}</div>
        <field-value v-bind:typedValue="typedValue" v-bind:linkValue="linkValue"></field-value>
      </template>
    </div>
</div>


<script>
Vue.component("field-label-and-value", {
    props: ["typedValue","linkValue"],
    template: template
}
</script>


/************************************************************
 * field-label-and-value-if-set
 ************************************************************/

<template>
<div>
  <div v-if="!typedValue" class='cape-error'>[Error, trying to render non-existant field]</div>
  <field-label-and-value v-else-if="typedValue.value != '' && typedValue.value != null && !(typeof typedValue.value=='array' && typedValue.value.length==0)" v-bind:typedValue="typedValue" v-bind:linkValue="linkValue"></field-label-and-value>
</div>
</template>

<script>
Vue.component("field-label-and-value-if-set", {
    props: ["typedValue","linkValue"],
    template: template
}
</script>


/************************************************************
 * fields-table
 ************************************************************/

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
                <tr v-for="field in dataset.config.fields" v-bind:key="key" >
                    <td>{{ field.id }}</td>
                    <td>{{ field.label }}</td>
                    <td>{{ field.type }} <span v-if="field.multiple"> list</span></td>
                    <td>{{ field.description }}</td>
                </tr>
                </tbody>
            </table>
</template>

<script>
Vue.component("fields-table", {
    data: function () {
        var data = {};
        data.dataset = this.$root.defaultDataset;
        return data;
    },
    template: template
}
</script>













/************************************************************
 * record-page
 ************************************************************/

<template>
    <div>
        <div class="row">
            <div class="col">
                <index-card v-if="dataset.records_by_id[ $route.params.id ]"
                            v-bind:record="dataset.records_by_id[ $route.params.id ]"></index-card>
                <no-record v-else></no-record>
            </div>
        </div>
    </div>
</template>

<script>
var RecordPage = Vue.component("record-page", {
    data: function () {
        var data = {};
        data.dataset = this.$root.defaultDataset;
        return data;
    },
    template: template
});
</script>




