using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankSalemDataAccessLayer
{
    public static class LogRegisterDb
    {
        public static bool SaveRegister(int UserID, int LogTypeID)
        {
            int rowsAffected = 0;
            SqlConnection connection = new SqlConnection(DataConnectionSettings.ConnectionString);
            string query =
                "INSERT INTO [dbo].[LogRegister] ([UserID], [LogTypeID], [LogTime]) "
                + "VALUES (@UserID, @LogTypeID, @LogTime)";

            SqlCommand command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@UserID", UserID);
            command.Parameters.AddWithValue("@LogTypeID", LogTypeID);
            command.Parameters.AddWithValue("@LogTime", DateTime.Now);

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

        public static DataTable ListLogRegister()
        {
            DataTable dataTable = new DataTable();
            SqlConnection connection = new SqlConnection(DataConnectionSettings.ConnectionString);

            string query = "select *from LogRegisterListView";

            SqlCommand command = new SqlCommand(query, connection);

            try
            {
                connection.Open();

                SqlDataReader reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    dataTable.Load(reader);
                }
            }
            catch { }
            finally
            {
                connection.Close();
            }

            return dataTable;
        }

        public static bool IsLogedIn(ref int userID)
        {
            int logid = -1;

            SqlConnection connection = new SqlConnection(DataConnectionSettings.ConnectionString);
            string query =
                "select  top 1 * from  LogRegisterListView order by LogRegisterListView.LogID desc;";

            SqlCommand command = new SqlCommand(query, connection);

            try
            {
                connection.Open();

                SqlDataReader reader = command.ExecuteReader();

                if (reader.Read())
                {
                    logid = Convert.ToInt32(reader["LogTypeID"]);

                    if (logid == 1)
                    {
                        userID = Convert.ToInt32(reader["UserID"]);
                    }
                    else
                    {
                        userID = -1;
                    }
                }
            }
            catch { }
            finally
            {
                connection.Close();
            }

            return (logid == 1);
        }


        public static DataTable GetUserLogRegister(int userID)
        {
            DataTable dataTable = new DataTable();
            SqlConnection connection = new SqlConnection(DataConnectionSettings.ConnectionString);

            string query = @"SELECT * from [myBankDb].dbo.LogRegisterListView WHERE UserID = @UserID;";
              
            SqlCommand command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@UserID", userID);

            try
            {
                connection.Open();
                SqlDataReader reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    dataTable.Load(reader);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                connection.Close();
            }

            return dataTable;
            
      

         }

    }
}
