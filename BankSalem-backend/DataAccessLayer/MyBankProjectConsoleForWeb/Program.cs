using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BankbusinessLayer;

namespace MyBanKProjectConsole
{
    class Program
    {
        public static void testFindClient(int ID)
        {
            if (ClientsBusiness.isClientExistbyID(ID))
            {
#pragma warning disable CS8600 // Converting null literal or possible null value to non-nullable type.
                ClientsBusiness Client = ClientsBusiness.FindClient(ID);
#pragma warning restore CS8600 // Converting null literal or possible null value to non-nullable type.

                if (Client != null)
                {
                    Console.WriteLine("Client Info\n");

                    Console.WriteLine("Client ID : " + Client.ClientID);
                    Console.WriteLine("Person ID : " + Client.personID);
                    Console.WriteLine("Client Name " + Client.FirstName);
                    Console.WriteLine("Client LastName " + Client.LastName);
                    Console.WriteLine("Full Name " + Client.FullName);
                    Console.WriteLine("AccountNumber " + Client.AccountNumber);
                    ;
                    Console.WriteLine("Email : " + Client.Email);
                    Console.WriteLine("Phone : " + Client.Phone);
                    Console.WriteLine("PinCode : " + Client.PINCODE);
                    Console.WriteLine("AccountBalance : " + Client.AccountBalance);
                }
                else
                {
                    Console.WriteLine("The CLient Is Not Found ");
                }
            }
            else
            {
                Console.WriteLine("The CLient Not Exist ");
            }
        }

        public static void testFindBYEmail(string Email)
        {
            ClientsBusiness Client = ClientsBusiness.FindClientByEmail(Email);

            if (Client != null)
            {
                Console.WriteLine("Client Info\n");

                Console.WriteLine("Client ID : " + Client.ClientID);
                Console.WriteLine("Person ID : " + Client.personID);
                Console.WriteLine("Client Name " + Client.FirstName);
                Console.WriteLine("Client LastName " + Client.LastName);
                Console.WriteLine("Full Name " + Client.FullName);
                Console.WriteLine("AccountNumber " + Client.AccountNumber);
                ;
                Console.WriteLine("Email : " + Client.Email);
                Console.WriteLine("Phone : " + Client.Phone);
                Console.WriteLine("PinCode : " + Client.PINCODE);
                Console.WriteLine("AccountBalance : " + Client.AccountBalance);
            }
        }

        public static void testFindBYAccountNumber(string AccountNumber)
        {
            if (ClientsBusiness.isClientExistbyAccountNumber(AccountNumber))
            {
                ClientsBusiness Client = ClientsBusiness.FindClientByAccountNumber(AccountNumber);

                if (Client != null)
                {
                    Console.WriteLine("Client Info\n");

                    Console.WriteLine("Client ID : " + Client.ClientID);
                    Console.WriteLine("Person ID : " + Client.personID);
                    Console.WriteLine("Client Name " + Client.FirstName);
                    Console.WriteLine("Client LastName " + Client.LastName);
                    Console.WriteLine("Full Name " + Client.FullName);
                    Console.WriteLine("AccountNumber " + Client.AccountNumber);
                    ;
                    Console.WriteLine("Email : " + Client.Email);
                    Console.WriteLine("Phone : " + Client.Phone);
                    Console.WriteLine("PinCode : " + Client.PINCODE);
                    Console.WriteLine("AccountBalance : " + Client.AccountBalance);
                }
                else
                {
                    Console.WriteLine("The CLient Is Not Found ");
                }
            }
            else
            {
                Console.WriteLine("The CLient Not Exist ");
            }
        }

        public static void ListClient()
        {
            DataTable dt = ClientsBusiness.GetClientList();

            foreach (DataRow row in dt.Rows)
            {
                Console.WriteLine($"ClientID : {row["ClientID"]} , FirstName : {row["FirstName"]}");
            }
        }

        public static void AddNewClient()
        {
            ClientsBusiness NewClient = new ClientsBusiness();

            NewClient.FirstName = "lalalala";
            NewClient.LastName = "Gamal";
            NewClient.Email = "ALi@G.com";
            NewClient.Phone = "6565234";
            NewClient.PINCODE = "F00";
            NewClient.AccountNumber = "A555";
            NewClient.AccountBalance = 8888;

            if (NewClient.Save())
            {
                Console.WriteLine("Done Ya Moalem");

                ListClient();
            }
            else
            {
                Console.WriteLine("Not Done ");
            }
        }

        public static void DeleteClient(int ID)
        {
            if (ClientsBusiness.isClientExistbyID(ID))
            {
                if (ClientsBusiness.DeleteClientByID(ID))
                {
                    Console.WriteLine("The Client IS Deleted");
                    ListClient();
                }
                else
                {
                    Console.WriteLine("The Client IS  Not Deleted");
                }
            }
            else
            {
                Console.WriteLine("The Doesn't Exist ");
            }
        }

        public static void Update(int ID)
        {
            if (ClientsBusiness.isClientExistbyID(ID))
            {
                ClientsBusiness UpdateClinet = ClientsBusiness.FindClient(ID);

                if (UpdateClinet != null)
                {
                    UpdateClinet.FirstName = "Asharf";
                    UpdateClinet.LastName = "said";
                    UpdateClinet.Phone = "5894961";
                    UpdateClinet.Email = "As@d.com";
                    UpdateClinet.PINCODE = "UUU9";

                    UpdateClinet.AccountNumber = "A99";
                    UpdateClinet.AccountBalance = 5647;

                    if (UpdateClinet.Save())
                    {
                        Console.WriteLine($"The Client {ID} IS Upadate");
                        ListClient();
                    }
                    else
                    {
                        Console.WriteLine($"The Client  {ID} IS NOt Upadate");
                    }
                }
                else
                {
                    Console.WriteLine($"The Client  {ID} IS NOt Found");
                }
            }
            else
            {
                Console.WriteLine($"The Client  {ID} IS NOt Exist");
            }
        }

        // User Methods ==================================================;



        public static void FIndUSerbyID(int ID)
        {
            UserBussinees User1 = UserBussinees.FindUserByID(ID);

            if (User1 != null)
            {
                Console.WriteLine("The USer is Found ");
                Console.WriteLine("USerID : " + User1.User_ID);
                Console.WriteLine("USerName : " + User1.personID);
                Console.WriteLine("Person ID : " + User1.UserName);

                Console.WriteLine("Client Name " + User1.FirstName);
                Console.WriteLine("Client LastName " + User1.LastName);
                Console.WriteLine("Full Name " + User1.FullName);
                ;
                Console.WriteLine("Email : " + User1.Email);
                Console.WriteLine("Phone : " + User1.Phone);
                Console.WriteLine("Password : " + User1.Password);
                Console.WriteLine("Permission : " + User1.Permission);
            }
            else
            {
                Console.WriteLine("the USer Not Found");
            }
        }

        public static void ListUser()
        {
            DataTable dt = UserBussinees.GetAllUsers();

            foreach (DataRow row in dt.Rows)
            {
                Console.WriteLine(
                    $"UserID : {row["UserID"]} \tPerson ID : {row["PersonID"]} \tUserName : {row["UserName"]} \tPassWord : {row["PassWord"]} \tPermission : {row["Permission"]} \n\n"
                        + $"FirstName : {row["FirstName"]} \tLastName : {row["LastName"]} \tEmail {row["Email"]} \tphone {row["Phone"]}\n"
                );
            }
        }

        public static void AddNewUser()
        {
            UserBussinees NewUser = new UserBussinees();

            NewUser.UserName = "mohoemd";
            NewUser.Password = "Pass6666";
            NewUser.Permission = -1;
            NewUser.FirstName = "mohomed";
            NewUser.LastName = "Reda";
            NewUser.Email = "Mohomed@aa.com";
            NewUser.Phone = "000000";

            if (NewUser.Save())
            {
                Console.WriteLine("Done ya malem");

                ListUser();
            }
            else
            {
                Console.WriteLine(" the addition Failed ");
            }
        }

        public static void UpdateUser(int id)
        {
            UserBussinees NewUser = UserBussinees.FindUserByID(id);

            if (NewUser != null)
            {
                NewUser.UserName = "lol";
                NewUser.Password = "Pass6666";
                NewUser.Permission = -1;
                NewUser.FirstName = "mohomed";
                NewUser.LastName = "Reda";
                NewUser.Email = "Mohomed@aa.com";
                NewUser.Phone = "000000";

                if (NewUser.Save())
                {
                    Console.WriteLine("Done");

                    ListUser();
                }
                else
                {
                    Console.WriteLine("not done");
                    ListUser();
                }
            }
            else
            {
                Console.WriteLine("the user not found");
                ListUser();
            }
        }

        public static void isExistUser(int ID)
        {
            if (UserBussinees.IsUserExist(ID))
            {
                Console.WriteLine("Not Exist ");
            }
            else
            {
                Console.WriteLine("is Exist ");
            }
        }

        public static void DeleteUser(int ID)
        {
            if (UserBussinees.IsUserExist(ID))
            {
                if (UserBussinees.DeleteUserbyID(ID))
                {
                    Console.WriteLine($"the User {ID}  is Deleted");
                    ListUser();
                }
                else
                {
                    Console.WriteLine($"the User {ID}  is not Deleted");
                }
            }
            else
            {
                Console.WriteLine($"the User {ID}  is not Existed");
            }
        }

        public static void Deposite(float AMount, int ClinetID, int userID)
        {
            ClientsBusiness client = ClientsBusiness.FindClient(ClinetID);

            if (client.Deposite(AMount, userID))
            {
                Console.WriteLine("The Operation Is Done");
            }
            else
            {
                Console.WriteLine("The Operation is not done ");
            }
        }

        public static void withDraw(float AMount, int ClinetID, int userID)
        {
            ClientsBusiness client = ClientsBusiness.FindClient(ClinetID);

            if (client.WithDraw(AMount, userID))
            {
                Console.WriteLine("The Operation withDraw Is Done");
            }
            else
            {
                Console.WriteLine("The Operation is not done ");
            }
        }

        public static void TransFer(float Amount, int ClientID, int ReciverID, int UserID)
        {
            ClientsBusiness client = ClientsBusiness.FindClient(ClientID);
            ClientsBusiness Reciver = ClientsBusiness.FindClient(ReciverID);
            if (client.Transfer(Amount, Reciver, UserID))
            {
                Console.WriteLine("The Operation TransFer Is Done");
            }
            else
            {
                Console.WriteLine("The Operation is not done ");
            }
        }

        public static void TransActionLIst()
        {
            DataTable dt = ClientsBusiness.TransActionList();

            foreach (DataRow row in dt.Rows)
            {
                Console.WriteLine(
                    $"TransActionID {row["TransActionID"]}  TransActionType_ID {row["TransActionType_ID"]} "
                        + $" TransActionName {row["TransActionName"]} ClientID {row["ClientID"]} Reciver_ID{row["Reciver_ID"]} User_ID{row["User_ID"]} TransAction_Date_TIme :{row["TransAction_Date_TIme"]} Amount: {row["Amount"]} "
                );
            }
        }

        static void Main(string[] args)
        {
            //testFindClient(1);
            //testFindBYAccountNumber("A109");
            //AddNewClient();
            //ListClient();

            //DeleteClient(1007);

            //Update(1006);

            // FIndUSerbyID(1002);



            Console.WriteLine("\n========================================\n");
            //  ListUser();


            ListClient();

            //UpdateUser(1002);

            //   isExistUser(105);

            //FIndUSerbyID(1);
            //  DeleteUser(1003);

            //AddNewUser();

            Deposite(500, 2, 2);
            //withDraw(500, 2, 1);

            // TransFer(55, 2, 4, 2);

            //TransActionLIst();

            Console.ReadKey();
        }
    }
}
