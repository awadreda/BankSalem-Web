using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BankbusinessLayer.DTOs
{


    /*
    SELECT TOP (1000) [TransActionS_ID]
      ,[TransActoin_Type_ID]
      ,[TransActoin_Type_Name]
      ,[User_ID]
      ,[ClientID]
      ,[Reciver_ID]
      ,[TransAction_Date_TIme]
      ,[Amount]
      ,[Client_Amount_Before]
      ,[Client_Amount_After]
      ,[Reciver_Amount_Berfore]
      ,[Reciver_Amount_After]
  FROM [myBankDb].[dbo].[TransActionLIstView]

    */
    public class TransDTO
    {
            public int TransActionID { get; set; } // Corresponds to TransActionS_ID
        public int TransActionTypeID { get; set; } // Corresponds to TransActoin_Type_ID
        public string TransActionTypeName { get; set; } //
            public int UserID { get; set; } // Corresponds to User_ID
        public int ClientID { get; set; } // Corresponds to ClientID
        public int? ReciverID { get; set; } // Corresponds to Reciver_ID (nullable if receiver is optional)
        public DateTime TransActionDateTime { get; set; } // Corresponds to TransAction_Date_TIme
        public double Amount { get; set; } // Corresponds to Amount
        public double ClientAmountBefore { get; set; } // Corresponds to Client_Amount_Before
        public double ClientAmountAfter { get; set; } // Corresponds to Client_Amount_After
        public double ReciverAmountBefore { get; set; } // Corresponds to Reciver_Amount_Berfore
        public double ReciverAmountAfter { get; set; } // Corresponds to Reciver_Amount_After

        // Constructor to initialize the object
        public TransDTO(
            int transActionID,
            int transActionTypeID,
            string transActionTypeName,
            int userID,
            int clientID,
            int? reciverID,
            DateTime transActionDateTime,
           double amount,
           double clientAmountBefore,
           double clientAmountAfter,
           double reciverAmountBefore,
           double reciverAmountAfter
        )
        {
            TransActionID = transActionID;
            TransActionTypeID = transActionTypeID;
            TransActionTypeName = transActionTypeName;
            UserID = userID;
            ClientID = clientID;
            ReciverID = reciverID;
            TransActionDateTime = transActionDateTime;
            Amount = amount;
            ClientAmountBefore = clientAmountBefore;
            ClientAmountAfter = clientAmountAfter;
            ReciverAmountBefore = reciverAmountBefore;
            ReciverAmountAfter = reciverAmountAfter;
        }
    }
}
