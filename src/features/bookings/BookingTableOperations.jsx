import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filteredField="booking_status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          {
            value: "booking_startDate-desc",
            label: "Sort by date (recent first)",
          },
          {
            value: "booking_startDate-asc",
            label: "Sort by date (earlier first)",
          },
          {
            value: "booking_totalPrice-desc",
            label: "Sort by amount (high first)",
          },
          {
            value: "booking_totalPrice-asc",
            label: "Sort by amount (low first)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
