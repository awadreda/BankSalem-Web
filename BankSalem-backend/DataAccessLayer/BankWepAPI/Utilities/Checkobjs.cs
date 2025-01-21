using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BankbusinessLayer.DTOs;

namespace BankWepAPI.Utilities
{
    public static class Checkobjs
    {
        public static bool IsClientDTOInvalid(ClientDTO newClient)
        {
            return newClient == null
                || string.IsNullOrEmpty(newClient.FirstName)
                || string.IsNullOrEmpty(newClient.LastName)
                || string.IsNullOrEmpty(newClient.Email)
                || string.IsNullOrEmpty(newClient.Phone)
                || string.IsNullOrEmpty(newClient.AccountNumber)
                || string.IsNullOrEmpty(newClient.PINCODE)
                || newClient.AccountBalance == 0; // Adjust based on valid AccountBalance values
        }

        internal static bool IsUserDTOInvalid(UserDTO newUserDto)
        {
            return newUserDto == null
                || string.IsNullOrEmpty(newUserDto.UserName)
                || string.IsNullOrEmpty(newUserDto.Password)
                || newUserDto.Permission == 0 // Adjust based on valid Permission values
                || string.IsNullOrEmpty(newUserDto.FirstName)
                || string.IsNullOrEmpty(newUserDto.LastName)
                || string.IsNullOrEmpty(newUserDto.Email)
                || string.IsNullOrEmpty(newUserDto.Phone);
        }
    }
}
