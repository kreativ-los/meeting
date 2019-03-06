<template>
  <div class="participate">
    <h2>Teilnehmen</h2>
    <QrcodeStream @decode="onDecode"/>
  </div>
</template>

<script>
import {QrcodeStream} from 'vue-qrcode-reader'
import router from '../router';

export default {
  name: 'Participate',
  components: {
    QrcodeStream
  },
  methods: {
    onDecode(decodedString) {
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

  .qrcode-stream {
    position: relative;
    background: $primary--light;
    color: white;
    width: 400px;
    height: 400px;

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
