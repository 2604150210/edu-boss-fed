<template>
<div id="app">
  <Layout v-if="authorized" />
  <router-view  v-else/>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Layout from '@/layout/index.vue'

export default Vue.extend({
  name: 'App',
  components: { Layout },
  computed: {
    authorized () {
      return this.$route.path !== '/login'
    }
  }
})
</script>

<style lang="scss" scoped>
// @import "~@/styles/variables.scss";

.text {
  color: $success-color;
}
</style>
