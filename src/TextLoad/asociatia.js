const lang = getLocalStorageLang()
const local_path = "../text/"+lang+"/asociatia.json"
$.getJSON(local_path,(json)=>{
    const subpages = Object.keys(json)
    loadSubpage(subpages[0],local_path,subpages)
})