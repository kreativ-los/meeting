<template>
  <div class="participate">
    <div class="container text--center">
      <h2>Teilnehmen</h2>
      <QrcodeStream @decode="joinMeeting"/>
    </div>

    <div class="background">
      <div class="container">
        <form @submit.prevent="joinMeeting()" class="grid">
          <input type="text" placeholder="Name des Meetings" v-model="meetingName" class="col--7 col-md--5 col-md-offset--3">
          <button type="submit" class="cta col--5 col-md--3">Teilnehmen</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {QrcodeStream} from 'vue-qrcode-reader'
import router from '../router';

export default {
  name: 'Participate',
  data: function () {
    return {
      meetingName: ''
    };
  },
  components: {
    QrcodeStream
  },
  methods: {
    joinMeeting(decodedString = this.meetingName) {
      const meetingId = decodedString.split('/').pop();

      router.push({
        name: 'meeting',
        params: { meetingName: meetingId }
      });
    }
  }
}
</script>

<style lang="scss">
  @import '../scss/variables/colors';
  @import '../scss/modules/circle';

  .qrcode-stream {
    @extend .circle;
    position: relative;
    background: $primary--light;
    color: white;
    margin: 0 auto;

    overflow: hidden;
    border-radius: 50%;

    &::before {
      content: 'QR Code Scannen…';
      position: absolute;
      width: 100%;
      height: 100%;
      font-weight: 700;
      font-size: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__inner-wrapper {
      height: 100%;
      width: 100%;
    }

    &__camera {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
