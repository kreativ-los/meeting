<template>
  <div id="app">
    <nav id="nav" class="nav">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/m/">Neues Meeting</router-link></li>
        <li><router-link to="/participate/">Teilnehmen</router-link></li>
      </ul>
    </nav>

    <div class="view">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
  @import './scss/variables/spacings';
  @import './scss/variables/grid';
  @import './scss/variables/colors';
  @import './scss/variables/font';
  @import './scss/variables/mixins';

  @import './scss/modules/backgrounds';
  @import './scss/modules/text';
  @import './scss/modules/navigation';
  @import './scss/modules/headlines';
  @import './scss/modules/inputs';
  @import './scss/modules/buttons';
  @import './scss/modules/links';
  @import './scss/modules/grid';
  @import './scss/modules/note';
  @import './scss/modules/overlay';
  @import './scss/modules/qr-code';
  @import './scss/modules/circle';

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    font-family: $font-family;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    background: $background;
    color: white;
    margin: 0;
  }

  #app {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 40px);
  }

  .view {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: $space * 2 0;
  }
</style>
