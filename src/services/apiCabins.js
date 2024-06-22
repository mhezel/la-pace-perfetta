import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("tbl_cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Error loading cabins data");
  }

  return data;
}
