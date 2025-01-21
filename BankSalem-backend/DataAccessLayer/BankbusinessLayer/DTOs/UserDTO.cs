using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BankbusinessLayer.DTOs
{
    public class UserDTO
    {
        public UserDTO(
            int user_ID,
            string userName,
            string password,
            int permission,
            string firstName,
            string lastName,
            string email,
            string phone
        )
        {
            User_ID = user_ID;
            UserName = userName;
            Password = password;
            Permission = permission;
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Phone = phone;
        }

        public int User_ID { set; get; }
        public string UserName { set; get; }
        public string Password { set; get; }
        public int Permission { set; get; }
        public string FirstName { set; get; }
        public string LastName { set; get; }
        public string Email { set; get; }
        public string Phone { set; get; }
    }
}
