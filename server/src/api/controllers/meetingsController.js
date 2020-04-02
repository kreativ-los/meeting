import meetingsModel from '../models/meetingsModel';
import ParticipatorModel from '../models/participatorModel';

import {Store} from '../../store/store';

function makeid(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export default class MeetingsController {
  static add(req, res) {
    const meetingName = req.body.name;

    if (meetingsModel.has(meetingName)) {
      console.error(`${meetingName} already exists`);

      res.status(500);
      res.send('{}');
    } else {
      const store = new Store();
      store.set('participators', new ParticipatorModel());
      meetingsModel.set(meetingName, store);

      console.info(`Add ${meetingName}`);

      res.status(200);
      res.send('{}');
    }
  }

  static has(req, res) {
    const meetingName = req.body.name;

    if (meetingsModel.has(meetingName)) {
      res.status(200);
      res.send('{}');
    } else {
      res.status(500);
      res.send('{}');
    }
  }

  static randomName(req, res) {
    let name = makeid(5);

    while (meetingsModel.has(name)) {
      name = makeid(5);
    }

    res.send(JSON.stringify({random: name}));
  }
}
