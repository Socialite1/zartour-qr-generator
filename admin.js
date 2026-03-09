const supabase = window.supabase.createClient(
"YOUR_SUPABASE_URL",
"YOUR_SUPABASE_PUBLIC_KEY"
)

loadStats()
loadPlayers()
loadLocations()
loadCheaters()
loadAchievements()

// Analytics
async function loadStats() {

const { data } = await supabase
.from("scans")
.select("*")

document.getElementById("totalScans").innerText = data.length

const dates = {}
data.forEach(scan => {

const d = scan.created_at.split("T")[0]

dates[d] = (dates[d] || 0) + 1

})

const ctx = document.getElementById("scanChart")

new Chart(ctx, {
type: "line",
data: {
labels: Object.keys(dates),
datasets: [{
label: "QR Scans",
data: Object.values(dates)
}]
}
})

}

// Players
async function loadPlayers() {

const { data } = await supabase
.from("players")
.select("*")
.order("score", { ascending: false })
.limit(10)

const list = document.getElementById("players")

data.forEach(player => {

const li = document.createElement("li")
li.innerText = player.name + " — " + player.score

list.appendChild(li)

})

}

// Locations
async function loadLocations() {

const { data } = await supabase
.from("locations")
.select("*")

const list = document.getElementById("locations")

data.forEach(loc => {

const li = document.createElement("li")
li.innerText = loc.name

list.appendChild(li)

})

}

// Anti Cheat
async function loadCheaters() {

const { data } = await supabase
.from("scans")
.select("*")

const suspicious = data.filter(s => s.speed_flag == true)

const list = document.getElementById("cheaters")

suspicious.forEach(c => {

const li = document.createElement("li")

li.innerText = "Player " + c.player_id + " suspicious scan"

list.appendChild(li)

})

}

// Achievements
async function loadAchievements() {

const { data } = await supabase
.from("achievements")
.select("*")

const list = document.getElementById("achievements")

data.forEach(a => {

const li = document.createElement("li")

li.innerText = a.name + " — " + a.points + " pts"

list.appendChild(li)

})

}

// QR Generator
function generateQR() {

const text = document.getElementById("qrText").value

QRCode.toCanvas(document.getElementById("qrcode"), text)

}

// Download QR
function downloadQR() {

const canvas = document.getElementById("qrcode")

const link = document.createElement("a")

link.download = "zartour-qr.png"

link.href = canvas.toDataURL()

link.click()

            }
