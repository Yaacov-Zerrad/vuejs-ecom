<template>
  <div class="page-new-product">
    <div class="columns is-12">
        <div class="column">
            <h1 class="title">New product</h1>
        </div>

        <div class="column is-6">
                <!-- <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>name</label>
                        <div class="control">
                            <input
                                type="text"
                                classe="input"
                                v-model="name"
                            />
                        </div>
                    </div>
                </form> -->
        </div>

        <div class="column">
            <h2 class="subtitle">add excel</h2>
        </div>
        <div class="column is-6">
            <form @submit.prevent="submitForm">
            
            </form>

        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'NewProduct'
}
</script>

<style>

</style>