<template>
  <div class="new-meeting" v-bind:class="{ error: nameExists }">
    <div class="container text--center">
      <h2>Neues Meeting erstellen…</h2>

      <p>
        Du kannst entweder einen zufälligen Namen nutzen, oder dir deinen eigenen erstellen.
      </p>

      <div class="qr-code circle circle--small">
        <qrcode :value="meetingUrl" :options="{ width: 500 }"/>
      </div>

      <div class="grid">
        <div class="col-offset--3 col--12 col-md--8">
          <div class="note note--info">
            Deine Meeting URL: <strong class="url"><router-link :to="{name: 'meeting', params: {meetingName: meetingName}}">{{ meetingUrl }}</router-link></strong>
          </div>
        </div>
      </div>

      <button @click.prevent="createMeeting()" class="cta">Jetzt erstellen</button>
    </div>

    <div class="background">
      <div class="container text--center">
        <h3>Oder doch lieber einen eigenen Namen?</h3>
        <div class="grid">
          <input type="text" placeholder="Wie soll dein Meeting heißen?" v-model="customName" class="col--7 col-md--5 col-md-offset--3">

          <button @click.prevent="createMeeting()" class="cta col--5 col-md--3">Jetzt erstellen</button>
        </div>
      </div>
    </div>

    <div v-if="nameExists" class="note note--error">Der gewünschte Name ist bereits vorhanden!</div>
    <div v-if="hasError" class="note note--error">Es ist ein Fehler aufgetreten!</div>
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
    .url {
      font-style: italic;

      a {
        color: inherit;
      }
    }

    &.error {
      .url {
        color: $error;
      }
    }
  }

  .note {
    margin: $space 0;
  }
</style>
