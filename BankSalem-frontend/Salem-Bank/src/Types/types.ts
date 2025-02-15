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






export interface Transaction {
  transActionID: number; // integer($int32)
  transActionTypeID: number; // integer($int32)
  transActionTypeName: string | null; // string, nullable: true
  userID: number; // integer($int32)
  clientID: number; // integer($int32)
  reciverID: number | null; // integer($int32), nullable: true
  transActionDateTime: string; // string($date-time)
  amount: number; // number($double)
  clientAmountBefore: number; // number($double)
  clientAmountAfter: number; // number($double)
  reciverAmountBefore: number; // number($double)
  reciverAmountAfter: number; // number($double)
}




export interface TransferRequest {
  fromClientId: number; // integer($int32)
  toClientId: number; // integer($int32)
  amount: number; // number($double)
  userId: number; // integer($int32)
}





export interface Deposit_WithDraw_Request {
  clientId: number; // integer($int32)
  amount: number; // number($double)
  userId: number; // integer($int32)
}


export interface LogRegister {
  logID: number; // integer($int32)
  userID: number; // integer($int32)
  userName: string | null; // string, nullable: true
  logTypeID: number; // integer($int32)
  logeTypeName: string; // string, nullable: true
  logTime: string; // string($date-time)
}

export interface LogType {
  userID: number; // integer($int32)
  logTypeID: number; // integer($int32)
  
}





export interface UserLogin {
  userName: string;
  password: string;
}


export interface ClientLogin {
  email: string;
  pincode: string;
}





