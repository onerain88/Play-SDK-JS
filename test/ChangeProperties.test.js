import Event from '../src/Event';
import newPlay from './Utils';

const { expect } = require('chai');

describe('test change properties', () => {
  it('test change room properties', done => {
    const roomName = '311';
    const play1 = newPlay('hello3110');
    const play2 = newPlay('world3110');
    let p1Flag = false;
    let p2Flag = false;

    play1.on(Event.JOINED_LOBBY, () => {
      expect(play1._sessionToken).to.be.not.equal(null);
      play1.createRoom(roomName);
    });
    play1.on(Event.CREATED_ROOM, () => {
      expect(play1.room.name).to.be.equal(roomName);
      play2.joinRoom(roomName);
    });
    play1.on(Event.ROOM_CUSTOM_PROPERTIES_CHANGED, () => {
      const props = play1.room.getCustomProperties();
      expect(props.title).to.be.equal('room311');
      expect(props.gold).to.be.equal(1000);
      p1Flag = true;
      if (p1Flag && p2Flag) {
        play1.disconnect();
        play2.disconnect();
        done();
      }
    });

    play2.on(Event.JOINED_LOBBY, () => {
      expect(play2._sessionToken).to.be.not.equal(null);
    });
    play2.on(Event.JOINED_ROOM, () => {
      expect(play2.room.name).to.be.equal(roomName);
      const props = {
        title: 'room311',
        gold: 1000,
      };
      play2.room.setCustomProperties(props);
    });
    play2.on(Event.ROOM_CUSTOM_PROPERTIES_CHANGED, () => {
      const props = play2.room.getCustomProperties();
      expect(props.title).to.be.equal('room311');
      expect(props.gold).to.be.equal(1000);
      p2Flag = true;
      if (p1Flag && p2Flag) {
        play1.disconnect();
        play2.disconnect();
        done();
      }
    });

    play1.connect();
    play2.connect();
  });

  it('test change room properties with cas', done => {
    const roomName = '312';
    const play1 = newPlay('hello3120');
    const play2 = newPlay('world3120');
    let p1Flag = false;
    let p2Flag = false;

    play1.on(Event.JOINED_LOBBY, () => {
      expect(play1._sessionToken).to.be.not.equal(null);
      play1.createRoom(roomName);
    });
    play1.on(Event.CREATED_ROOM, () => {
      expect(play1.room.name).to.be.equal(roomName);
      play2.joinRoom(roomName);
    });
    play1.on(Event.ROOM_CUSTOM_PROPERTIES_CHANGED, () => {
      const props = play1.room.getCustomProperties();
      expect(props.id).to.be.equal(1);
      expect(props.title).to.be.equal('room312');
      expect(props.gold).to.be.equal(1000);
      p1Flag = true;
      if (p1Flag && p2Flag) {
        play1.disconnect();
        play2.disconnect();
        done();
      }
    });

    play2.on(Event.JOINED_LOBBY, () => {
      expect(play2._sessionToken).to.be.not.equal(null);
    });
    play2.on(Event.JOINED_ROOM, () => {
      expect(play2.room.name).to.be.equal(roomName);
      const props = {
        id: 1,
        title: 'room312',
        gold: 1000,
      };
      play2.room.setCustomProperties(props);

      const p = {
        id: 2,
        gold: 2000,
      };
      const ep = {
        id: 2,
      };
      play2.room.setCustomProperties(p, ep);
    });
    play2.on(Event.ROOM_CUSTOM_PROPERTIES_CHANGED, () => {
      const props = play2.room.getCustomProperties();
      expect(props.id).to.be.equal(1);
      expect(props.title).to.be.equal('room312');
      expect(props.gold).to.be.equal(1000);
      p2Flag = true;
      if (p1Flag && p2Flag) {
        play1.disconnect();
        play2.disconnect();
        done();
      }
    });

    play1.connect();
    play2.connect();
  });

  it('test change player properties', done => {
    const roomName = '313';
    const play1 = newPlay('hello3130');
    const play2 = newPlay('world3130');
    let p1Flag = false;
    let p2Flag = false;

    play1.on(Event.JOINED_LOBBY, () => {
      expect(play1._sessionToken).to.be.not.equal(null);
      play1.createRoom(roomName);
    });
    play1.on(Event.CREATED_ROOM, () => {
      expect(play1.room.name).to.be.equal(roomName);
      play2.joinRoom(roomName);
    });
    play1.on(Event.PLAYER_CUSTOM_PROPERTIES_CHANGED, player => {
      const props = player.getCustomProperties();
      expect(props.nickname).to.be.equal('Li Lei');
      expect(props.gold).to.be.equal(1000);
      const { poker } = props;
      expect(poker.flower).to.be.equal(1);
      expect(poker.num).to.be.equal(13);
      const { arr } = props;
      expect(arr[0]).to.be.equal(true);
      expect(arr[1]).to.be.equal(111);
      expect(arr[2].flower).to.be.equal(1);
      expect(arr[2].num).to.be.equal(13);
      p1Flag = true;
      if (p1Flag && p2Flag) {
        play1.disconnect();
        play2.disconnect();
        done();
      }
    });

    play2.on(Event.JOINED_LOBBY, () => {
      expect(play2._sessionToken).to.be.not.equal(null);
    });
    play2.on(Event.JOINED_ROOM, () => {
      expect(play2.room.name).to.be.equal(roomName);
      const props = {
        nickname: 'Li Lei',
        gold: 1000,
      };
      const poker = {
        flower: 1,
        num: 13,
      };
      props.poker = poker;
      const arr = [true, 111, poker];
      props.arr = arr;
      play2.player.setCustomProperties(props);
    });
    play2.on(Event.PLAYER_CUSTOM_PROPERTIES_CHANGED, player => {
      const props = player.getCustomProperties();
      expect(props.nickname).to.be.equal('Li Lei');
      expect(props.gold).to.be.equal(1000);
      const { poker } = props;
      expect(poker.flower).to.be.equal(1);
      expect(poker.num).to.be.equal(13);
      expect(props.arr[0]).to.be.equal(true);
      expect(props.arr[1]).to.be.equal(111);
      expect(props.arr[2].flower).to.be.equal(1);
      expect(props.arr[2].num).to.be.equal(13);
      p2Flag = true;
      if (p1Flag && p2Flag) {
        play1.disconnect();
        play2.disconnect();
        done();
      }
    });

    play1.connect();
    play2.connect();
  });

  it('test change player properties with cas', done => {
    const roomName = '316';
    const play1 = newPlay('hello3160');
    const play2 = newPlay('world3160');
    let p1Flag = false;
    let p2Flag = false;

    play1.on(Event.JOINED_LOBBY, () => {
      expect(play1._sessionToken).to.be.not.equal(null);
      play1.createRoom(roomName);
    });
    play1.on(Event.CREATED_ROOM, () => {
      expect(play1.room.name).to.be.equal(roomName);
      play2.joinRoom(roomName);
    });
    play1.on(Event.PLAYER_CUSTOM_PROPERTIES_CHANGED, player => {
      const props = player.getCustomProperties();
      expect(props.id).to.be.equal(1);
      expect(props.nickname).to.be.equal('Li Lei');
      expect(props.gold).to.be.equal(1000);
      p1Flag = true;
      if (p1Flag && p2Flag) {
        play1.disconnect();
        play2.disconnect();
        done();
      }
    });

    play2.on(Event.JOINED_LOBBY, () => {
      expect(play2._sessionToken).to.be.not.equal(null);
    });
    play2.on(Event.JOINED_ROOM, () => {
      expect(play2.room.name).to.be.equal(roomName);
      const props = {
        id: 1,
        nickname: 'Li Lei',
        gold: 1000,
      };
      play2.player.setCustomProperties(props);

      const p = {
        nickname: 'Jim',
      };
      const ep = {
        id: 0,
      };
      play2.player.setCustomProperties(p, ep);
    });
    play2.on(Event.PLAYER_CUSTOM_PROPERTIES_CHANGED, player => {
      const props = player.getCustomProperties();
      expect(props.id).to.be.equal(1);
      expect(props.nickname).to.be.equal('Li Lei');
      expect(props.gold).to.be.equal(1000);
      p2Flag = true;
      if (p1Flag && p2Flag) {
        play1.disconnect();
        play2.disconnect();
        done();
      }
    });

    play1.connect();
    play2.connect();
  });
});
