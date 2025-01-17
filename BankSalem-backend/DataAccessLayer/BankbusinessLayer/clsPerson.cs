using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankbusinessLayer
{
    public class clsPerson
    {
        public int personID { get; set; }
        public string FirstName { set; get; }

        public string LastName { set; get; }
        public string Email { set; get; }
        public string Phone { set; get; }

        public string FullName
        {
            get
            {

                return FirstName + " " + LastName;
            }
        }

        public clsPerson()
        {
            this.personID = -1;
            this.FirstName = "";
            this.LastName = "";
            this.Email = "";
            this.Phone = "";
        }

        public clsPerson(int id, string FirstName, string LastName, string Email, string Phone)
        {
            this.personID = id;
            this.FirstName = FirstName;
            this.LastName = LastName;
            this.Email = Email;
            this.Phone = Phone;
        }
    }
}
