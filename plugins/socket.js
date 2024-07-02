import io from 'socket.io-client';

export default ({ app }, inject) => {
  const socket = io('https://api.aa-world.store:3001');
  inject('socket', socket);
};
