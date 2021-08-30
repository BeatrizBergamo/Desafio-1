export interface AddressModel {
  id: string;
  cep: string;
  street: string;
  streetNumber: string;
  complement?: string;
  neighborhood: string;
  state: string;
  city: string;
}