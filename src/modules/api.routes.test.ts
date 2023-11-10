import request from 'supertest';

import app from '../app';
import { PROJECT_API_MESSAEG } from '../../constants/project';

describe('GET /api/v1', () => {
  it('responds with a json message', (done) => {
    request(app).get('/api/v1').set('Accept', 'application/json').expect('Content-Type', /json/).expect(
      200,
      {
        message: PROJECT_API_MESSAEG,
      },
      done,
    );
  });
});
