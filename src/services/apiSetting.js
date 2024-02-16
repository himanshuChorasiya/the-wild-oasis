import supabase from "./supabase";

export async function getSettings(){
    
const { data: settings, error } = await supabase
.from('settings')
.select('*').single();

if(error){
    console.log(error);
    throw new Error("Seetings could not be loaded");
}
console.log(settings);
return settings;

}

export async function updateSettingApi(newSetting){
  const { data: updatedSettings, error } = await supabase
  .from('settings')
  .update(newSetting)
  .eq('id', 1)
  .select();

  if(error){
    console.log(error);
    throw new Error("Seetings could not be updated");
    }
    return updatedSettings;
}