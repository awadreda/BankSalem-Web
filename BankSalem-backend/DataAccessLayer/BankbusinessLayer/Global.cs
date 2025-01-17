using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankbusinessLayer
{
    public static class Global
    {
        public static UserBussinees CurrentUser = UserBussinees.FindUserNameAndPassword("", "");
    }
}
