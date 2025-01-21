using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BankbusinessLayer.DTOs
{
    public class LogRegisterDTO
    {
        public int LogID { get; set; }
        public int UserID { get; set; }
        public string UserName { get; set; }
        public int LogTypeID { get; set; }
        public string LogeTypeName { get; set; }
        public DateTime? LogTime { get; set; } 
    }
}
