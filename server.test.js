const request = require('supertest');
const app = 'http://134.122.10.110'; // Replace with your server URL

describe('Test /signup endpoint', () => {
  it('should create a new user when valid credentials are provided', async () => {
    const response = await request(app)
      .post('/signup')
      .send({ email: 'test@example.com', password: 'testPassword' })
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.user).toBeDefined();
    expect(response.body.token).toBeDefined();
  });

  it('should return an error for invalid signup data', async () => {
    const response = await request(app)
      .post('/signup')
      .send({ email: '', password: 'weak' })
      .set('Accept', 'application/json');

    expect(response.status).toBe(500);
    expect(response.body.error).toBeDefined();
  });
});

describe('Test /signin endpoint', () => {
  it('should sign in a user with valid credentials', async () => {
    const response = await request(app)
      .post('/signin')
      .send({ email: 'test@example.com', password: 'testPassword' })
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.user).toBeDefined();
    expect(response.body.token).toBeDefined();
  });

  it('should return an error for invalid signin data', async () => {
    const response = await request(app)
      .post('/signin')
      .send({ email: 'invalid@example.com', password: 'invalidPassword' })
      .set('Accept', 'application/json');

    expect(response.status).toBe(401);
  });
});

// Add more test cases for other endpoints in a similar manner
const request = require('supertest');
const app = 'http://134.122.10.110'; // Replace with your server URL

describe('Test /signup endpoint', () => {
  it('should create a new user when valid credentials are provided', async () => {
    const response = await request(app)
      .post('/signup')
      .send({ email: 'test@example.com', password: 'testPassword' })
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.user).toBeDefined();
    expect(response.body.token).toBeDefined();
  });

  it('should return an error for invalid signup data', async () => {
    const response = await request(app)
      .post('/signup')
      .send({ email: '', password: 'weak' })
      .set('Accept', 'application/json');

    expect(response.status).toBe(500);
    expect(response.body.error).toBeDefined();
  });
});

describe('Test /signin endpoint', () => {
  it('should sign in a user with valid credentials', async () => {
    const response = await request(app)
      .post('/signin')
      .send({ email: 'test@example.com', password: 'testPassword' })
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.user).toBeDefined();
    expect(response.body.token).toBeDefined();
  });

  it('should return an error for invalid signin data', async () => {
    const response = await request(app)
      .post('/signin')
      .send({ email: 'invalid@example.com', password: 'invalidPassword' })
      .set('Accept', 'application/json');

    expect(response.status).toBe(401);
  });
});

// Add more test cases for other endpoints in a similar manner
