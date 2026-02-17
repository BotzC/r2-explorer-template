import { R2Explorer } from 'r2-explorer';

export default R2Explorer({ basicAuth: [{
    username: 'phadmin',
    password: 'phadmin',
    readonly: false
  },{
    username: 'user',
    password: '123',
    readonly: true
  }]
});
