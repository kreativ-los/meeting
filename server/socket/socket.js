import socketIO from 'socket.io';

import meetingsModel from '../api/models/meetingsModel';
import Participator from '../api/controllers/participatorController';

const io = socketIO();

const list = io.of('/list');
const participator = io.of('/participator');

list.on('connection', function(socket) {
  const query = socket.handshake.query;
  const meeting = meetingsModel.get(query.meeting);

  if (meeting) {
    meeting.set('listSocket', socket);

    socket.on('disconnect', () => {
      participator.to(query.meeting).emit('meetingClosed');

      meetingsModel.delete(query.meeting);
    });
  }
});

participator.on('connection', function(socket) {
    const query = socket.handshake.query;
    const meeting = meetingsModel.get(query.meeting);

    if (meeting) {
      socket.join(query.meeting);

      meeting.get('participators').data.forEach((participator) => {
        if (participator.get('name') === query.participator) {
          participator.set('socket', socket);

          socket.on('disconnect', () => {
            meeting.get('participators').delete(participator);
            meeting.get('listSocket').emit('update', meeting.get('participators').toArray());

            Participator.next(query.meeting);
          });

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
