<template>
  <div class="home container">
    <div class="text--center">
      <img alt="Meetings" src="../assets/logo.svg" width="200" class="logo">
    </div>

    <div class="grid">
      <router-link to="/m/" class="btn col--6 col-md-offset--3 col-md--4">Neues Meeting anlegen…</router-link>
      <router-link to="/participate/" class="btn col--6 col-md--4">An Meeting teilnehmen…</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
}
</script>

<style scoped lang="scss">
  @import '../scss/variables/spacings';

  .logo {
    margin: $space * 2 0;
  }
</style>
