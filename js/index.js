
    let editIndex = -1; // Index catatan yang sedang diedit (-1 artinya tidak ada yang diedit)
  let inputCatatan = document.getElementById("inputCatatan");
  let inputJudul = document.getElementById("inputJudul");
document.querySelector(".add-btn").addEventListener("click", (e)=>{
    inputJudul.value = '';
  inputCatatan.value = '';
});
    function addListBtn() {
  let listCatatan = document.querySelector(".listCatatan");
  let simpanBtn = document.getElementById("simpanBtn");
  
  
  let judul = inputJudul.value;
  let catatan = inputCatatan.value;

if (!judul && !catatan) {
      inputJudul.classList.add('shake');
      inputCatatan.classList.add('shake');
      inputJudul.classList.toggle("border-danger")
      inputCatatan.classList.toggle("border-danger")

    // Remove the shake class after animation ends
    setTimeout(() => {
      inputJudul.classList.remove('shake');
      inputCatatan.classList.remove('shake');
      inputJudul.classList.toggle("border-danger")
      inputCatatan.classList.toggle("border-danger")

    }, 500);
    
    return; // Hentikan proses tambah jika keduanya kosong
  } else if (!judul) {
    inputJudul.classList.add('shake');
    inputJudul.classList.toggle("border-danger");
    setTimeout(() => {
      inputJudul.classList.remove('shake');
      inputJudul.classList.toggle("border-danger")
    }, 500);
    return; // Hentikan proses tambah jika judul kosong
  } else if (!catatan) {
    inputCatatan.classList.add('shake');
    inputCatatan.classList.toggle("border-danger");
    setTimeout(() => {
      inputCatatan.classList.remove('shake');
      inputCatatan.classList.toggle("border-danger")
    }, 500);
    
    return; // Hentikan proses tambah jika catatan kosong
  }

 


  if (editIndex === -1) {
    let modalInstance = bootstrap.Modal.getInstance(document.getElementById('formCatatan'));
  if (modalInstance) {
    modalInstance.hide(); // Close the modal
  }
    // Tambahkan catatan baru ke dalam daftar
    document.getElementById("formCatatan").style.display = "none"
    listCatatan.innerHTML += `
      <li onclick="ambilJudul(this)"  class="align-items-center list-group-item d-flex justify-content-between mb-3 listAdd">
        <div class="kiri overflow-y-auto d-flex align-items-center">
          <button class="ceklis-btn" onclick="changeIcon(this)">
            <i id="ceklis-icon" class="ceklis fa-solid fa-o fa-2x"></i>
          </button>
          <span id="judulCatatan" class="overflow-y-auto vform-check-label">${judul}</span>
          <span class="isiCatatan">${catatan}</span>
        </div>
        <div class="kanan d-flex gap-2">
          <i data-bs-toggle="modal" data-bs-target="#formCatatan" class="edit text-warning-emphasis fa fa-pencil fa-xl" aria-hidden="true" onclick="editListBtn(this)"></i>
          <i data-bs-toggle="modal" data-bs-target="#modal-catatan"  class="delete fa-brands fa-readme text-warning fa-xl" aria-hidden="true"></i>
        </div>
      </li>
    `;
  } else {
    // Perbarui catatan yang sedang diedit
    let listItem = listCatatan.children[editIndex];
    listItem.querySelector('span').innerText = judul; // Update judul
    listItem.querySelector('.isiCatatan').innerText = catatan; // Update catatan
    editIndex = -1; // Reset index catatan yang diedit

    document.getElementById('simpanBtn').innerText = 'Simpan'; // Ubah teks tombol Simpan
  // Kosongkan input catatan setelah disimpan
  inputJudul.value = '';
  inputCatatan.value = '';
  }

  // Kosongkan input catatan setelah disimpan
  inputJudul.value = '';
  inputCatatan.value = '';
}


    function editListBtn(button) {
  let listItem = button.closest('.list-group-item');
  let judulCatatan = listItem.querySelector('#judulCatatan');
  let isiCatatan = listItem.querySelector('.isiCatatan');
  let inputJudul = document.getElementById("inputJudul");
  let inputCatatan = document.getElementById("inputCatatan");

  inputJudul.value = judulCatatan.innerText; // Isi input judul dengan teks judul yang akan diedit
  inputCatatan.value = isiCatatan.innerText; // Isi input catatan dengan teks catatan yang akan diedit

  editIndex = Array.from(listItem.parentElement.children).indexOf(listItem); // Tentukan index catatan yang diedit
  document.getElementById("modalCatatan").innerText = 'Edit Task';
  document.getElementById('simpanBtn').innerText = 'Update'; // Ubah teks tombol Simpan menjadi Update
}


    function deleteListBtn() {
      let listItem = document.querySelector('.list-group-item.listAdd');
      listItem.remove(); // Hapus catatan dari daftar
    }

    function changeIcon(button) {

    }
    function ambilJudul(button){
    let judulOutputCatatan = document.querySelector("#judulOutputCatatan");
    let isiCatatanOutput = document.querySelector("#isiCatatanOutput");
    let listItem = button.closest('.list-group-item');
    let judul = listItem.querySelector('span');
    let isiCatatan = listItem.querySelector('.isiCatatan');
    console.log(judul.innerText)
    console.log(isiCatatan.innerText)
    judulOutputCatatan.innerText = judul.innerText;
    isiCatatanOutput.innerText = isiCatatan.innerText;
    }

function changeIcon(button) {
  let listItem = button.closest(".listAdd");
  let icon = button.querySelector("#ceklis-icon");
  let judulCatatan = listItem.querySelector("#judulCatatan");
  if (icon.classList.contains("fa-circle-check")) {
    icon.classList.remove("fa-circle-check");
    icon.classList.add("fa-o");
    judulCatatan.style.textDecoration = "none";
    judulCatatan.style.fontStyle = "normal";
    icon.style.color = " #5b5b5b";
  } else {
    icon.classList.remove("fa-o");
    icon.classList.add("fa-circle-check");
    judulCatatan.style.textDecoration = "line-through";
    icon.style.color = "#1871C1";
    judulCatatan.style.fontStyle = "italic";
  }
}
function gantiTema() {
  let body = document.querySelector("body");
  let navbar = document.querySelector(".navbar");
  let logo = document.querySelector(".logo");
  let modalContent = document.querySelectorAll(".modal-content");
  let btnClose = document.querySelectorAll(".btn-close");
  let borderMode = document.querySelector(".delete")
  let icon = document.querySelector(".btn-mode"); // Menggunakan selector yang tepat untuk ikon

  // Tambahkan kelas untuk tema gelap pada elemen yang diinginkan
  body.classList.toggle("bG-body-dark");
  logo.classList.toggle("text-white");
  navbar.classList.toggle("bG-navbar-dark");

  // Loop melalui semua elemen modal dan tambahkan kelas tema gelap
  modalContent.forEach(content => {
    content.classList.toggle("bG-modal-dark");
  });
  btnClose.forEach(tandaX => {
    tandaX.classList.toggle("btn-close-white");
  });

  // Toggle ikon mode antara fa-moon dan fa-sun
  borderMode.classList.toggle("border-warning")
  icon.classList.toggle("fa-moon");
  icon.classList.toggle("text-warning");
  icon.classList.toggle("fa-sun");
}

 
  