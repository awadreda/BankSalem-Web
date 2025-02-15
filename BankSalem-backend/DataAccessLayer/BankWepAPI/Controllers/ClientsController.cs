using System.Data;
using System.Linq;
using BankbusinessLayer;
using BankbusinessLayer.DTOs;
using BankWepAPI.Utilities;
using Microsoft.AspNetCore.Mvc;

// namespace BankWepAPI.Utilities;

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
                return NotFound($"Clinet with ID {id} is not Found");
            }

            ClientDTO CDTO = client.CDTO;

            return Ok(CDTO);
        }

        [HttpGet("EmailAndPINCODE", Name = "GetClientByEmailAndPINCODE")]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK)]
        [ProducesResponseType(statusCode: StatusCodes.Status404NotFound)]
        [ProducesResponseType(statusCode: StatusCodes.Status400BadRequest)]
        public ActionResult<ClientDTO> GetClientByEmailAndPINCODE(string Email, string PINCODE)
        {
            if (string.IsNullOrEmpty(Email) || string.IsNullOrEmpty(PINCODE))
            {
                return BadRequest("Email and PINCODE are required");
            }

            var client = ClientsBusiness.FindClientByEmailAndPINCODE(Email, PINCODE);

            if (client == null)
            {
                return NotFound("Email or PINCODE is not correct");
            }

            return Ok(client.CDTO);
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
                        Convert.ToDouble(row["AccountBalance"])
                    )
                );
            }

            if (ClientList.Count == 0)
            {
                return NotFound("Not Found Students");
            }

            return Ok(ClientList);
        }

        [HttpPost(Name = "AddNewClient")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<ClientDTO> AddNewClient([FromBody] ClientDTO newClientDto)
        {
            if (Checkobjs.IsClientDTOInvalid(newClientDto))
            {
                return BadRequest("Invalid client Data .");
            }

            ClientsBusiness client = new ClientsBusiness();

            client.FirstName = newClientDto.FirstName;
            client.LastName = newClientDto.LastName;
            client.Email = newClientDto.Email;
            client.Phone = newClientDto.Phone;
            client.PINCODE = newClientDto.PINCODE;
            client.AccountNumber = newClientDto.AccountNumber;

            client.AccountBalance = newClientDto.AccountBalance;

            client.Save();

            newClientDto.ID = client.ClientID;

            return CreatedAtRoute("GetClientByID", new { id = newClientDto.ID }, client.CDTO);
        }

        [HttpDelete("{clientID}", Name = "DeleteClient")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult DeleteClient(int clientID)
        {
            if (clientID < 1)
            {
                return BadRequest($"not accpted id {clientID}");
            }

            if (ClientsBusiness.isClientExistbyID(clientID))
            {
                ClientsBusiness.DeleteClientByID(clientID);

                return Ok($"Client with id {clientID} has been deleted");
            }

            return NotFound($"Client with id {clientID} not found   ");
        }

        [HttpPut("{clientID}", Name = "UpadateClient")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<ClientDTO> UpdataClient(int clientID, ClientDTO UpdatedClient)
        {
            if (Checkobjs.IsClientDTOInvalid(UpdatedClient))
            {
                return BadRequest("Invalid Client Data");
            }

            var Client = ClientsBusiness.FindClient(clientID);

            if (Client == null)
            {
                return NotFound($"Client with id {clientID} Not Found");
            }

            Client.FirstName = UpdatedClient.FirstName;
            Client.LastName = UpdatedClient.LastName;
            Client.Phone = UpdatedClient.Phone;
            Client.Email = UpdatedClient.Email;
            ;
            Client.PINCODE = UpdatedClient.PINCODE;

            Client.AccountNumber = UpdatedClient.AccountNumber;
            Client.AccountBalance = UpdatedClient.AccountBalance;

            if (Client.Save())
            {
                return Ok(UpdatedClient);
            }

            return StatusCode(500, new { message = "Error Updting CLient" });
        }
    }
}
