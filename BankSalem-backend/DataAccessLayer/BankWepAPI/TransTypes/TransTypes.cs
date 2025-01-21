using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BankWepAPI.TransTypes
{
    public class DepositRequest
    {
        public int ClientId { get; set; }
        public double Amount { get; set; }
        public int UserId { get; set; }
    }

    public class WithdrawRequest
    {
        public int ClientId { get; set; }
        public double Amount { get; set; }
        public int UserId { get; set; }
    }

    public class TransferRequest
    {
        public int FromClientId { get; set; }
        public int ToClientId { get; set; }
        public double Amount { get; set; }
        public int UserId { get; set; }
    }
}
