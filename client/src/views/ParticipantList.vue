<template>
  <div class="meeting">
    <h2>Meeting {{ meetingName }}</h2>
    Teilnehmer Reihenfolge:
    <ul>
      <li v-for="participator in participators">
        {{ participator }}
      </li>
    </ul>
  </div>
</template>

<script>
import Api from '../includes/api';

export default {
  name: 'ParticipantList',
  data: function () {
    return {
      participators: [],
      meetingName: this.$route.params.meetingName
    }
  },
  created: function() {
    Api.createSocket({
      meeting: this.meetingName
    }, '/list').on('update', (data) => {
      this.participators = data;
    });
  }
}
</script>

<style scoped lang="scss">
  @import '../scss/variables/colors';
  @import '../scss/variables/spacings';

</style>
