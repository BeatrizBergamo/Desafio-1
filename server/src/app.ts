import * as express from "express";
import {Request, Response} from "express";
import {UserEntity} from "./entity/User.entity";
import { config } from 'dotenv';
import * as cors from 'cors';
import { DatabaseService } from "./db.config";
import { UserModel } from "./model/user.model";
import { AddressModel } from "./model/address.model";

export async function bootstrap() {
  config({ path: './.env' });
  const connection = await DatabaseService.config()

  const userRepository = connection.getRepository(UserEntity);

  const app = express();
  app.use(cors())
  app.use(express.json());
  
  app.post("/cadastro", async function(req: Request, res: Response) {
    try {
      const cpf = req.body.cpf
      const user = await userRepository.findOne({ where: { cpf }})
      
      if (user) {
        res.statusCode = 400;
        return res.send({ message: 'Cpf já cadastrado'})
      }
      const model = mapUserToModel(req.body.body);
      const newUser = await userRepository.save<UserEntity>(Object.assign(new UserEntity(), model));
      
      return res.send(newUser)
    } catch(error) {
      console.error(error);
      res.statusCode = 400
      return res.send({ message: error.message })
    }
  });

  app.get("/get-user/:cep", async function(req: Request, res: Response) {
    try {
      const cep = req.params?.cep;
      const user = await userRepository.findOne({ where: { address: { cep } }, relations: ['address']});

      if (!user) {
        res.statusCode = 404;
        return res.send({ message: 'Usuário não foi encontrado.'})
      }

      return res.send(user);
    } catch (error) {
      console.error(error);
      res.statusCode = 404;
      return res.send({ message: 'Usuário não foi encontrado.'})
    }
  });

  const PORT = process.env.PORT ?? 4000;
  app.listen(PORT);
}

function mapUserToModel(body: any): UserModel {
  console.log(body)
  return {
    name: body.name,
    email: body.email,
    cpf: body.cpf,
    rg: body.rg,
    birthDate: body.birthDate,
    telphone: body.telphone,
    celphone: body.celphone,
    vehicle: body.vehicle,
    licence: body.licence,
    maritalStatus: body.maritalStatus,
    gender: body.gender,
    job: body.job,
    address: mapAddressToModel(body.address),
  }
}

function mapAddressToModel(body: any): AddressModel {
  return {
    cep: body.cep,
    street: body.street,
    city: body.city,
    neighborhood: body.neighborhood,
    complement: body.complement,
    streetNumber: body.streetNumber,
    state: body.state,
  }
} 