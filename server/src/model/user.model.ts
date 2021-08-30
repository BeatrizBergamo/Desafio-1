import { AddressModel } from "./address.model";

export enum Gender {
 MulherTrans = 'Mulher Trans',
 MulherCis = 'Mulher Cis',
 HomemTrans = 'Homem Trans',
 HomemCis = 'Homem Cis',
 Travesti = 'Travesti',
 NaoBinario = 'Não-Binário',
}

export enum MaritalStatus {
  Solteiro = 'Solteiro(a)',
  Casado = 'Casado(a)',
  Separado = 'Separado(a)',
  Divorciado = 'Divorciado(a)',
  Viuvo = 'Viuvo(a)',
}

export interface UserModel {
  id: string;
  name: string;
  email: string;
  cpf: string;
  rg?: string;
  birthDate: string;
  job: string;
  maritalStatus?: MaritalStatus;
  gender?: Gender; 
  celphone: string;
  telphone?: string;
  vehicle?: boolean;
  licence?: boolean;
  address: AddressModel;
}