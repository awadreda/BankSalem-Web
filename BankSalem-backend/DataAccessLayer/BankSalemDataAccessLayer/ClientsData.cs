using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankSalemDataAccessLayer
{
    public class ClientsData
    {
        public static bool getClinet(
            int ID,
            ref int PersonID,
            ref string FirstName,
            ref string LastName,
            ref string Email,
            ref string Phone,
            ref string AccountNumber,
            ref string PINCODE,
            ref double AccountBalance
        )
        {
            bool isFound = false;

            SqlConnection connection = new SqlConnection(DataConnectionSettings.ConnectionString);

            string query =
                @"SELECT * FROM (SELECT dbo.Clients.ClientID, dbo.Persons.PersonID, dbo.Persons.FirstName, dbo.Persons.LastName, dbo.Persons.Email, dbo.Persons.Phone, dbo.Clients.AccountNumber, dbo.Clients.PINCode, dbo.Clients.AccountBalance FROM dbo.Persons INNER JOIN dbo.Clients ON dbo.Persons.PersonID = dbo.Clients.PersonID) AS ti WHERE ClientID = @ClientID;";

            SqlCommand command = new SqlCommand(query, connection);

            command.Parameters.AddWithValue("@ClientID", ID);

            try
            {
                connection.Open();

                SqlDataReader reader = command.ExecuteReader();

                if (reader.Read())
                {
                    PersonID = (int)reader["PersonID"];
                    FirstName = (string)reader["FirstName"];
                    LastName = (string)reader["LastName"];
                    Email = (string)reader["Email"];
                    Phone = (string)reader["Phone"];
                    AccountNumber = (string)reader["AccountNumber"];
                    PINCODE = (string)reader["PINCode"];
                    AccountBalance = Convert.ToSingle(reader["AccountBalance"]);
                }

                reader.Close();

                isFound = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("erro " + ex.Message);
                isFound = false;
            }
            finally
            {
                connection.Close();
            }

            return isFound;
        }

        public static bool getClientByEmail(
            string Email,
            ref int ClientID,
            ref int PersonID,
            ref string FirstName,
            ref string LastName,
            ref string Phone,
            ref string AccountNumber,
            ref string PINCODE,
            ref double AccountBalance
        )
        {
            bool isFound = false;

            SqlConnection connection = new SqlConnection(DataConnectionSettings.ConnectionString);

            string query =
                @" select *from Clients_Persons_List
						 where Email=@Email;";

            SqlCommand command = new SqlCommand(query, connection);

            command.Parameters.AddWithValue("@Email", Email);

            try
            {
                connection.Open();

                SqlDataReader reader = command.ExecuteReader();

                if (reader.Read())
                {
                    ClientID = (int)reader["ClientID"];
                    PersonID = (int)reader["PersonID"];
                    FirstName = (string)reader["FirstName"];
                    LastName = (string)reader["LastName"];
                    Phone = (string)reader["Phone"];
                    AccountNumber = (string)reader["AccountNumber"];
                    PINCODE = (string)reader["PINCode"];
                    AccountBalance = Convert.ToSingle(reader["AccountBalance"]);
                }

                reader.Close();

                isFound = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("erro " + ex.Message);
                isFound = false;
            }
            finally
            {
                connection.Close();
            }

            return isFound;
        }

        public static bool getClientByFirstName(
            ref string Email,
            ref int ClientID,
            ref int PersonID,
            string FirstName,
            ref string LastName,
            ref string Phone,
            ref string AccountNumber,
            ref string PINCODE,
            ref double AccountBalance
        )
        {
            bool isFound = false;

            SqlConnection connection = new SqlConnection(DataConnectionSettings.ConnectionString);

            string query =
                @" select *from Clients_Persons_List
						 where FirstName=@FirstName;";

            SqlCommand command = new SqlCommand(query, connection);

            command.Parameters.AddWithValue("@FirstName", FirstName);

            try
            {
                connection.Open();

                SqlDataReader reader = command.ExecuteReader();

                if (reader.Read())
                {
                    ClientID = (int)reader["ClientID"];
                    PersonID = (int)reader["PersonID"];
                    FirstName = (string)reader["FirstName"];
                    LastName = (string)reader["LastName"];
                    Phone = (string)reader["Phone"];
                    AccountNumber = (string)reader["AccountNumber"];
                    PINCODE = (string)reader["PINCode"];
                    AccountBalance = Convert.ToSingle(reader["AccountBalance"]);
                }

                reader.Close();

                isFound = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("erro " + ex.Message);
                isFound = false;
            }
            finally
            {
                connection.Close();
            }

            return isFound;
        }

        public static bool getClientByAccountNumber(
            string AccountNumber,
            ref string Email,
            ref int ClientID,
            ref int PersonID,
            ref string FirstName,
            ref string LastName,
            ref string Phone,
            ref string PINCODE,
            ref double AccountBalance
        )
        {
            bool isFound = false;

            SqlConnection connection = new SqlConnection(DataConnectionSettings.ConnectionString);

            string query =
                @" select *from Clients_Persons_List
						 where AccountNumber=@AccountNumber;";

            SqlCommand command = new SqlCommand(query, connection);

            command.Parameters.AddWithValue("@AccountNumber", AccountNumber);

            try
            {
                connection.Open();

                SqlDataReader reader = command.ExecuteReader();

                if (reader.Read())
                {
                    ClientID = (int)reader["ClientID"];
                    PersonID = (int)reader["PersonID"];
                    FirstName = (string)reader["FirstName"];
                    LastName = (string)reader["LastName"];
                    Email = (string)reader["Email"];
                    Phone = (string)reader["Phone"];
                    PINCODE = (string)reader["PINCode"];
                    AccountBalance = Convert.ToSingle(reader["AccountBalance"]);
                }

                reader.Close();

                isFound = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("erro " + ex.Message);
                isFound = false;
            }
            finally
            {
                connection.Close();
            }

            return isFound;
        }

        public static DataTable GetAllClientsFromDb()
        {
            DataTable CLientsDt = new DataTable();

            SqlConnection connection = new SqlConnection(DataConnectionSettings.ConnectionString);

            //string Query = " SELECT    dbo.Clients.ClientID, dbo.Persons.PersonID, dbo.Persons.FirstName, dbo.Persons.LastName, dbo.Persons.Email, dbo.Persons.Phone, dbo.Clients.AccountNumber, dbo.Clients.PINCode, dbo.Clients.AccountBalance " +
            //  "FROM dbo.Persons INNER JOIN    " +
            // "  dbo.Clients ON dbo.Persons.PersonID = dbo.Clients.PersonID";

            string Query = "select *from Clients_Persons_List;";

            SqlCommand command = new SqlCommand(Query, connection);

            try
            {
                connection.Open();

                SqlDataReader reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    CLientsDt.Load(reader);
                }

                reader.Close();
            }
            catch { }
            finally
            {
                connection.Close();
            }

            return CLientsDt;
        }

        public static DataTable GetTotalBanlancesFromDB()
        {
            DataTable CLientsDt = new DataTable();

            SqlConnection connection = new SqlConnection(DataConnectionSettings.ConnectionString);

            string Query = "select * from Total_Clients_Balances;";

            SqlCommand command = new SqlCommand(Query, connection);

            try
            {
                connection.Open();

                SqlDataReader reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    CLientsDt.Load(reader);
                }

                reader.Close();
            }
            catch { }
            finally
            {
                connection.Close();
            }

            return CLientsDt;
        }

        public static bool isClientExist(int ClientID)
        {
            bool isfound = false;

            SqlConnection connection = new SqlConnection(DataConnectionSettings.ConnectionString);

            string query =
                @"select A=0  from Clients_Persons_List
						 where ClientID=@ID;";

            SqlCommand command = new SqlCommand(query, connection);

            command.Parameters.AddWithValue("@ID", ClientID);
            try
            {
                connection.Open();

                SqlDataReader reader = command.ExecuteReader();

                isfound = reader.HasRows;

                reader.Close();
            }
            catch { }
            finally
            {
                connection.Close();
            }

            return isfound;
        }

        public static bool isClientExistByAccountNumber(string AccountNumber)
        {
            bool isfound = false;

            SqlConnection connection = new SqlConnection(DataConnectionSettings.ConnectionString);

            string query =
                @"select A=5 from Clients_Persons_List where AccountNumber = @AccountNumber;";

            SqlCommand command = new SqlCommand(query, connection);

            command.Parameters.AddWithValue("@AccountNumber", AccountNumber);

            try
            {
                connection.Open();

                SqlDataReader reader = command.ExecuteReader();

                isfound = reader.HasRows;

                reader.Close();
            }
            catch { }
            finally
            {
                connection.Close();
            }

            return isfound;
        }

        //public static bool AddNewCLientint(ref int ClientID,ref int  Person_id , string FirstName,  string LastName,  string Email,  string Phone,  string AccountNumber
        //  ,  string PINCODE,  double AccountBalance)
        //{


        //    bool result = false;

        //    SqlConnection connection = new SqlConnection(DataConnectionSettings.ConnectionString);

        //    string query = @" insert into Persons(FirstName, LastName, Email, Phone) " +
        //        "values(@FirstName, @LastName, @Email, @Phone)" +
        //        " insert into Clients(AccountNumber, PINCode, AccountBalance, PersonID)" +
        //        " values(@AccountNumber, @PINCODE, @AccountBalance, (select top 1 SCOPE_IDENTITY() from Persons ))" +
        //        " select top 1 SCOPE_IDENTITY() from Clients;";


        //    SqlCommand command = new SqlCommand(query, connection);

        //    command.Parameters.AddWithValue("@FirstName", FirstName);
        //    command.Parameters.AddWithValue("@LastName", LastName);
        //    command.Parameters.AddWithValue("@Email", Email);
        //    command.Parameters.AddWithValue("@Phone", Phone);
        //    command.Parameters.AddWithValue("@AccountNumber", AccountNumber);
        //    command.Parameters.AddWithValue("@PINCODE", PINCODE);
        //    command.Parameters.AddWithValue("@AccountBalance", AccountBalance);


        //    try
        //    {
        //        connection.Open();

        //        object getClintid = command.ExecuteScalar();

        //        if(getClintid != null &&int.TryParse(getClintid.ToString(), out int id))
        //        {
        //            ClientID = id;
        //            result = true;
        //        }
        //        else
        //        {
        //            result = false;
        //        }

        //        if (result != false)
        //        {
        //            string QueryToGetPersonID = @"select Clients.PersonID from Clients where ClientID =@ClientID  --select top 1 SCOPE_IDENTITY() from Clients  ;";

        //            SqlCommand command_ToGet_PersonID = new SqlCommand(QueryToGetPersonID,connection);
        //            command_ToGet_PersonID.Parameters.AddWithValue("@ClientID", ClientID);

        //            object O_getPersonID = command.ExecuteScalar();

        //            if(O_getPersonID!=null&&int.TryParse(O_getPersonID.ToString(),out int indexPersonID))
        //                {
        //                Person_id = indexPersonID
        //                    ;result = true;
        //            }
        //            else
        //            {
        //                result = false;
        //            }


        //        }




        //    }
        //    catch
        //    {
        //        result = false;
        //    }
        //    finally
        //    {
        //        connection.Close();
        //    }

        //    return result;
        //}





        public static bool ChatgptAddNewClient(
            ref int ClientID,
            ref int PersonID,
            string FirstName,
            string LastName,
            string Email,
            string Phone,
            string AccountNumber,
            string PINCODE,
            double AccountBalance
        )
        {
            bool result = false;
            SqlConnection connection = new SqlConnection(DataConnectionSettings.ConnectionString);

            try
            {
                connection.Open();

                // Insert into Persons table
                string insertPersonQuery =
                    @"INSERT INTO Persons (FirstName, LastName, Email, Phone) VALUES (@FirstName, @LastName, @Email, @Phone); SELECT SCOPE_IDENTITY();";
                SqlCommand insertPersonCommand = new SqlCommand(insertPersonQuery, connection);
                insertPersonCommand.Parameters.AddWithValue("@FirstName", FirstName);
                insertPersonCommand.Parameters.AddWithValue("@LastName", LastName);
                insertPersonCommand.Parameters.AddWithValue("@Email", Email);
                insertPersonCommand.Parameters.AddWithValue("@Phone", Phone);

                // Execute the insert command and get the generated PersonID
                int insertedPersonID = Convert.ToInt32(insertPersonCommand.ExecuteScalar());

                // Insert into Clients table
                string insertClientQuery =
                    @"INSERT INTO Clients (AccountNumber, PINCode, AccountBalance, PersonID) VALUES (@AccountNumber, @PINCODE, @AccountBalance, @PersonID); SELECT SCOPE_IDENTITY();";
                SqlCommand insertClientCommand = new SqlCommand(insertClientQuery, connection);
                insertClientCommand.Parameters.AddWithValue("@AccountNumber", AccountNumber);
                insertClientCommand.Parameters.AddWithValue("@PINCODE", PINCODE);
                insertClientCommand.Parameters.AddWithValue("@AccountBalance", AccountBalance);
                insertClientCommand.Parameters.AddWithValue("@PersonID", insertedPersonID);

                // Execute the insert command and get the generated ClientID
                ClientID = Convert.ToInt32(insertClientCommand.ExecuteScalar());

                // Set the PersonID
                PersonID = insertedPersonID;

                result = true;
            }
            catch (Exception ex)
            {
                // Handle exceptions
                Console.WriteLine("Error: " + ex.Message);
                result = false;
            }
            finally
            {
                // Close the connection
                connection.Close();
            }

            return result;
        }

        public static bool UpdateClinet(
            int ClientID,
            int PersonID,
            string FirstName,
            string LastName,
            string Email,
            string Phone,
            string AccountNumber,
            string PINCODE,
            double AccountBalance
        )
        {
            int RowsAffected = 0;
            SqlConnection connection = new SqlConnection(DataConnectionSettings.ConnectionString);

            string Query =
                "UPDATE Clients SET AccountNumber = @AccountNumber, PINCode = @PINCode, AccountBalance = @AccountBalance WHERE ClientID = @ClientID;"
                + " UPDATE Persons SET FirstName = @FirstName, LastName = @LastName, Email = @Email, Phone = @Phone WHERE PersonID = @PersonID;";

            SqlCommand command = new SqlCommand(Query, connection);

            command.Parameters.AddWithValue("@ClientID", ClientID);
            command.Parameters.AddWithValue("@PersonID", PersonID);
            command.Parameters.AddWithValue("@FirstName", FirstName);
            command.Parameters.AddWithValue("@LastName", LastName);
            command.Parameters.AddWithValue("@Email", Email);
            command.Parameters.AddWithValue("@Phone", Phone);
            command.Parameters.AddWithValue("@AccountNumber", AccountNumber);
            command.Parameters.AddWithValue("@PINCode", PINCODE);
            command.Parameters.AddWithValue("@AccountBalance", AccountBalance);

            try
            {
                connection.Open();
                RowsAffected = command.ExecuteNonQuery();
            }
            catch { }
            finally
            {
                connection.Close();
            }

            return (RowsAffected > 0);
        }

        public static bool DeleteClinetFromDb(int Id)
        {
            int RowsAffected = 0;

            SqlConnection connection = new SqlConnection(DataConnectionSettings.ConnectionString);

            //  worng  =>    string quary = "delete from Persons where PersonID = (select Clients.PersonID from Clients where ClientID = @Id) ; DELETE FROM clients WHERE ClientID=@Id; ";

            string quaryAfterModfing =
                @"DELETE FROM Clients WHERE ClientID = @Id; DELETE FROM Persons WHERE PersonID NOT IN (SELECT PersonID FROM Clients) AND PersonID NOT IN (SELECT PersonID FROM Users);";

            SqlCommand command = new SqlCommand(quaryAfterModfing, connection);
            command.Parameters.AddWithValue("@Id", Id);

            try
            {
                connection.Open();

                RowsAffected = command.ExecuteNonQuery();
            }
            catch { }
            {
                connection.Close();
            }

            return (RowsAffected > 0);
        }
    }
}
