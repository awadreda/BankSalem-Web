using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BankbusinessLayer;
using BankSalemDataAccessLayer;

namespace BankbusinessLayer
{
    public class UserBussinees : clsPerson
    {
        enum enMode
        {
            Addnew = 1,
            Update = 2,
        };

        public int User_ID { private set; get; }
        public string UserName { set; get; }

        public string Password { set; get; }
        public int Permission { set; get; }
        enMode Mode = enMode.Addnew;

        public UserBussinees()
        {
            this.User_ID = -1;
            this.UserName = "";
            this.Password = "";
            this.Permission = -1;
            Mode = enMode.Addnew;
        }

        private UserBussinees(
            int User_ID,
            string UserName,
            string Password,
            int Permission,
            int PersonID,
            string FirstName,
            string LastName,
            string Email,
            string Phone
        )
            : base(PersonID, FirstName, LastName, Email, Phone)
        {
            this.User_ID = User_ID;
            this.UserName = UserName;
            this.Password = Password;
            this.Permission = Permission;
            Mode = enMode.Update;
        }

        public static UserBussinees FindUserByID(int ID)
        {
            int PersonID = -1;
            string FirstName = "";
            string LastName = "";
            string Email = "";
            string Phone = "";
            string UserName = "";
            string PassWord = "";
            int Permission = -1;

            if (
                UserData.Findchat(
                    ID,
                    ref PersonID,
                    ref UserName,
                    ref FirstName,
                    ref LastName,
                    ref Email,
                    ref Phone,
                    ref PassWord,
                    ref Permission
                )
            )
            {
                return new UserBussinees(
                    ID,
                    UserName,
                    PassWord,
                    Permission,
                    PersonID,
                    FirstName,
                    LastName,
                    Email,
                    Phone
                );
            }
            else
            {
                return null;
            }
        }

        public static UserBussinees FindUserNameAndPassword(string UserName, string Password)
        {
            int UserID = -1;
            int PersonID = -1;
            string FirstName = "";
            string LastName = "";
            string Email = "";
            string Phone = "";

            int Permission = -1;

            if (
                UserData.FindByUserNameandPassWord(
                    ref UserID,
                    ref PersonID,
                    UserName,
                    ref FirstName,
                    ref LastName,
                    ref Email,
                    ref Phone,
                    Password,
                    ref Permission
                )
            )
            {
                return new UserBussinees(
                    UserID,
                    UserName,
                    Password,
                    Permission,
                    PersonID,
                    FirstName,
                    LastName,
                    Email,
                    Phone
                );
            }
            else
            {
                return null;
            }
        }

        private bool _AddNewUser()
        {
            int Userid = -1;
            int Personid = -1;

            if (
                UserData.AddNewUser(
                    ref Userid,
                    ref Personid,
                    this.UserName,
                    this.Password,
                    this.Permission,
                    this.FirstName,
                    this.LastName,
                    this.Email,
                    this.Email
                )
            )
            {
                this.personID = Personid;
                this.User_ID = Userid;
                return true;
            }

            return false;
        }

        public static DataTable GetAllUsers()
        {
            return UserData.GitAllUsers();
        }

        public bool Save()
        {
            switch (Mode)
            {
                case enMode.Addnew:
                    {
                        if (_AddNewUser())
                        {
                            Mode = enMode.Update;
                            return true;
                        }
                        return false;
                    }
                case enMode.Update:
                    {
                        return _UpdateUser();
                    }
            }
            return false;
        }

        private bool _UpdateUser()
        {
            return UserData.UpdateUser(
                this.User_ID,
                this.personID,
                this.UserName,
                this.Password,
                this.Permission,
                this.FirstName,
                this.LastName,
                this.Email,
                this.Phone
            );
        }

        public static bool IsUserExist(int ID)
        {
            return UserData.ISUserEXist(ID);
        }

        public static bool DeleteUserbyID(int ID)
        {
            return UserData.DeleteUser(ID);
        }

        public static DataTable GetTransActionList()
        {
            return TransActionData.GetAllTransAction();
        }

        ///////////////////////////////logRegister/////////////////////////////

        public static bool RegistLog(int userID, int LogTypeID)
        {
            return LogRegisterDb.SaveRegister(userID, LogTypeID);
        }

        public static DataTable getLogList()
        {
            return LogRegisterDb.ListLogRegister();
        }

        public static bool IsLoggedIn()
        {
            int userid = -1;

            return LogRegisterDb.IsLogedIn(ref userid);
        }

        public static UserBussinees FillUserLogedIN()
        {
            int userid = -1;
            if (LogRegisterDb.IsLogedIn(ref userid))
            {
                return FindUserByID(userid);
            }
            else
            {
                return null;
            }
        }
    }
}
