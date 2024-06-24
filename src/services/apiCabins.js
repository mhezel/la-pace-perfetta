import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("tbl_cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Error in fetching cabin data");
  }

  return data;
}

export async function createCabin(newCabin){

  //https://psjsmxijppolcblwesan.supabase.co/storage/v1/object/public/cabin_images/cabin-001.jpg

  const imageName = `${Math.random()}-${newCabin.cabin_img.name}`.replaceAll('/', "");
  const pathUrl = `${supabaseUrl}/storage/v1/object/public/cabin_images/${imageName}`;

  //create cabin (success) ?  upload : storageError to handleError
  const { data, error } = await supabase
  .from('tbl_cabins')
  .insert([{...newCabin, cabin_img: pathUrl}]);

  if (error) {
    console.log(error);
    throw new Error("Error in creating cabin data");
  }

  //upload image //Upload
  const { error: storageError } = await supabase
    .storage
    .from('cabin_images')
    .upload(imageName, newCabin.cabin_img);

  //error handling //Delete
  if(storageError){
    await supabase
    .from("tbl_cabins")
    .delete()
    .eq("cabin_id", data.id);

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
