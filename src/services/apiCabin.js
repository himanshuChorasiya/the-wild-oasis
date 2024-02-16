import supabase, { supabaseUrl } from "./supabase";

export async function getCabins(){
        
    const { data, error } = await supabase.from('cabins')
    .select('*');

    if(error){
        console.log(error);
        throw new Error("cabin could not be loaded");
    }
  return data;
}

export async function createCabin(newCabin){
   
    //https://kahcnctlsoejhhagkdvq.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
    //1. create cabin
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/","");
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    const { data, error } = await supabase
    .from('cabins')
    .insert([{...newCabin, image: imagePath}])
    .select().single();
    if(error){
        console.log(error);
        throw new Error("Cabin could not be created");
    }
    
     if(hasImagePath)return data;
   //2. upload image
    const { error: stotageError} = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newCabin.image);

    // //3. Delete the cabin if there was an error in wuloading image.   
    if(stotageError){
        console.log("create-id ",data.id)
        await supabase.from("cabins").delete().eq("id", data.id);
        console.log("Storage error", stotageError);
        throw new Error("cabin image could not be uploaded and cabin is was not created");
    } 
    console.log("Create Data", data)
    return data;
}

export async function createEditCabin(newCabin, id){
    console.log("new data for edit", newCabin, id, newCabin.image);
    //https://kahcnctlsoejhhagkdvq.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

    //check if image is updated or not
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    //1. create cabin
    console.log("hasImagePath", hasImagePath);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/","");
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    console.log("imagePath", imagePath);
    
    let query = supabase.from('cabins');
    if(!id){
      query = query.insert([{...newCabin, image: imagePath}])
      .select().single();
    }
    if(id){
        query = query.update({...newCabin, image: imagePath})
        .eq('id', id);
    }
    const { data, error } = await query.select('*');
    
  
    if(error){
        console.log(error.message);
        throw new Error("Cabin could not be Created");
    }
    
    if(hasImagePath)return data;
   //2. upload image
    const { error: stotageError} = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newCabin.image);

    // //3. Delete the cabin if there was an error in wuloading image.   
    if(stotageError){
        //console.log("id",data.id)
        await supabase.from("cabins").delete().eq("id", data.id);
        console.log(stotageError);
        throw new Error("cabin image could not be uploaded and cabin is was not updated");
    } 
    console.log("Edit Data", data);
    return data;
}

export async function editCabin(newCabin, id){
    console.log("new data for edit", newCabin, id, newCabin.image);
    //https://kahcnctlsoejhhagkdvq.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

    //check if image is updated or not
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    //1. create cabin
    console.log("hasImagePath", hasImagePath);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/","");
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    console.log("imagePath", imagePath);
   
    const { data, error } = await supabase
    .from('cabins')
    .update({...newCabin, image: imagePath})
    .eq('id', id)
    .select('*');
    console.log("after edit call")
    if(error){
        console.log(error.message);
        throw new Error("Cabin could not be updated");
    }
    
    if(hasImagePath)return data;
   //2. upload image
    const { error: stotageError} = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newCabin.image);

    // //3. Delete the cabin if there was an error in wuloading image.   
    if(stotageError){
        //console.log("id",data.id)
        await supabase.from("cabins").delete().eq("id", data.id);
        console.log(stotageError);
        throw new Error("cabin image could not be uploaded and cabin is was not updated");
    } 
    console.log("Edit Data", data)
    return data;
}

export async function deleteCabin(id){
    
    const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq("id", id);

    if(error){
        console.log(error);
        throw new Error("Cabin could not be deleted");
    }
    return data;

}