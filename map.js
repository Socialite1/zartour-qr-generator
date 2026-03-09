const supabaseUrl = "YOUR_SUPABASE_URL"
const supabaseKey = "YOUR_PUBLIC_ANON_KEY"

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
