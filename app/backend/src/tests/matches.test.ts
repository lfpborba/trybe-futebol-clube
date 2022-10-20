import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/match';
import TeamModel from '../database/models/team';
import MatchesMock from './mocks/matchesMocks';

import { FindOptions } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

const FIND_ALL_OPTIONS: FindOptions = {
  include: [
    { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
    { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
  ],
};

describe('Testes das rotas /matches:', () => {
  describe('Rotas GET:', () => {
    beforeEach(() => {
      // sinon.stub(MatchModel, 'findAll').resolves(MatchesMock as any);
      sinon.stub(MatchModel, 'findAll').withArgs(FIND_ALL_OPTIONS)
        .resolves(MatchesMock as any);
    });

    it('Endpoint /matches: testa se a aplicação retorna um array com os dados de todas as partidas;', async () => {
      const response = await chai.request(app).get('/matches');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(MatchesMock);
    });
  });
});