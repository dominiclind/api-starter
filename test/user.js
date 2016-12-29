/*

  # APP TEST DOMAIN: 
  User

*/

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

import User from '../src/models/User';

import { generateTokenFromUser, authHeader } from './helper'

describe('# User', () => {

  let user;
  before('/me', () => {
    const userMock = sinon.mock(new User({
      name: 'Dominic Test',
      facebookId: 12349531023
    }));
    user = userMock.object;
    return user.save();
  });

  describe('/me', () => {

    it('should return valid user when authenticated', done => {
        
      request(app)
        .get('/api/me')
        .set('Content-Type', 'application/json')
        .set('Authorization', authHeader(generateTokenFromUser(user)))
        .end((err, res) => {
          assert.ok(!err);
          const { user } = res.body;
          assert.ok(user);
          assert.ok(user.facebookId);
          done();
        });

    });
    
    it('should return a 500 when user is unauthenticated', done => {
      request(app)
        .get('/api/me')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          assert.ok(!err);
          assert.ok(res.statusCode === 500);
          done();
        });
    });

  });
});