import Event from '../src/Event';
import newPlay from './Utils';

const { expect } = require('chai');

describe('test lobby', () => {
  it('test join lobby manually', done => {
    const play = newPlay('play');
    play.on(Event.CONNECTED, () => {
      play.joinLobby();
    });
    play.on(Event.JOINED_LOBBY, () => {
      play.disconnect();
      done();
    });
    play.connect({
      autoJoinLobby: false,
    });
  });

  it('test room list update', done => {
    const play1 = newPlay('play1');
    const play2 = newPlay('play2');
    const play3 = newPlay('play3');
    const play4 = newPlay('play4');
    let roomCount = 0;
    play1.on(Event.JOINED_LOBBY, () => {
      play1.createRoom(play1.userId);
    });
    play1.on(Event.CREATED_ROOM, () => {
      roomCount += 1;
      if (roomCount === 3) {
        play4.connect();
      }
    });
    play2.on(Event.JOINED_LOBBY, () => {
      play2.createRoom(play2.userId);
    });
    play2.on(Event.CREATED_ROOM, () => {
      roomCount += 1;
      if (roomCount === 3) {
        play4.connect();
      }
    });
    play3.on(Event.JOINED_LOBBY, () => {
      play3.createRoom(play3.userId);
    });
    play3.on(Event.CREATED_ROOM, () => {
      roomCount += 1;
      if (roomCount === 3) {
        play4.connect();
      }
    });
    play4.on(Event.LOBBY_ROOM_LIST_UPDATE, () => {
      if (play4.lobbyRoomList.length > 0) {
        expect(play4.lobbyRoomList.length >= 3).to.be.equal(true);
        play1.disconnect();
        play2.disconnect();
        play3.disconnect();
        play4.disconnect();
        done();
      }
    });
    play1.connect();
    play2.connect();
    play3.connect();
  });
});
