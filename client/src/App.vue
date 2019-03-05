<template>
  <div id="app" class="container">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/m/">New Meeting</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import './scss/variables/spacings';
  @import './scss/variables/colors';
  @import './scss/variables/font';

  @import './scss/modules/inputs';
  @import './scss/modules/buttons';
  @import './scss/modules/links';
  @import './scss/modules/grid';
  @import './scss/modules/note';
  @import './scss/modules/overlay';


  body {
    font-family: $font-family;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    background: $background;
    color: white;
  }
</style>
