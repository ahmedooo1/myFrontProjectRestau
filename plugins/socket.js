import io from 'socket.io-client';

export default ({ app }, inject) => {
  const socket = io('https://api.aa-world.store');
  inject('socket', socket);
};
