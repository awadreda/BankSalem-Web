using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BankbusinessLayer.DTOs;
using BankSalemDataAccessLayer;

namespace BankbusinessLayer
{
    public class ClientsBusiness : clsPerson
    {
        enum enMode
        {
            AddNew = 0,
            Update = 1,
        };

        public int ClientID { get; private set; }

        public string AccountNumber { set; get; }
        public string PINCODE { set; get; }
        public double AccountBalance { set; get; }

        enMode Mode = enMode.AddNew;

        public ClientsBusiness()
        {
            this.ClientID = -1;

            this.AccountNumber = "";
            this.PINCODE = "";
            this.AccountBalance = 0;
            this.Mode = enMode.AddNew;
        }

        ClientsBusiness(
            int ID,
            int PersonID,
            string FirstName,
            string LastName,
            string Email,
            string Phone,
            string AccountNumber,
            string PINCODE,
            double AccountBalance
        )
            : base(PersonID, FirstName, LastName, Email, Phone)
        {
            this.ClientID = ID;

            this.AccountNumber = AccountNumber;
            this.PINCODE = PINCODE;
            this.AccountBalance = AccountBalance;
            this.Mode = enMode.Update;
        }

        public ClientDTO CDTO
        {
            get
            {
                return new ClientDTO(
                    this.ClientID,
                    this.FirstName,
                    this.LastName,
                    this.Email,
                    this.Phone,
                    this.AccountNumber,
                    this.PINCODE,
                    this.AccountBalance
                );
            }
        }

        public static ClientsBusiness? FindClient(int ID)
        {
            int PersonID = -1;
            string FirstName = "";
            string LastName = "";
            string Phone = "";
            string Email = "";
            string AccountNumber = "";
            string PINCODE = "";
            double AccountBalance = 0;

            if (
                ClientsData.getClinet(
                    ID,
                    ref PersonID,
                    ref FirstName,
                    ref LastName,
                    ref Email,
                    ref AccountNumber,
                    ref Phone,
                    ref PINCODE,
                    ref AccountBalance
                )
            )
            {
                return new ClientsBusiness(
                    ID,
                    PersonID,
                    FirstName,
                    LastName,
                    Email,
                    Phone,
                    AccountNumber,
                    PINCODE,
                    AccountBalance
                );
            }
            else
            {
                return null;
            }
        }

        public static ClientsBusiness? FindClientByEmail(string Email)
        {
            int ClintID = -1;
            int PersonID = -1;
            string FirstName = "";
            string LastName = "";
            string Phone = "";

            string AccountNumber = "";
            string PINCODE = "";
            double AccountBalance = 0;

            if (
                ClientsData.getClientByEmail(
                    Email,
                    ref ClintID,
                    ref PersonID,
                    ref FirstName,
                    ref LastName,
                    ref AccountNumber,
                    ref Phone,
                    ref PINCODE,
                    ref AccountBalance
                )
            )
            {
                return new ClientsBusiness(
                    ClintID,
                    PersonID,
                    FirstName,
                    LastName,
                    Email,
                    Phone,
                    AccountNumber,
                    PINCODE,
                    AccountBalance
                );
            }
            else
            {
                return null;
            }
        }

        public static ClientsBusiness? FindClientByAccountNumber(string AccountNumber)
        {
            int ClintID = -1;
            int PersonID = -1;
            string FirstName = "";
            string LastName = "";
            string Phone = "";
            string Email = "";

            string PINCODE = "";
            double AccountBalance = 0;

            if (
                ClientsData.getClientByAccountNumber(
                    AccountNumber,
                    ref Email,
                    ref ClintID,
                    ref PersonID,
                    ref FirstName,
                    ref LastName,
                    ref Phone,
                    ref PINCODE,
                    ref AccountBalance
                )
            )
            {
                return new ClientsBusiness(
                    ClintID,
                    PersonID,
                    FirstName,
                    LastName,
                    Email,
                    Phone,
                    AccountNumber,
                    PINCODE,
                    AccountBalance
                );
            }
            else
            {
                return null;
            }
        }


        public static ClientsBusiness? FindClientByEmailAndPINCODE(string Email, string PINCODE)
        {
            string FirstName = "";
            string LastName = "";
            string Phone = "";
            string AccountNumber = "";
            double AccountBalance = 0;

            int PersonID = -1;
            int ClientID = -1;
            if (ClientsData.getClientByEmailAndPINCODE(ref ClientID, ref PersonID, ref FirstName, ref LastName, Email, ref Phone, ref AccountNumber, PINCODE, ref AccountBalance))
            {
                return new ClientsBusiness(ClientID, PersonID, FirstName, LastName, Email, Phone, AccountNumber, PINCODE, AccountBalance);
            }
            else
            {
                return null;        
            }
        }


        public static ClientsBusiness? FindClientByName(string FirstName)
        {
            int ClintID = -1;
            int PersonID = -1;
            FirstName = "";
            string LastName = "";
            string Phone = "";
            string Email = "";

            string AccountNumber = "";
            string PINCODE = "";
            double AccountBalance = 0;

            if (
                ClientsData.getClientByFirstName(
                    ref Email,
                    ref ClintID,
                    ref PersonID,
                    FirstName,
                    ref LastName,
                    ref Phone,
                    ref AccountNumber,
                    ref PINCODE,
                    ref AccountBalance
                )
            )
            {
                return new ClientsBusiness(
                    ClintID,
                    PersonID,
                    FirstName,
                    LastName,
                    Email,
                    Phone,
                    AccountNumber,
                    PINCODE,
                    AccountBalance
                );
            }
            else
            {
                return null;
            }
        }

        public static DataTable GetClientList()
        {
            return ClientsData.GetAllClientsFromDb();
        }

        public static DataTable GetTotalBalances()
        {
            return ClientsData.GetTotalBanlancesFromDB();
        }

        public static bool isClientExistbyID(int ID)
        {
            return ClientsData.isClientExist(ID);
        }

        public static bool isClientExistbyAccountNumber(string AccountNumber)
        {
            return ClientsData.isClientExistByAccountNumber(AccountNumber);
        }

        bool _AddNewClient()
        {
            int NewClientID = -1;
            int NewPersonID = -1;

            if (
                ClientsData.ChatgptAddNewClient(
                    ref NewClientID,
                    ref NewPersonID,
                    this.FirstName,
                    this.LastName,
                    this.Email,
                    this.Phone,
                    this.AccountNumber,
                    this.PINCODE,
                    this.AccountBalance
                )
            )
            {
                this.ClientID = NewClientID;
                this.personID = NewPersonID;
                return true;
            }

            return false;
        }

        public bool Save()
        {
            switch (Mode)
            {
                case enMode.AddNew:
                    {
                        if (_AddNewClient())
                        {
                            Mode = enMode.Update;

                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                case enMode.Update:
                    {
                        return _UpdateClinet();
                    }
            }
            return false;
        }

        public static bool DeleteClientByID(int ID)
        {
            return ClientsData.DeleteClinetFromDb(ID);
        }

        enum enTransActionType
        {
            Depostie = 1,
            Withdraw = 2,
            Transfer = 3,
        }

        public bool Deposite(double Amount, int UserID)
        {
            double BalanceBeforeDeposite = this.AccountBalance;
            this.AccountBalance += Amount;
            double BalanceAfterDeposite = this.AccountBalance;

            if (
                TransActionData.SaveDepositeOrWithDraw(
                    UserID,
                    this.ClientID,
                    (float)Amount,
                    (float)BalanceBeforeDeposite,
                    (float)BalanceAfterDeposite,
                    (int)enTransActionType.Depostie
                )
            )
            {
                return Save();
            }

            return false;
        }

        public bool WithDraw(double Amount, int UserID)
        {
            double BalanceBeforeDeposite = this.AccountBalance;
            this.AccountBalance -= Amount;
            double BalanceAfterDeposite = this.AccountBalance;

            if (
                TransActionData.SaveDepositeOrWithDraw(
                    UserID,
                    this.ClientID,
                    (float)Amount,
                    (float)BalanceBeforeDeposite,
                    (float)BalanceAfterDeposite,
                    (int)enTransActionType.Withdraw
                )
            )
            {
                return Save();
            }

            return false;
        }

        public bool Transfer(double Amount, ClientsBusiness Reciver, int UserID)
        {
            double ClientBalanceBerfore = this.AccountBalance;
            this.AccountBalance -= Amount;
            double ClientBalanceAfter = this.AccountBalance;

            double ReciverBalanceBerfore = Reciver.AccountBalance;
            Reciver.AccountBalance += Amount;
            double ReciverBalanceAfter = Reciver.AccountBalance;

            if (
                TransActionData.SaveTransfer(
                    UserID,
                    this.ClientID,
                    Reciver.ClientID,
                    (float)Amount,
                    (float)ClientBalanceBerfore,
                    (float)ClientBalanceAfter,
                    (float)ReciverBalanceBerfore,
                    (float)ReciverBalanceAfter,
                    (int)enTransActionType.Transfer
                )
            )
            {
                return (Save() && Reciver.Save());
            }

            return false;
        }

        //public void WithDr


        private bool _UpdateClinet()
        {
            return ClientsData.UpdateClinet(
                this.ClientID,
                this.personID,
                this.FirstName,
                this.LastName,
                this.Email,
                this.Phone,
                this.AccountNumber,
                this.PINCODE,
                this.AccountBalance
            );
        }

        public static DataTable TransActionList()
        {
            return TransActionData.GetAllTransAction();
        }
        
        public static DataTable GetClientTransAction(int clientID)
        {
            return TransActionData.GetClientTransAction(clientID);
        }
    }
}
