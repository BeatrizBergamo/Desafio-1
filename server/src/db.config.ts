import { createConnection } from "typeorm";
import { AddressEntity, UserEntity } from "./entity";

export class DatabaseService {
  static config() {
    return createConnection({
      type: 'postgres',
      host: process.env.HOST,
      port: +process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      entities: [UserEntity, AddressEntity],
      logging: false,
      synchronize: false
    })
  }
}