import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("tbl_cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Error in fetching cabin data");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase
    .from("tbl_cabins")
    .delete()
    .eq("cabin_id", id);

  if (error) {
    console.log(error);
    throw new Error("Error in deleting cabin data");
  }

  return data;
}
