<template>
  <div class="participate">
    <h2>Teilnehmen</h2>
    <QrcodeStream/>
  </div>
</template>

<script>
import {QrcodeStream} from 'vue-qrcode-reader'

export default {
  name: 'Participate',
  components: {
    QrcodeStream
  }
}
</script>
