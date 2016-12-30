/*

  # APP TEST DOMAIN: 
  Auth

*/

import assert from 'assert';
import request from 'supertest';
import { expect } from 'chai';
import app from '../src';

import mongoose from 'mongoose';
import sinon from 'sinon';
require('sinon-mongoose');

import { generateTokenFromUser, authHeader } from './helper'
import User from '../src/models/user';

describe('#Auth', () => {
  describe('Login /api/auth/login/', () => {

    it('Should return a user object and a token', done => {
      //GET ACCESS TOKEN FROM FACEBOOK DEV ACCOUNT, will fail if token is not up to date
      const json = {
        accessToken: 'EAAMEMVjqkjQBAPAmljwf1x6Ayx3nJt09KwP3Vh3WkaEYXFXdIZBuCLxE3uEypvjwphhZB8tidbtNKFOdpjsNPGluuWO4GPG46G8aX9puVX4ZAQk8QvYkZB2HFWUAFC3SmUy05nrfZATo1GWoAzP8ZB', 
        id: '10152526125321365'
      };
      request(app)
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send(json)
        .end((err, res) => {
          const { user, token } = res.body;
          assert.ok(!err);
          assert.ok(res.statusCode == 200);
          expect(user.facebookId).to.equal(json.id)
          expect(token).to.exist
          done();
        });
    });
    
    it('Should not return a user object due to invalid token', done => {
      const json = {
        accessToken: 'C18OQAUwBACEmJlC6UyCw2XnoHeauHfIHGqGQp38JpsPxf5PhLeSZBqA0sPcHaZArWe8wSCSsFhEGBFZAuWbZCHbHqvQ1Nyh8jFbYKodJS0m8eoIHYAi8iZCkDa0gWO3A4oavT2JZC9ZCffQeUMB9GEubXlVbo6V6JfBcdPPFIUGyqmxXEuO',
        id: '10152526125321365'
      };
      request(app)
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send(json)
        .end((err, res) => {
          assert.ok(!err);
          assert.ok(res.statusCode === 500);
          done();
        });
    });

  });
});