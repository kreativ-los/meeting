import meetingsModel from '../models/meetingsModel';
import {Store} from '../../store/store';

export default class ParticipatorController {
  static add(req, res) {
    const meetingName = req.params.meeting;
    const participatorName = req.body.name;

    const meetingStore = meetingsModel.get(meetingName);
    const participatorStore = meetingStore.get('participators');

    if (participatorName === '' || participatorStore.has(participatorName)) {
      console.error(`${participatorName} already exists`);

      res.status(500);
      res.send('{}');
    } else {
      const store = new Store();
      store.set('name', participatorName);
      participatorStore.set(store);

      console.info(`Add ${participatorName} to ${meetingName}`);

      if (meetingStore.has('listSocket')) {
        meetingStore.get('listSocket').emit('update', participatorStore.toArray());
      }

      res.status(200);
      res.send('{}');
    }
  }

  static next(meetingName) {
    const participatorStore = meetingsModel.get(meetingName).get('participators');
    const next = participatorStore.last();
    next.get('socket').emit('active');
  }
}
