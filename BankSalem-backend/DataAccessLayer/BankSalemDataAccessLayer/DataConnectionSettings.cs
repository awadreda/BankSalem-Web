using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankSalemDataAccessLayer
{
    public static class DataConnectionSettings
    {
        private static string _ConnectionString =
            "Server=127.0.0.1,1433;Database=MyBankDB;User Id=SA;Password=Str0ngP@ssw0rd2025!;";

        public static string ConnectionString
        {
            get
            {

                return _ConnectionString;
            }
        }
    }
}
