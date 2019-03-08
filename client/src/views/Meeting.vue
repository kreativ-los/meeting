<template>
  <div class="meeting" :class="'meeting--state-' + state">
    <h2>Meeting {{ meetingName }}</h2>

    <input type="text" v-model="participatorName">

    <button type="button" class="talk" @click="(state === 'default') ? start() : stop()">Reden</button>

    <div v-if="meetingClosed" class="overlay"><div class="container">Das Meeting wurde beendet</div></div>
    <div v-if="meetingNotFound" class="overlay overlay--error"><div class="container">Das Meeting existiert leider nicht</div></div>
  </div>
</template>

<script>
import Api from '../includes/api';
import router from '../router';

export default {
  name: 'Meeting',
  data: function () {
    return {
      participatorName: '',
      state: 'default',
      meetingName: this.$route.params.meetingName,
      meetingClosed: false,
      meetingNotFound: false
    }
  },
  methods: {
    start: function() {
      Api.post(`participator/${this.meetingName}/add`, {name: this.participatorName})
        .then(() => {
          this.state = 'pending';

          this.participateSocket = Api.createSocket({
            participator: this.participatorName,
            meeting: this.meetingName
          }, '/participator')
            .on('active', () => {
              this.state = 'active';
              window.navigator.vibrate(200);
            });
        });
    },
    stop: function() {
      Api.closeSocket(this.participateSocket);
      this.state = 'default';
    }
  },
  created: function() {
    Api.post('meetings/has', {name: this.meetingName})
      .then(() => {
        console.log('sdfasdf');
        this.conncectionSocket = Api.createSocket({
          meeting: this.meetingName
        }, '/meeting')
          .on('meetingClosed', () => {
            console.log('closed');
            this.meetingClosed = true;
            this.stop();

            setTimeout(() => {
              router.push({
                name: 'participate'
              });
            }, 2000);
          });
      })
      .catch(() => {
        this.meetingNotFound = true;

        setTimeout(() => {
          router.push({
            name: 'participate'
          });
        }, 2000);
      });
  }
}
</script>

<style scoped lang="scss">
  @import '../scss/variables/colors';
  @import '../scss/variables/spacings';

  @keyframes pulse {
    0% {
      box-shadow: 0 0 2rem 1rem rgba($error, .6);
    }

    50% {
      box-shadow: 0 0 5rem 1rem rgba($error, .6);
    }

    100% {
      box-shadow: 0 0 2rem 1rem rgba($error, .6);
    }
  }

  .talk {
    display: block;
    background: $error;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    box-shadow: 0 0 5rem 0 rgba($error, .6);

    animation: pulse 3s infinite;
  }

  .meeting {
    &--state-pending {
      .talk {
        animation: none;
        background: $warning;
      }
    }

    &--state-active {
      .talk {
        animation: none;
        background: $success;
      }
    }
  }
</style>
