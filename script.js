<script>
const supabaseUrl = "https://cqutkhetpnylhconaodf.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxdXRraGV0cG55bGhjb25hb2RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NTE1MjEsImV4cCI6MjA4ODUyNzUyMX0.CegeRNrSg7vtVCBhn8vsINbebBmoqWzktu3jVB4hbCg"

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)

function generateQRID(){
  return "qr_" + Math.random().toString(36).substring(2,10)
}

function generateQRCode(link){
  document.getElementById("qrcode").innerHTML=""
  new QRCode(document.getElementById("qrcode"),{
    text: link,
    width:220,
    height:220
  })
}

async function saveLocation(name, link){
  // 🚨 Validate inputs first
  if(!name || !link){
    alert("Enter a location name and link first")
    return
  }

  let qrID = generateQRID()
  let lat = document.getElementById("lat").value
  let lng = document.getElementById("lng").value

  const { data, error } = await supabaseClient
    .from("locations")
    .insert([
      {
        name: name,
        qr_link: link,
        qr_id: qrID,
        latitude: lat,
        longitude: lng,
        scan_count: 0,
        points: 10
      }
    ])

  if(error){
    console.log("Supabase error:", error)
    return
  }

  console.log("Location saved:", data)

  let dynamicURL = "https://socialite1.github.io/zartour-qr-generator/scan.html?id=" + qrID
  generateQRCode(dynamicURL)
}

// 🚀 Register service worker for offline caching
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => {
      console.log("Service Worker Registered")
    })
}
</script>
