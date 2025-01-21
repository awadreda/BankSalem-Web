using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankSalemDataAccessLayer
{
    public static class TransActionData
    {
        //static DateTime Datenow()
        //{
        //    DateTime dt = DateTime.Now;
        //    DateTime Mydt = new DateTime(dt.Year, dt.Month, dt.Day, dt.Hour, dt.Minute, dt.Second);
        //    return Mydt;
        //}



        public static bool SaveDepositeOrWithDraw(
            int UserID,
            int ClientID,
            float Amount,
            float BalanceBeforeDeposite,
            float BalanceAfterDeposite,
            int TransActoin_Type_ID
        )
        {
            int rowsAffected = 0;
            SqlConnection connection = new SqlConnection(DataConnectionSettings.ConnectionString);
            //  string query = "INSERT INTO [dbo].[TransActionS] ([TransActoin_Type_ID], [ClientID], [Reciver_ID], [User_ID], [TransAction_Date_TIme], [Amount], [Client_Amount_Before], [Client_Amount_After], [Reciver_Amount_Berfore], [Reciver_Amount_After])" +
            //    " VALUES (@TransActoin_Type_ID, @ClientID, @Reciver_ID, @User_ID, @TransAction_Date_TIme, @Amount, @Client_Amount_Before, @Client_Amount_After, @Reciver_Amount_Berfore, @Reciver_Amount_After)";

            //   string query = "INSERT INTO [dbo].[TransActionS] ([TransActoin_Type_ID],[User_ID] ,[ClientID],[Reciver_ID][TransAction_Date_TIme]," +
            //    "[Amount],[Client_Amount_Before],[Client_Amount_After],[Reciver_Amount_Berfore],[Reciver_Amount_After]) " +
            //"VALUES (@TransActoin_Type_ID, @User_ID, @ClientID, @Reciver_ID, @TransAction_Date_TIme, @Amount, @Client_Amount_Before, @Client_Amount_After, @Reciver_Amount_Berfore, @Reciver_Amount_After)";

            string query =
                "INSERT INTO [dbo].[TransActionS] ([TransActoin_Type_ID], [User_ID], [ClientID], [Reciver_ID], [TransAction_Date_TIme], [Amount], [Client_Amount_Before], [Client_Amount_After], [Reciver_Amount_Berfore], [Reciver_Amount_After]) "
                + "VALUES (@TransActoin_Type_ID, @User_ID, @ClientID, @Reciver_ID, @TransAction_Date_TIme, @Amount, @Client_Amount_Before, @Client_Amount_After, @Reciver_Amount_Berfore, @Reciver_Amount_After)";

            SqlCommand command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@TransActoin_Type_ID", TransActoin_Type_ID);
            command.Parameters.AddWithValue("@User_ID", UserID);
            command.Parameters.AddWithValue("@ClientID", ClientID);
            command.Parameters.AddWithValue("@Reciver_ID", DBNull.Value);
            command.Parameters.AddWithValue("@TransAction_Date_TIme", DateTime.Now);
            command.Parameters.AddWithValue("@Amount", Amount);
            command.Parameters.AddWithValue("@Client_Amount_Before", BalanceBeforeDeposite);
            command.Parameters.AddWithValue("@Client_Amount_After", BalanceAfterDeposite);
            command.Parameters.AddWithValue("@Reciver_Amount_Berfore", DBNull.Value);
            command.Parameters.AddWithValue("@Reciver_Amount_After", DBNull.Value);

            try
            {
                connection.Open();

                rowsAffected = command.ExecuteNonQuery();
            }
            catch { }
            finally
            {
                connection.Close();
            }

            return (rowsAffected > 0);
        }

        public static bool SaveTransfer(
            int UserID,
            int ClientID,
            int ReciverID,
            float Amount,
            float CLientBalanceBefore,
            float ClientBalaceAfter,
            float ReciverBalanceBefore,
            float ReciverBalanceAfter,
            int TransActionTypeID
        )
        {
            int rowsAffected = 0;
            SqlConnection connection = new SqlConnection(DataConnectionSettings.ConnectionString);

            //   string query = "INSERT INTO [dbo].[TransActionS] ([TransActoin_Type_ID], [ClientID], [Reciver_ID], [User_ID], [TransAction_Date_TIme], " +
            //     "[Amount], [Client_Amount_Before], [Client_Amount_After], [Reciver_Amount_Berfore], [Reciver_Amount_After])" +
            //" VALUES (@TransActoin_Type_ID, @ClientID, @Reciver_ID, @User_ID, @TransAction_Date_TIme, @Amount, @Client_Amount_Before, @Client_Amount_After, @Reciver_Amount_Berfore, @Reciver_Amount_After)";



            // string query = "INSERT INTO [dbo].[TransActionS] ([TransActoin_Type_ID],[User_ID] ,[ClientID],[Reciver_ID],[TransAction_Date_TIme]," +
            //  "[Amount],[Client_Amount_Before],[Client_Amount_After],[Reciver_Amount_Berfore],[Reciver_Amount_After]) " +
            //   "VALUES(@TransActoin_Type_ID, @User_ID, @ClientID, @Reciver_ID, @TransAction_Date_TIme, @Amount, @Client_Amount_Before, @Client_Amount_After, @Reciver_Amount_Berfore, @Reciver_Amount_After)";

            string query =
                "INSERT INTO [dbo].[TransActionS] ([TransActoin_Type_ID], [User_ID], [ClientID], [Reciver_ID], [TransAction_Date_TIme], [Amount], [Client_Amount_Before], [Client_Amount_After], [Reciver_Amount_Berfore], [Reciver_Amount_After]) "
                + "VALUES (@TransActoin_Type_ID, @User_ID, @ClientID, @Reciver_ID, @TransAction_Date_TIme, @Amount, @Client_Amount_Before, @Client_Amount_After, @Reciver_Amount_Berfore, @Reciver_Amount_After)";

            SqlCommand command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@TransActoin_Type_ID", TransActionTypeID);
            command.Parameters.AddWithValue("@User_ID", UserID);
            command.Parameters.AddWithValue("@ClientID", ClientID);
            command.Parameters.AddWithValue("@Reciver_ID", ReciverID);
            command.Parameters.AddWithValue("@TransAction_Date_TIme", DateTime.Now);
            command.Parameters.AddWithValue("@Amount", Amount);
            command.Parameters.AddWithValue("@Client_Amount_Before", CLientBalanceBefore);
            command.Parameters.AddWithValue("@Client_Amount_After", ClientBalaceAfter);
            command.Parameters.AddWithValue("@Reciver_Amount_Berfore", ReciverBalanceBefore);
            command.Parameters.AddWithValue("@Reciver_Amount_After", ReciverBalanceAfter);

            try
            {
                connection.Open();

                rowsAffected = command.ExecuteNonQuery();
            }
            catch { }
            finally
            {
                connection.Close();
            }

            return (rowsAffected > 0);
        }

        public static DataTable GetAllTransAction()
        {
            DataTable TransActionTable = new DataTable();

            SqlConnection connection = new SqlConnection(DataConnectionSettings.ConnectionString);

            string quary = "select* from TransActionLIstView;";

            SqlCommand command = new SqlCommand(quary, connection);

            try
            {
                connection.Open();

                SqlDataReader reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    TransActionTable.Load(reader);
                }
            }
            catch { }
            finally
            {
                connection.Close();
            }

            return TransActionTable;
        }
    }
}
