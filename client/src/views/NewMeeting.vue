<template>
  <div class="new-meeting" v-bind:class="{ error: nameExists }">
    <h2>Neues Meeting erstellen…</h2>

    <div class="grid">
      <div class="col--3">
        <div class="qr-code">
          <qrcode :value="meetingUrl" :options="{ width: 200 }"/>
        </div>
      </div>

      <div class="col--9">
        <div v-if="nameExists" class="note note--error">Der gewünschte Name ist bereits vorhanden!</div>
        <div v-if="hasError" class="note note--error">Es ist ein Fehler aufgetreten!</div>

        <form @submit.prevent="createMeeting()">
          <input type="text" placeholder="Name" v-model="customName">
          <button type="submit">Erstellen</button>
        </form>

        <div class="note note--info">
          Url: <span class="url">{{ meetingUrl }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '../includes/api';
import router from '../router';

import qrcode from '@chenfengyuan/vue-qrcode';

export default {
  name: 'NewMeeting',
  data: function () {
    return {
      customName: '',
      host: window.location.protocol.concat('//').concat(window.location.hostname),
      randomName: '',
      nameExists: false,
      hasError: false
    }
  },
  computed: {
    meetingUrl: function() {
      return `${this.host}/m/${this.meetingName}`
    },
    meetingName: function() {
      if (this.customName === '') return this.randomName;
      else return this.customName;
    }
  },
  created: function() {
    // get free random name from server
    Api.get('meetings/randomName')
      .then(response => {
        this.randomName = response.random;
      });
  },
  methods: {
    createMeeting() {
      Api.post('meetings/add', {name: this.meetingName})
        .then(() => {
          router.push({
            name: 'participantList',
            params: { meetingName: this.meetingName }
          });
        })
        .catch((status) => {
          if (status === 500) this.nameExists = true;
          else this.hasError = true;
        });
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

  .new-meeting {
    &.error {
      .url {
        color: $error;
      }
    }
  }

  .note {
    margin: $space 0;
  }

  .qr-code {
    display: inline-block;
    padding: 25px;
    background: white;
    border-radius: 50%;
    overflow: hidden;
  }
</style>
