import supabase from "./supabase";
import { supabaseUrl } from "./supabase";
export async function signUpApi({fullName, email, password}){
    const {error, data} = await supabase.auth.signUp({
        email, password, options:{
            data:{
                fullName,
                avatar:""
            }
        }
    })

    if(error){
        console.log(error);
        throw new Error(error.message);
    }

    return data;
}
export async function loginApi({email, password}){
    
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    if(error){
        console.log(error);
        throw new Error(error.message);
    }
    console.log(data);
    return data;
}

export async function getCurrentUser(){
    const {data: session} = await supabase.auth.getSession();
    if(!session)return null;

    const {data, error} = await supabase.auth.getUser();
    
    console.log("USER DATA: ",data);

    if(error){
        console.log(error);
        throw new Error(error.message);
    }

    return data?.user;
}

export async function logoutApi(){
    const {error} = await supabase.auth.signOut();
    if(error)throw new Error(error.message);
}

export async function updateCurrentUser({password, fullName, avatar}){

    //1. update password or fullName
    let updateData;
    if(password){
        updateData = {password};
    }
    if(fullName){
        updateData={data:{fullName}};
    }
    const {data, error} = await supabase.auth.updateUser(updateData);
    if(error)throw new Error(error.message);
    if(!avatar)return data;
    //2. upload the upload image
    const fileName = `avatar-${data.user.id}-${Math.random()}`;
    const {error: storageError} = await supabase.storage.from('avatars').upload(fileName,avatar);
    if(storageError){
        throw new Error(storageError.message);
    }

    //3. update avatar in the user
    //url: https://kahcnctlsoejhhagkdvq.supabase.co/storage/v1/object/public/avatars/cabin-007.jpg?t=2024-02-11T05%3A05%3A30.291Z

    const {data: updatedUser, error2} = await supabase.auth.updateUser({
       // data:{avatar:`${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`}
       data:{avatar:`${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`}
    })
    if(error2){
        throw new Error(error2.message);
    }
    return updatedUser;
}

