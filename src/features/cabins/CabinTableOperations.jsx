import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filteredField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "with-discount", label: "With Discount" },
          { value: "without-discount", label: "Without Discount" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
