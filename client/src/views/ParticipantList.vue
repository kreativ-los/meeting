<template>
  <div class="meeting">
    <div class="container text--center">
      <h2>Meeting <span class="no-uppercase">{{ meetingName }}</span></h2>

      <div>
        <div class="qr-code circle">
          <qrcode :value="meetingUrl" :options="{ width: 500 }"/>
        </div>
      </div>
    </div>

    <div class="container">
      <h3>Teilnehmer Reihenfolge:</h3>

      <ol class="list">
        <li v-for="participator in participators">
          {{ participator }}
        </li>
      </ol>
    </div>

    <div v-if="meetingNotFound" class="overlay overlay--error"><div class="container">Das Meeting existiert leider nicht</div></div>
  </div>
</template>

<script>
import Api from '../includes/api';
import qrcode from '@chenfengyuan/vue-qrcode';
import router from '../router';

export default {
  name: 'ParticipantList',
  data: function () {
    return {
      participators: [],
      meetingName: this.$route.params.meetingName,
      host: window.location.protocol.concat('//').concat(window.location.hostname),
      meetingNotFound: false
    }
  },
  created: function() {
    Api.post('meetings/has', {name: this.meetingName})
      .then(() => {
        this.listSocket = Api.createSocket({
          meeting: this.meetingName
        }, '/list').on('update', (data) => {
          this.participators = data;
        });
      })
      .catch(() => {
        this.meetingNotFound = true;

        setTimeout(() => {
          router.push({
            name: 'newMeeting'
          });
        }, 2000);
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

  h3 {
    font-size: 2rem;
  }

  .list {
    padding: 0;
    margin: 0;
    list-style-position: inside;

    li {
      padding: $space;
      font-size: 2rem;

      &:nth-child(odd) {
        background: $primary;
      }
    }
  }
</style>
