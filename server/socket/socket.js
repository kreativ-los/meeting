import socketIO from 'socket.io';

import meetingsModel from '../api/models/meetingsModel';
import Participator from '../api/controllers/participatorController';

const io = socketIO();

const list = io.of('/list');

list.on('connection', function(socket) {
  const query = socket.handshake.query;
  const meeting = meetingsModel.get(query.meeting);

  if (meeting) {
    meeting.set('listSocket', socket);
  }
});

const participator = io.of('/participator');

participator.on('connection', function(socket) {
    const query = socket.handshake.query;
    const meeting = meetingsModel.get(query.meeting);

    if (meeting) {
      meeting.get('participators').data.forEach((participator) => {
        if (participator.get('name') === query.participator) {
          participator.set('socket', socket);

          socket.on('disconnect', () => {
            meeting.get('participators').delete(participator);
            meeting.get('listSocket').emit('update', meeting.get('participators').toArray());

            Participator.next(query.meeting);
          });

          console.log(meeting.get('participators').count());
          if (meeting.get('participators').count() === 1) {
            setTimeout(() => {
              Participator.next(query.meeting);
            }, 10);
          }
        }
      });
    }
});

export default io;
