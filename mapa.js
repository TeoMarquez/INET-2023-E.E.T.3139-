// Crear el mapa
let map = L.map('map').setView([-34.98490511769442, -63.691350039494324], 4);

// Agregar una capa de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Función para agregar un marcador en una ubicación específica
function addMarker(latitude, longitude, title, address, contact) {
  let marker = L.marker([latitude, longitude]).addTo(map);
  marker.bindPopup(`<h2>${title}</h2><p>Dirección: ${address}</p><p>Contacto: ${contact}</p>`);
}

// Evento para cambiar la ubicación y agregar un marcador
document.getElementById('select-location').addEventListener('change', function (e) {
  let locationData = e.target.value.split(",");
  let latitude = parseFloat(locationData[0]);
  let longitude = parseFloat(locationData[1]);
  let title = "Nombre del lugar"; // Puedes personalizar el nombre del lugar
  let address = "Dirección personalizada"; // Puedes personalizar la dirección
  let contact = "Contacto personalizado"; // Puedes personalizar el contacto

  // Limpiar los marcadores existentes antes de agregar uno nuevo
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  // Centrar el mapa en la nueva ubicación
  map.flyTo([latitude, longitude], 13);

  // Agregar un nuevo marcador en la ubicación
  addMarker(latitude, longitude, title, address, contact);
});

// Función para cargar dinámicamente los departamentos
function cargarDepartamentos(provinciaId) {
  // Ruta al archivo PHP que manejará la solicitud
  const url = 'http://localhost/Inet/Consultas.php?provinciaId=' + provinciaId;
  console.log('URL generada:', url); // Agregar esta línea para imprimir la URL

  // Obtener el desplegable de departamentos
  const selectDepartamento = document.getElementById('select-departamento');
  
  // Realizar la solicitud AJAX
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Limpiar opciones existentes
      selectDepartamento.innerHTML = '';

      // Agregar las opciones de departamentos desde la respuesta
      data.departamentos.forEach((departamento) => {
        const option = document.createElement('option');
        option.value = departamento.id;
        option.text = departamento.nombre;
        selectDepartamento.appendChild(option);
      });
    })
    .catch((error) => {
      console.error('Error al cargar los departamentos:', error);
    });
}

// Configurar un evento de cambio para el desplegable de provincias
document.getElementById('select-provincia').addEventListener('change', function (event) {
  const provinciaId = event.target.value;
  cargarDepartamentos(provinciaId);
});
