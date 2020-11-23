/**
 * Module dependencies.
 */
const request = require('supertest');
const path = require('path');

const express = require(path.resolve('./lib/services/express'));
const mongooseService = require(path.resolve('./lib/services/mongoose'));
const multerService = require(path.resolve('./lib/services/multer'));

/**
 * Unit tests
 */
describe('Home CRUD Tests :', () => {
  let app;
  let agent;

  //  init
  beforeAll(async () => {
    try {
      // init mongo
      await mongooseService.connect();
      await multerService.storage();
      await mongooseService.loadModels();
      // init application
      app = express.init();
      agent = request.agent(app);
    } catch (err) {
      console.log(err);
    }
  });

  describe('Logout', () => {
    test('shouldbe able to get releases', async () => {
      try {
        const result = await agent.get('/api/home/releases')
          .expect(200);
        expect(result.body.type).toBe('success');
        expect(result.body.message).toBe('releases');
        expect(result.body.data).toBeInstanceOf(Array);
      } catch (err) {
        expect(err).toBeFalsy();
        console.log(err);
      }
    });

    test('should be able to get changelogs', async () => {
      try {
        const result = await agent.get('/api/home/changelogs')
          .expect(200);
        expect(result.body.type).toBe('success');
        expect(result.body.message).toBe('changelogs');
        expect(result.body.data).toBeInstanceOf(Array);
      } catch (err) {
        expect(err).toBeFalsy();
        console.log(err);
      }
    });

    test('should be able to get team members', async () => {
      try {
        const result = await agent.get('/api/home/team')
          .expect(200);
        expect(result.body.type).toBe('success');
        expect(result.body.message).toBe('team list');
        expect(result.body.data).toBeInstanceOf(Array);
      } catch (err) {
        expect(err).toBeFalsy();
        console.log(err);
      }
    });
  });

  // Mongoose disconnect
  afterAll(async () => {
    try {
      await mongooseService.disconnect();
    } catch (err) {
      console.log(err);
    }
  });
});