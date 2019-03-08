import socketIO from 'socket.io';

import meetingsModel from '../api/models/meetingsModel';
import Participator from '../api/controllers/participatorController';

const io = socketIO();

const listSockets = io.of('/list');
const participatorSockets = io.of('/participator');
const meetingSockets = io.of('/meeting');

listSockets.on('connection', function(socket) {
  const query = socket.handshake.query;
  const meeting = meetingsModel.get(query.meeting);

  if (meeting) {
    meeting.set('listSocket', socket);

    socket.on('disconnect', () => {
      meetingSockets.to(query.meeting).emit('meetingClosed');

      meetingsModel.delete(query.meeting);
    });
  }
});

participatorSockets.on('connection', function(socket) {
    const query = socket.handshake.query;
    const meeting = meetingsModel.get(query.meeting);

    if (meeting) {
      socket.join(query.meeting);

      if (meeting.has('participators')) {
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
    }
});

meetingSockets.on('connection', function(socket) {
  const query = socket.handshake.query;

  if (meetingsModel.has(query.meeting)) {
    console.log(query.meeting);
    socket.join(query.meeting);
  }
});

export default io;
