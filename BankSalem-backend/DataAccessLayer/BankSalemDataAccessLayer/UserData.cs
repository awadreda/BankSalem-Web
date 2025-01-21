using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace BankSalemDataAccessLayer
{
    public class UserData
    {
        public static bool Find(
            ref int UserID,
            ref int PersonID,
            ref string UserName,
            ref string FirstName,
            ref string LastName,
            ref string Email,
            ref string Phone,
            ref string PassWord,
            ref int Permission
        )
        {
            bool isFound = false;

            SqlConnection connection = new SqlConnection(DataConnectionSettings.ConnectionString);
            // string query = "SELECT dbo.Users.UserID, dbo.Persons.*, dbo.Users.UserName, dbo.Users.PassWord, dbo.Users.Permission FROM dbo.Users INNER JOIN dbo.Persons ON dbo.Users.Person_ID = dbo.Persons.PersonID";
            string query = "select * from UserListView where UserID=@UserID";

            SqlCommand command = new SqlCommand(query, connection);

            try
            {
                connection.Close();

                SqlDataReader reader = command.ExecuteReader();
                if (reader.Read())
                {
                    UserID = Convert.ToInt32(reader["UserID"]);
                    PersonID = Convert.ToInt32(reader["PersonID"]);
                    UserName = reader["UserName"].ToString();
                    FirstName = reader["FirstName"].ToString();
                    LastName = reader["LastName"].ToString();
                    Email = reader["Email"].ToString();
                    Phone = reader["Phone"].ToString();
                    PassWord = reader["PassWord"].ToString();
                    Permission = Convert.ToInt32(reader["Permission"]);
                }
                reader.Close();
            }
            catch { }
            finally
            {
                connection.Close();
            }

            return isFound;
        }

        public static bool Findchat(
            int UserID,
            ref int PersonID,
            ref string UserName,
            ref string FirstName,
            ref string LastName,
            ref string Email,
            ref string Phone,
            ref string PassWord,
            ref int Permission
        )
        {
            bool isFound = false;

            SqlConnection connection = new SqlConnection(DataConnectionSettings.ConnectionString);
            //  string query =@"select *from (  SELECT dbo.Users.UserID, dbo.Persons.*, dbo.Users.UserName, dbo.Users.PassWord, dbo.Users.Permission FROM dbo.Users INNER JOIN dbo.Persons " +
            //    "ON dbo.Users.Person_ID = dbo.Persons.PersonID) as t1 " +
            //  "where UserID=@UserID";


            string query = "select * from UserListVeiw where UserID=@UserID";

            SqlCommand command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@UserID", UserID);
            try
            {
                connection.Open();
                SqlDataReader reader = command.ExecuteReader();

                if (reader.Read()) // Check if any data is found
                {
                    isFound = true;
                    UserID = Convert.ToInt32(reader["UserID"]);
                    PersonID = Convert.ToInt32(reader["PersonID"]);
                    UserName = reader["UserName"].ToString();
                    FirstName = reader["FirstName"].ToString();
                    LastName = reader["LastName"].ToString();
                    Email = reader["Email"].ToString();
                    Phone = reader["Phone"].ToString();
                    PassWord = reader["PassWord"].ToString();
                    Permission = Convert.ToInt32(reader["Permission"]);
                }
                reader.Close();
            }
            catch (Exception ex)
            {
                isFound = false;
                // Handle exceptions
                //Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                connection.Close();
            }

            return isFound;
        }

        public static bool FindByUserNameandPassWord(
            ref int UserID,
            ref int PersonID,
            string UserName,
            ref string FirstName,
            ref string LastName,
            ref string Email,
            ref string Phone,
            string PassWord,
            ref int Permission
        )
        {
            bool isFound = false;

            SqlConnection connection = new SqlConnection(DataConnectionSettings.ConnectionString);
            //string query = @"select *from (  SELECT dbo.Users.UserID, dbo.Persons.*, dbo.Users.UserName, dbo.Users.PassWord, dbo.Users.Permission FROM dbo.Users INNER JOIN dbo.Persons " +
            //    "ON dbo.Users.Person_ID = dbo.Persons.PersonID) as t1 " +
            //    "where UserID=@UserID";

            string query =
                @" select *from UserListVeiw  where UserName= @UserName and PassWord = @PassWord ";

            SqlCommand command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@UserName", UserName);
            command.Parameters.AddWithValue("@PassWord", PassWord);
            try
            {
                connection.Open();
                SqlDataReader reader = command.ExecuteReader();

                if (reader.Read()) // Check if any data is found
                {
                    isFound = true;
                    UserID = Convert.ToInt32(reader["UserID"]);
                    PersonID = Convert.ToInt32(reader["PersonID"]);
                    UserName = reader["UserName"].ToString();
                    FirstName = reader["FirstName"].ToString();
                    LastName = reader["LastName"].ToString();
                    Email = reader["Email"].ToString();
                    Phone = reader["Phone"].ToString();
                    PassWord = reader["PassWord"].ToString();
                    Permission = Convert.ToInt32(reader["Permission"]);
                }
                reader.Close();
            }
            catch (Exception ex)
            {
                isFound = false;
                // Handle exceptions
                //Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                connection.Close();
            }

            return isFound;
        }

        public static DataTable GitAllUsers()
        {
            DataTable dt = new DataTable();
            SqlConnection connection = new SqlConnection(DataConnectionSettings.ConnectionString);

            //string query = "SELECT        dbo.Users.UserID, dbo.Users.UserName, dbo.Users.PassWord, dbo.Users.Permission, dbo.Persons.*"
            //               + "   FROM       dbo.Persons INNER JOIN" +
            //          "   dbo.Users ON dbo.Persons.PersonID = dbo.Users.Person_ID";

            string query = "select *From UserListVeiw;";

            SqlCommand command = new SqlCommand(query, connection);

            try
            {
                connection.Open();
                SqlDataReader reader = command.ExecuteReader();
                if (reader.HasRows)
                {
                    dt.Load(reader);
                }

                reader.Close();
            }
            catch { }
            finally
            {
                connection.Close();
            }

            return dt;
        }

        public static bool AddNewUser(
            ref int UserID,
            ref int PersonID,
            string UserName,
            string PassWord,
            int Permissions,
            string FirstName,
            string LastName,
            string Email,
            string Phone
        )
        {
            bool result = false;

            SqlConnection connection = new SqlConnection(DataConnectionSettings.ConnectionString);

            try
            {
                connection.Open();

                string queryforPerson =
                    @"INSERT INTO [dbo].[Persons] ([FirstName], [LastName], [Email], [Phone]) "
                    + "VALUES (@FirstName, @LastName, @Email, @Phone);"
                    + "   select SCOPE_IDENTITY(); ";

                SqlCommand commandforPerson = new SqlCommand(queryforPerson, connection);
                commandforPerson.Parameters.AddWithValue("@FirstName", FirstName);
                commandforPerson.Parameters.AddWithValue("@LastName", LastName);
                commandforPerson.Parameters.AddWithValue("@Email", Email);
                commandforPerson.Parameters.AddWithValue("@Phone", Phone);

                object ID_Forperson = commandforPerson.ExecuteScalar();

                if (
                    ID_Forperson != null
                    && int.TryParse(ID_Forperson.ToString(), out int indexID_ForPerson)
                )
                {
                    PersonID = indexID_ForPerson;
                }

                string i =
                    "INSERT INTO [dbo].[Users] ([PersonID], [UserName], [PassWord], [Permission]) "
                    + "VALUES (@FirstName, @LastName, @Email, @Phone)";

                string QueryForUser =
                    @"INSERT INTO [dbo].[Users] ([PersonID], [UserName], [PassWord], [Permission]) 
                                    VALUES (@PersonID,@UserName,@PassWord,@Permissions);select SCOPE_IDENTITY();";

                SqlCommand commandFORUser = new SqlCommand(QueryForUser, connection);

                commandFORUser.Parameters.AddWithValue("@PersonID", PersonID);
                commandFORUser.Parameters.AddWithValue("@UserName", UserName);
                commandFORUser.Parameters.AddWithValue("@PassWord", PassWord);
                commandFORUser.Parameters.AddWithValue("@Permissions", Permissions);

                object OID_for_User = commandFORUser.ExecuteScalar();

                if (
                    OID_for_User != null
                    && int.TryParse(OID_for_User.ToString(), out int IndexUserID)
                )
                {
                    UserID = IndexUserID;
                }

                result = true;
            }
            catch
            {
                result = false;
            }
            finally
            {
                connection.Close();
            }

            return result;
        }

        public static bool UpdateUser(
            int UserID,
            int PersonID,
            string Username,
            string PassWord,
            int Permission,
            string FirstName,
            string LastName,
            string Email,
            string Phone
        )
        {
            int rowsAffected = 0;
            SqlConnection connection = new SqlConnection(DataConnectionSettings.ConnectionString);
            string query =
                "UPDATE [dbo].[Persons] SET [FirstName] = @FirstName, [LastName] = @LastName, [Email] = @Email, [Phone] = @Phone WHERE PersonID = @Person_ID  ;"
                + "UPDATE [dbo].[Users] SET [PersonID] = @Person_ID, [UserName] = @UserName, [PassWord] = @PassWord, [Permission] = @Permission WHERE UserID = @UserID";

            SqlCommand command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@FirstName", FirstName);
            command.Parameters.AddWithValue("@LastName", LastName);
            command.Parameters.AddWithValue("@Person_ID", PersonID);
            command.Parameters.AddWithValue("@Email", Email);
            command.Parameters.AddWithValue("@Phone", Phone);
            command.Parameters.AddWithValue("@UserName", Username);
            command.Parameters.AddWithValue("@PassWord", PassWord);
            command.Parameters.AddWithValue("@Permission", Permission);
            command.Parameters.AddWithValue("@UserID", UserID);

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

        public static bool ISUserEXist(int ID)
        {
            bool isfound = false;
            SqlConnection connection = new SqlConnection(DataConnectionSettings.ConnectionString);

            string query = "select A=0 from UserListVeiw where UserID=@UserID";

            SqlCommand command = new SqlCommand(query, connection);

            command.Parameters.AddWithValue("@UserID", ID);

            try
            {
                connection.Open();

                SqlDataReader reader = command.ExecuteReader();

                isfound = reader.HasRows;
            }
            catch
            {
                isfound = false;
            }
            finally
            {
                connection.Close();
            }

            return isfound;
        }

        public static bool DeleteUser(int ID)
        {
            int rowsAffected = 0;

            SqlConnection connection = new SqlConnection(DataConnectionSettings.ConnectionString);

            string quary =
                "DELETE FROM Users WHERE Users.UserID=@ID;"
                + " delete from Persons where PersonID not in (select Clients.PersonID from Clients) and PersonID not in (select Users.PersonID from Users);";

            SqlCommand command = new SqlCommand(quary, connection);
            command.Parameters.AddWithValue("@ID", ID);

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
    }
}
