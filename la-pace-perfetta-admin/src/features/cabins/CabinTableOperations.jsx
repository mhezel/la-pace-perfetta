import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
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

      <SortBy
        options={[
          { value: "cabin_name-asc", label: "Sort by name (A-Z)" },
          { value: "cabin_name-desc", label: "Sort by name (Z-A)" },
          { value: "cabin_price-asc", label: "Sort by price (low first)" },
          { value: "cabin_price-desc", label: "Sort by price (high first)" },
          {
            value: "cabin_max_capacity-asc",
            label: "Sort by capacity (low first)",
          },
          {
            value: "cabin_max_capacity-desc",
            label: "Sort by capacity (high first)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
