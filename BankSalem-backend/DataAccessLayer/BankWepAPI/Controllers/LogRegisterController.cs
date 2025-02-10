

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
  public class LogRegisterController : ControllerBase
  {
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



    [HttpPost("RegistLog", Name = "RegistLog")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult RegistLog(int  userID , int LogTypeID)
    {
      var result = UserBussinees.RegistLog(userID, LogTypeID);
      return Ok(result);
    }




    [HttpGet("GetUserLogRegister", Name = "GetUserLogRegister")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<List<LogRegisterDTO>> GetUserLogRegister(int userID)
    {
        var ResutlLog= new List<LogRegisterDTO>();
        var LogRegisterTable = UserBussinees.GetUserLogRegister(userID);

        foreach (DataRow row in LogRegisterTable.Rows)
        {
          ResutlLog.Add(
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
         


      return Ok(ResutlLog);
    }


  }





}




