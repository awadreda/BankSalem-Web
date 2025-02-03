using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using BankbusinessLayer;

using BankbusinessLayer.DTOs;
using BankWepAPI.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace BankWepAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserControllers : ControllerBase
    {
        [HttpGet("{id}", Name = "GetUSerBYID")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<UserDTO> GetUserByID(int id)
        {
            if (id < 1)
            {
                return BadRequest($"Not Vaild ID {id}");
            }

            var user = UserBussinees.FindUserByID(id);

            if (user == null)
            {
                return NotFound($"User with ID {id} is not Found");
            }

            UserDTO UDTO = user.UDTO;

            return Ok(UDTO);
        }

        [HttpGet("All", Name = "GetALlUsers")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<UserDTO>> GetAllUsers()
        {
            List<UserDTO> UsersList = new List<UserDTO>();

            var UserTable = UserBussinees.GetAllUsers();

            foreach (DataRow row in UserTable.Rows)
            {
                UsersList.Add(
                    new UserDTO(
                        user_ID: Convert.ToInt32(row["UserID"]),
                        userName: row["UserName"]?.ToString() ?? string.Empty,
                        password: row["PassWord"]?.ToString() ?? string.Empty,
                        permission: Convert.ToInt32(row["Permission"]),
                        firstName: row["FirstName"]?.ToString() ?? string.Empty,
                        lastName: row["LastName"]?.ToString() ?? string.Empty,
                        email: row["Email"]?.ToString() ?? string.Empty,
                        phone: row["Phone"]?.ToString() ?? string.Empty
                    )
                );
            }

            if (UsersList.Count == 0)
            {
                return NotFound("Not found ");
            }

            return Ok(UsersList);
        }

        [HttpPost(Name = "AddNewUser")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<UserDTO> AddNewUser([FromBody] UserDTO newUserDto)
        {
            if (Checkobjs.IsUserDTOInvalid(newUserDto))
            {
                return BadRequest("Invalid user data.");
            }

            UserBussinees user = new UserBussinees();

            user.UserName = newUserDto.UserName;
            user.Password = newUserDto.Password;
            user.Permission = newUserDto.Permission;
            user.FirstName = newUserDto.FirstName;
            user.LastName = newUserDto.LastName;
            user.Email = newUserDto.Email;
            user.Phone = newUserDto.Phone;

            user.Save();

            newUserDto = user.UDTO;

            return CreatedAtRoute("GetUserByID", new { id = newUserDto.User_ID }, user.UDTO);
        }

        [HttpDelete("{userID}", Name = "DeleteUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult DeleltUser(int userID)
        {
            if (userID < 1)
            {
                return BadRequest($"not accpted id {userID}");
            }

            if (UserBussinees.IsUserExist(userID))
            {
                UserBussinees.DeleteUserbyID(userID);

                return Ok($"User with id {userID} has been deleted");
            }

            return NotFound($"User with id {userID} not found   ");
        }

        [HttpPut("{userID}", Name = "UpadateUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<UserDTO> UpdataUser(int userID, UserDTO UpdatedUser)
        {
            if (Checkobjs.IsUserDTOInvalid(UpdatedUser))
            {
                return BadRequest("Invalid User Data");
            }

            if (UserBussinees.IsUserExist(userID))
            {
                UserBussinees user = UserBussinees.FindUserByID(userID);

                user.UserName = UpdatedUser.UserName;
                user.Password = UpdatedUser.Password;
                user.Permission = UpdatedUser.Permission;
                user.FirstName = UpdatedUser.FirstName;
                user.LastName = UpdatedUser.LastName;
                user.Email = UpdatedUser.Email;
                user.Phone = UpdatedUser.Phone;

                user.Save();

                UpdatedUser = user.UDTO;

                return Ok(UpdatedUser);
            }

            return NotFound($"User with id {userID} not found");
        }

        [HttpGet("LogRegisterList", Name = "getlogRegisterList")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult getlogRegisterList()
        {
            List<LogRegisterDTO> LogRegisterList = new List<LogRegisterDTO>();

            var LogRegisterTable = UserBussinees.getLogList();

            foreach (DataRow row in LogRegisterTable.Rows)
            {
                LogRegisterList.Add(
                    new LogRegisterDTO
                    {
                        LogID = Convert.ToInt32(row["LogID"]),
                        UserID = Convert.ToInt32(row["UserID"]),
                        UserName = row["UserName"]?.ToString() ?? string.Empty,
                        LogTypeID = Convert.ToInt32(row["LogTypeID"]),
                        LogeTypeName = row["LogeTypeName"]?.ToString() ?? string.Empty,
                        LogTime = row["LogTime"] == DBNull.Value ? null : (DateTime?)row["LogTime"],
                    }
                );
            }

            if (LogRegisterList.Count == 0)
            {
                return NotFound("Not found ");
            }

            return Ok(LogRegisterList);
        }
    }
}
