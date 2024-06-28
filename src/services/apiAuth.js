import supabase from "./supabase";

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
  console.log(data);

  if(error){
    throw new Error(error.message);
  }
return data?.user;
}
