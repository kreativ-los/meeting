<template>
  <div class="new-meeting" v-bind:class="{ error: hasError }">
    <h2>Neues Meeting erstellen…</h2>

    <div v-if="hasError" class="note note--error">Der gewünschte Name ist bereits vorhanden!</div>

    <form @submit.prevent="createMeeting()">
      <input type="text" placeholder="Name" v-model="customName">
      <button type="submit">Erstellen</button>
    </form>

    <div class="note note--info">
      Url: <span class="url">{{ meetingUrl }}</span>
    </div>
  </div>
</template>

<script>
import Api from '../includes/api';
import router from '../router';

export default {
  name: 'NewMeeting',
  data: function () {
    return {
      customName: '',
      host: window.location.protocol.concat('//').concat(window.location.hostname),
      randomName: '',
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
        .catch(() => {
          this.hasError = true;
        });
    }
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
</style>
