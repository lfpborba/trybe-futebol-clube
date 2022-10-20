import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/user';
import * as Bcrypt from 'bcryptjs';
import * as Jwt from 'jsonwebtoken';
import UserMock from './mocks/userMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes das rotas de login:', () => {
  describe('Rota POST /login:', () => {
    beforeEach(() => {
      sinon.stub(UserModel, 'findOne').resolves(UserMock as UserModel);
    });

    afterEach(() => {
      (UserModel.findOne as sinon.SinonStub).restore();
    });

    it('Testa se a aplicação retorna um token ao realizar login com dados válidos;', async () => {
      sinon.stub(Bcrypt, 'compare').resolves(true);

      const response = await chai.request(app).post('/login')
      .send({ email: UserMock.email, password: UserMock.password });
      expect(response.status).to.be.equal(200);

      const payload = Jwt.decode(response.body.token) as Jwt.JwtPayload;
      expect(payload.data).to.be.deep.equal(UserMock);

      (Bcrypt.compare as sinon.SinonStub).restore();
    });

    it('Testa se aplicação não permite o login sem informar um email;', async () => {
      const response = await chai.request(app).post('/login')
      .send({ password: UserMock.password });
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
    })

    it('Testa se aplicação não permite o login sem informar uma senha;', async () => {
      const response = await chai.request(app).post('/login')
      .send({ email: UserMock.email });
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
    })

    it('Testa se aplicação não permite o login ao informar um email inválido;', async () => {
      const response = await chai.request(app).post('/login')
      .send({ email: 'emailincorreto@mail.com', password: UserMock.password });
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password' });
    })

    it('Testa se aplicação não permite o login ao informar uma senha inválida;', async () => {
      const response = await chai.request(app).post('/login')
      .send({ email: UserMock.email, password: 'senhaIncorreta' });
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password' });
    })

    it('Testa se, de posse de um token válido, consegue obter a role de um usuário através da rota "/login/validate";', async () => {
      sinon.stub(Bcrypt, 'compare').resolves(true);

      const loginResponse = await chai.request(app).post('/login')
      .send({ email: UserMock.email, password: UserMock.password });

      const { token } = loginResponse.body;

      const validateResponse = await chai.request(app).get('/login/validate').set('authorization', token);

      expect(validateResponse.status).to.be.equal(200);
      expect(validateResponse.body).to.be.deep.equal({ role: 'admin' });

      (Bcrypt.compare as sinon.SinonStub).restore();
    })
  })
});