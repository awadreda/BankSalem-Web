using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BankbusinessLayer.DTOs
{
    public class ClientDTO
    {
        public ClientDTO(
            int ID,

            string FirstName,
            string LastName,
            string Email,
            string Phone,
            string AccountNumber,
            string PINCODE,
            float AccountBalance
        )
        {
            this.ID = ID;

            this.FirstName = FirstName;
            this.LastName = LastName;
            this.Email = Email;
            this.Phone = Phone;
            this.AccountNumber = AccountNumber;
            this.PINCODE = PINCODE;
            this.AccountBalance = AccountBalance;
        }

        public int ID { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string AccountNumber { get; set; }
        public string PINCODE { get; set; }
        public float AccountBalance { get; set; }
    }
}
