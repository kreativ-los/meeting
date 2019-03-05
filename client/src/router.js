import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NewMeeting from './views/NewMeeting.vue'
import Meeting from './views/Meeting.vue'
import ParticipantList from './views/ParticipantList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/m/',
      name: 'newMeeting',
      component: NewMeeting
    },
    {
      path: '/m/:meetingName',
      name: 'meeting',
      component: Meeting
    },
    {
      path: '/m/:meetingName/list',
      name: 'participantList',
      component: ParticipantList
    }
  ]
})
