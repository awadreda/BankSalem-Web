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
            "workstation id=myBankDb.mssql.somee.com;packet size=4096;user id=awad_SQLLogin_1;pwd=pl16pd8iy9;data source=myBankDb.mssql.somee.com;persist security info=False;initial catalog=myBankDb;TrustServerCertificate=True;";

        public static string ConnectionString
        {
            get
            {

                return _ConnectionString;
            }
        }
    }
}
