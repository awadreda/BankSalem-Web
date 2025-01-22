export interface Client {
  id: number; // integer($int32)
  firstName: string | null; // string, nullable: true
  lastName: string | null; // string, nullable: true
  email: string | null; // string, nullable: true
  phone: string | null; // string, nullable: true
  accountNumber: string | null; // string, nullable: true
  pincode: string | null; // string, nullable: true
  accountBalance: number; // number($double)
}


export interface User {
  user_ID: number; // integer($int32)
  userName: string | null; // string, nullable: true
  password: string | null; // string, nullable: true
  permission: number; // integer($int32)
  firstName: string | null; // string, nullable: true
  lastName: string | null; // string, nullable: true
  email: string | null; // string, nullable: true
  phone: string | null; // string, nullable: true
}