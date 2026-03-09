
if ("serviceWorker" in navigator) {

navigator.serviceWorker.register("service-worker.js")
.then(() => {
console.log("Service Worker Registered")
})

}
const supabaseUrl = "https://cqutkhetpnylhconaodf.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxdXRraGV0cG55bGhjb25hb2RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NTE1MjEsImV4cCI6MjA4ODUyNzUyMX0.CegeRNrSg7vtVCBhn8vsINbebBmoqWzktu3jVB4hbCg"

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)
function generateQRID(){
return "qr_" + Math.random().toString(36).substring(2,10)
}

let lat = document.getElementById("lat").value
let lng = document.getElementById("lng").value

async function saveLocation(name, link){

let qrID = generateQRID()

const { data, error } = await supabaseClient
.from("locations")
.insert([
{
name: name,
qr_link: link,
qr_id: qrID,
scan_count: 0,
points: 10
}
])

if(error){
console.log(error)
return
}

let dynamicURL = "https://yourwebsite.com/scan.html?id=" + qrID

generateQRCode(dynamicURL)

}

async function saveLocation(name, link){

const { data, error } = await supabaseClient
.from("locations")
.insert([
{
name: name,
qr_link: link,
scan_count: 0,
points: 0
}
])

if(error){
console.log("Error saving location:", error)
}
else{
console.log("Location saved:", data)


}

}
