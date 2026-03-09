loadTotalScans()
loadLocations()
loadPlayers()

const supabaseUrl = "https://cqutkhetpnylhconaodf.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxdXRraGV0cG55bGhjb25hb2RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NTE1MjEsImV4cCI6MjA4ODUyNzUyMX0.CegeRNrSg7vtVCBhn8vsINbebBmoqWzktu3jVB4hbCg"

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)

async function loadTotalScans(){

const { data } = await supabaseClient
.from("locations")
.select("scan_count")

let total = 0

data.forEach(loc => {
total += loc.scan_count
})

document.getElementById("totalScans").innerText = total

}
async function loadLocations(){

const { data } = await supabaseClient
.from("locations")
.select("name, scan_count")

const list = document.getElementById("locations")

data.forEach(loc => {

let li = document.createElement("li")

li.innerText = loc.name + " — " + loc.scan_count + " scans"

list.appendChild(li)

})

  }

async function loadPlayers(){

const { data } = await supabaseClient
.from("users")
.select("name, points")
.order("points",{ascending:false})
.limit(10)

const list = document.getElementById("players")

data.forEach(player => {

let li = document.createElement("li")

li.innerText = player.name + " — " + player.points + " points"

list.appendChild(li)

})

  }
