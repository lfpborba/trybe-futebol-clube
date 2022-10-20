import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/team';
import TeamsMock from './mocks/teamsMock';

chai.use(chaiHttp);

const { expect } = chai;
describe('Testes das rotas teams:', () => {
  describe('Rotas GET:', () => {
    beforeEach(() => {
      sinon.stub(TeamModel, 'findAll').resolves(TeamsMock as TeamModel[]);
      sinon.stub(TeamModel, 'findByPk').withArgs(2)
        .resolves((TeamsMock.filter((team) => team.id === 2))[0] as TeamModel);
    });
    afterEach(() => {
      (TeamModel.findAll as sinon.SinonStub).restore();
      (TeamModel.findByPk as sinon.SinonStub).restore();
    });

    it('Endpoint /teams: testa se a aplicação retorna um array com todos os times;', async () => {
      const response = await chai.request(app).get('/teams');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(TeamsMock);
    });

    it('Endpoint /teams/:id: testa se a aplicação retorna os dados de um time específico;', async () => {
      const response = await chai.request(app).get('/teams/2');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ id: 2, teamName: 'Bahia' });
    });
  })
});