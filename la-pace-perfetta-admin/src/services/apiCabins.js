import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("tbl_cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Error in fetching cabin data");
  }

  return data;
}

export async function createEditCabin(newCabin, edit_id) {
  //edit_id => cabin_id

  //https://psjsmxijppolcblwesan.supabase.co/storage/v1/object/public/cabin_images/cabin-001.jpg

  const hasImagePath = newCabin.cabin_img?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.cabin_img.name}`.replaceAll(
    "/",
    ""
  );
  const pathUrl = hasImagePath
    ? newCabin.cabin_img
    : `${supabaseUrl}/storage/v1/object/public/cabin_images/${imageName}`;

  //create cabin (success) ?  upload : storageError to handleError
  let query = supabase.from("tbl_cabins");

  //create new cabin
  if (!edit_id) query = query.insert([{ ...newCabin, cabin_img: pathUrl }]);

  //edit cabin
  if (edit_id)
    query = query
      .update({ ...newCabin, cabin_img: pathUrl })
      .eq("cabin_id", edit_id);

  //query awaits
  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Error in creating cabin data");
  }

  // image should never be uploaded if it exists already
  if (hasImagePath) return data;

  //upload image //Upload
  const { error: storageError } = await supabase.storage
    .from("cabin_images")
    .upload(imageName, newCabin.cabin_img);

  //error handling //Delete
  if (storageError) {
    await supabase.from("tbl_cabins").delete().eq("cabin_id", data.id);

    console.log(storageError);
    throw new Error("Error in uploading cabin image");
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
