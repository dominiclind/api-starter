/*

  # APP TEST DOMAIN: 
  Item

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

import { generateTokenFromUser, authHeader } from './helper'


describe('# Area to test!', () => {
  describe('# specific function to test ', () => {

    it('when x is true, expect this result', done => {

      done();
    });
    
    it('when y is true, expect this result', done => {


      done();
    });

  });
});