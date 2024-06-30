import supabase, { supabaseUrl } from "./supabase";

export async function login({email, password}){
const  { data, error } = await supabase.auth.signInWithPassword({
email: email,
password: password,
});
  if(error){
    throw new Error(error.message);
  }
return data;
}

export async function signup({ fullName, email, password}){
const {data, error} = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        fullName,
        avatar: "",
      }
    }
  });

  if(error){
    throw new Error(error.message);
  }

  return data;
}

export async function logout(){
  const {error} = await supabase.auth.signOut();
  if(error){
    throw new Error(error.message);
  }
}

export async function getCurrentLoggedUser(){
  const {data: session} = await supabase.auth.getSession();
  if(!session.session) return null;

  const {data, error} = await supabase.auth.getUser();
  // console.log(data);

  if(error){
    throw new Error(error.message);
  }

  return data?.user;
}

export async function updateCurrentUser({password, fullName, avatar}){
  //1. update password || fullname  
  let updateData;

  if(password) updateData = { password }; // validation of data
  if(fullName) updateData = {data: { fullName }};

  const {data, error} = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if(!avatar) return data;

  //2. upload avatar-image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const {error: errorUpload} = await supabase.storage.from("users_avatar").upload(fileName, avatar);
  
  if (errorUpload) throw new Error(errorUpload.message);

  //3. update avatar-url
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/users_avatar/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);

  return updatedUser;
}
