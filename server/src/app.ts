import * as express from "express";
import {Request, Response} from "express";
import {UserEntity} from "./entity/User.entity";
import { config } from 'dotenv';
import { DatabaseService } from "./db.config";

export async function bootstrap() {
  config({ path: './.env' });
  const connection = await DatabaseService.config()

  const userRepository = connection.getRepository(UserEntity);

  const app = express();
  app.use(express.json());
  
  app.post("/users", async function(req: Request, res: Response) {
    try {
      const cpf = req.body.cpf
      const user = await userRepository.findOne({ where: { cpf }})

      if (user) {
        res.statusCode = 400;
        return res.send({ message: 'Cpf já cadastrado'})
      }
      const newUser = await userRepository.save<UserEntity>(req.body);
      
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

  app.listen(3000);
}