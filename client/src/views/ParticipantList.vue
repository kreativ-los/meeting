<template>
  <div class="meeting">
    <h2>Meeting {{ meetingName }}</h2>

    <div>
      <div class="qr-code">
        <qrcode :value="meetingUrl" :options="{ width: 200 }"/>
      </div>
    </div>

    <div>
      Teilnehmer Reihenfolge:
      <ul>
        <li v-for="participator in participators">
          {{ participator }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Api from '../includes/api';
import qrcode from '@chenfengyuan/vue-qrcode';

export default {
  name: 'ParticipantList',
  data: function () {
    return {
      participators: [],
      meetingName: this.$route.params.meetingName,
      host: window.location.protocol.concat('//').concat(window.location.hostname),
    }
  },
  created: function() {
    Api.createSocket({
      meeting: this.meetingName
    }, '/list').on('update', (data) => {
      this.participators = data;
    });
  },
  computed: {
    meetingUrl: function() {
      return `${this.host}/m/${this.meetingName}`
    }
  },
  components: {
    qrcode
  }
}
</script>

<style scoped lang="scss">
  @import '../scss/variables/colors';
  @import '../scss/variables/spacings';

</style>
