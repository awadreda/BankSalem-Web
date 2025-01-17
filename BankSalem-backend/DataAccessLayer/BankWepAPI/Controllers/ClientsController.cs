using System.Data;
using System.Linq;
using BankbusinessLayer;
using BankbusinessLayer.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace BankWepAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientsController : ControllerBase
    {
        [HttpGet("{id}", Name = "GetClientByID")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<ClientDTO> GetClientByID(int id)
        {
            if (id < 1)
            {
                return BadRequest($"Not Vaild ID {id}");
            }

            var client = ClientsBusiness.FindClient(id);

            if (client == null)
            {
                return NotFound($"Student with ID {id} is not Found");
            }

            ClientDTO CDTO = client.CDTO;

            return Ok(CDTO);
        }

        [HttpGet("All", Name = "GetAllClients")]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<ClientDTO>> GetAllClients()
        {
            List<ClientDTO> ClientList = new List<ClientDTO>();

            var ClientTable = ClientsBusiness.GetClientList();

            foreach (DataRow row in ClientTable.Rows)
            {
                ClientList.Add(
                    new ClientDTO(
                        (int)row["ClientID"],
                        (string)row["FirstName"],
                        (string)row["LastName"],
                        (string)row["Email"],
                        (string)row["Phone"],
                        (string)row["AccountNumber"],
                        (string)row["PINCode"],
                        (float)row["AccountBalance"]
                    )
                );
            }

            if(ClientList.Count ==0){
                return NotFound("Not Found Students");
            }

            return Ok(ClientList);
        }
    }
}
