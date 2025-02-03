import ClientsTable from "../components/ClientsComponets/ClientsTable";
import TransList from "../components/TransactionComponets/TransList";

export default function Dashboard() {
  return (
    <>
      <div style={{ paddingTop: "100px", display: "flex", gap: "40px" , flexDirection: "column" }}>





        <ClientsTable />
        <TransList />
      </div>
    </>
  );
}
