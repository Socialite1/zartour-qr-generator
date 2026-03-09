const supabaseUrl = "https://cqutkhetpnylhconaodf.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxdXRraGV0cG55bGhjb25hb2RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NTE1MjEsImV4cCI6MjA4ODUyNzUyMX0.CegeRNrSg7vtVCBhn8vsINbebBmoqWzktu3jVB4hbCg"

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)

var map = L.map('map').setView([0,0], 2)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19
}).addTo(map)

async function loadLocations(){

const { data } = await supabaseClient
.from("locations")
.select("name, latitude, longitude")

data.forEach(loc => {

if(loc.latitude && loc.longitude){

L.marker([loc.latitude, loc.longitude])
.addTo(map)
.bindPopup(loc.name)

}

})

}

loadLocations()
