<template>
  <div class="meeting container text--center" :class="'meeting--state-' + state">
    <h2>Meeting <span class="no-uppercase">{{ meetingName }}</span></h2>

    <input type="text" v-model="participatorName" placeholder="Dein Name…">

    <div class="button-wrapper">
      <button type="button" class="talk circle" @click="(state === 'default') ? start() : stop()" :disabled="participatorName === ''">Reden</button>
    </div>

    <div v-if="meetingClosed" class="overlay"><div class="container">Das Meeting wurde beendet</div></div>
    <div v-if="meetingNotFound" class="overlay overlay--error"><div class="container">Das Meeting existiert leider nicht</div></div>
  </div>
</template>

<script>
import Api from '../includes/api';
import router from '../router';

function getParticipatorName() {
  let name = localStorage.getItem('participatorName');

  return (name) ? name : '';
}

export default {
  name: 'Meeting',
  data: function () {
    return {
      participatorName: getParticipatorName(),
      state: 'default',
      meetingName: this.$route.params.meetingName,
      meetingClosed: false,
      meetingNotFound: false
    }
  },
  watch: {
    participatorName: function(value) {
      localStorage.setItem('participatorName', value);
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
              window.navigator.vibrate(400);
            });

          document.addEventListener('visibilitychange', this.hidden.bind(this));
        });
    },
    stop: function() {
      Api.closeSocket(this.participateSocket);
      this.state = 'default';
    },
    hidden: function() {
      if (document.hidden) {
        document.removeEventListener('visibilitychange', this.hidden.bind(this));
        this.stop();
      }
    }
  },
  created: function() {
    Api.post('meetings/has', {name: this.meetingName})
      .then(() => {
        this.conncectionSocket = Api.createSocket({
          meeting: this.meetingName
        }, '/meeting')
          .on('meetingClosed', () => {
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
      box-shadow: 0 0 2rem 1rem var(--color);
    }

    50% {
      box-shadow: 0 0 5rem 1rem var(--color);
    }

    100% {
      box-shadow: 0 0 2rem 1rem var(--color);
    }
  }

  .meeting {
    --color: #{$error};

    display: flex;
    flex-direction: column;
    flex: 1;

    &--state-pending {
      --color: #{$warning};
    }

    &--state-active {
      --color: #{$success};
    }
  }

  .talk {
    display: block;
    background: var(--color);
    border-radius: 50%;
    box-shadow: 0 0 5rem 0 var(--color);

    outline: none;

    animation: pulse 3s infinite;

    &[disabled] {
      background: $disabled;
      animation: none;
      box-shadow: none;
    }
  }

  .button-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
