<template>
  <div class="row content">
    <div class="col">
      <div class="card bg-warning my-2">
        <div class="card-body text-center">
          This is a {{ environmentName }} instance of this service.
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

    props: {
        environmentName: {
            type: String,
            required: true
        }
    }
}

</script>