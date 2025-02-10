using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using BankbusinessLayer;
using BankbusinessLayer.DTOs;
using BankWepAPI.TransTypes;
using Microsoft.AspNetCore.Mvc;

namespace BankWepAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrasnActonsController : ControllerBase
    {
        [HttpGet("All", Name = "GetAllTransActions")]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<TransDTO>> GetAllTransActions()
        {
            List<TransDTO> TransList = new List<TransDTO>();

            var TransTable = ClientsBusiness.TransActionList();

            foreach (DataRow row in TransTable.Rows)
            {
                TransList.Add(
                    new TransDTO(
                        row["TransActionS_ID"] != DBNull.Value ? (int)row["TransActionS_ID"] : 0, // Default value 0 if null
                        row["TransActoin_Type_ID"] != DBNull.Value
                            ? (int)row["TransActoin_Type_ID"]
                            : 0, // Default value 0 if null
                        row["TransActoin_Type_Name"] != DBNull.Value
                            ? (string)row["TransActoin_Type_Name"]
                            : string.Empty, // Default empty string if null
                        row["User_ID"] != DBNull.Value ? (int)row["User_ID"] : 0, // Default value 0 if null
                        row["ClientID"] != DBNull.Value ? (int)row["ClientID"] : 0, // Default value 0 if null
                        row["Reciver_ID"] != DBNull.Value ? (int)row["Reciver_ID"] : 0, // Default value 0 if null
                        row["TransAction_Date_TIme"] != DBNull.Value
                            ? (DateTime)row["TransAction_Date_TIme"]
                            : DateTime.MinValue, // Default to DateTime.MinValue if null
                        row["Amount"] != DBNull.Value ? (double)row["Amount"] : 0, // Default value 0 if null
                        row["Client_Amount_Before"] != DBNull.Value
                            ? (double)row["Client_Amount_Before"]
                            : 0, // Default value 0 if null
                        row["Client_Amount_After"] != DBNull.Value
                            ? (double)row["Client_Amount_After"]
                            : 0, // Default value 0 if null
                        row["Reciver_Amount_Berfore"] != DBNull.Value
                            ? (double)row["Reciver_Amount_Berfore"]
                            : 0, // Default value 0 if null
                        row["Reciver_Amount_After"] != DBNull.Value
                            ? (double)row["Reciver_Amount_After"]
                            : 0 // Default value 0 if null
                    )
                );
            }
            if (TransList.Count == 0)
            {
                return NotFound("No Transactions Found");
            }

            return Ok(TransList);
        }

        [HttpPost("Deposite")]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK)]
        [ProducesResponseType(statusCode: StatusCodes.Status400BadRequest)]
        [ProducesResponseType(statusCode: StatusCodes.Status404NotFound)]
        public IActionResult Deposte([FromBody] DepositRequest request)
        {
            if (request == null || request.ClientId <= 0 || request.Amount == 0)
            {
                return BadRequest("Invalid Request");
            }

            var client = ClientsBusiness.FindClient(request.ClientId);
            bool success = client?.Deposite(request.Amount, request.UserId) ?? false;


            if (success)
            {
                return Ok(
                    new
                    {
                        success = true,
                        message = "Deposite Done",
                        newBalance = client?.AccountBalance ?? 0,
                    }
                );
            }


            return BadRequest(new { success = false, message = "Deposite Failed" });
        }

        [HttpPost("withDraw")]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK)]
        [ProducesResponseType(statusCode: StatusCodes.Status400BadRequest)]
        [ProducesResponseType(statusCode: StatusCodes.Status404NotFound)]
        public IActionResult WithDraw(WithdrawRequest request)
        {
            if (request == null || request.ClientId <= 0 || request.Amount == 0)
            {
                return BadRequest("Invalid Request");
            }

            var client = ClientsBusiness.FindClient(request.ClientId);
            bool success = client?.WithDraw(request.Amount, request.UserId) ?? false;


            if (success)
            {
                return Ok(
                    new
                    {
                        success = true,
                        message = "WithDraw Done",
                        newBalance = client?.AccountBalance ?? 0,
                    }
                );
            }


            return BadRequest(new { success = false, message = "WithDraw Failed" });
        }

        [HttpPost("Transfer")]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK)]
        [ProducesResponseType(statusCode: StatusCodes.Status400BadRequest)]
        public IActionResult Transfer(TransferRequest request)
        {
            if (
                request == null
                || request.FromClientId <= 0
                || request.ToClientId <= 0
                || request.Amount == 0
            )
            {
                return BadRequest("Invalid Request");
            }

            var client = ClientsBusiness.FindClient(request.FromClientId);
            var reciver = ClientsBusiness.FindClient(request.ToClientId);


            bool success = client?.Transfer(request.Amount, reciver, request.UserId) ?? false;


            if (success)
            {
                return Ok(
                    new
                    {
                        success = true,
                        message = "Transfer Done",
                        newBalance = client.AccountBalance,
                    }
                );
            }

            return BadRequest(new { success = false, message = "Transfer Failed" });
        }


        [HttpGet("ClientTransAction")]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK)]
        [ProducesResponseType(statusCode: StatusCodes.Status400BadRequest)]
        [ProducesResponseType(statusCode: StatusCodes.Status404NotFound)]
        public ActionResult<List<TransDTO>> ClientTransAction(int clientID)
        {
            var TransActionList = new List<TransDTO>();

            var TransTable = ClientsBusiness.GetClientTransAction(clientID);
           
            if (TransTable.Rows.Count == 0)
            {
                return NotFound("No Transactions Found");
            }

            foreach (DataRow row in TransTable.Rows)
            {
               TransActionList.Add(
                    new TransDTO(
                        row["TransActionS_ID"] != DBNull.Value ? (int)row["TransActionS_ID"] : 0, // Default value 0 if null
                        row["TransActoin_Type_ID"] != DBNull.Value
                            ? (int)row["TransActoin_Type_ID"]
                            : 0, // Default value 0 if null
                        row["TransActoin_Type_Name"] != DBNull.Value
                            ? (string)row["TransActoin_Type_Name"]
                            : string.Empty, // Default empty string if null
                        row["User_ID"] != DBNull.Value ? (int)row["User_ID"] : 0, // Default value 0 if null
                        row["ClientID"] != DBNull.Value ? (int)row["ClientID"] : 0, // Default value 0 if null
                        row["Reciver_ID"] != DBNull.Value ? (int)row["Reciver_ID"] : 0, // Default value 0 if null
                        row["TransAction_Date_TIme"] != DBNull.Value
                            ? (DateTime)row["TransAction_Date_TIme"]
                            : DateTime.MinValue, // Default to DateTime.MinValue if null
                        row["Amount"] != DBNull.Value ? (double)row["Amount"] : 0, // Default value 0 if null
                        row["Client_Amount_Before"] != DBNull.Value
                            ? (double)row["Client_Amount_Before"]
                            : 0, // Default value 0 if null
                        row["Client_Amount_After"] != DBNull.Value
                            ? (double)row["Client_Amount_After"]
                            : 0, // Default value 0 if null
                        row["Reciver_Amount_Berfore"] != DBNull.Value
                            ? (double)row["Reciver_Amount_Berfore"]
                            : 0, // Default value 0 if null
                        row["Reciver_Amount_After"] != DBNull.Value
                            ? (double)row["Reciver_Amount_After"]
                            : 0 // Default value 0 if null
                    )
                );
            }


            return Ok(TransActionList);
        }


    }
}
