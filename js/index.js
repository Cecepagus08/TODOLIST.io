let editIndex = -1;
let inputCatatan = document.getElementById("inputCatatan");
let inputJudul = document.getElementById("inputJudul");
let listCatatan = document.querySelector(".listCatatan");

// Ambil catatan dari localStorage saat halaman dimuat
document.addEventListener("DOMContentLoaded", ambilDariLocalStorage);

document.querySelector(".add-btn").addEventListener("click", () => {
  inputJudul.value = '';
  inputCatatan.value = '';
});

// Fungsi untuk menyimpan daftar catatan ke localStorage
function simpanKeLocalStorage() {
  const catatanItems = Array.from(listCatatan.children).map(item => ({
    judul: item.querySelector('#judulCatatan').innerText,
    isi: item.querySelector('.isiCatatan').innerText
  }));
  localStorage.setItem('catatan', JSON.stringify(catatanItems));
}

// Fungsi untuk mengambil daftar catatan dari localStorage
function ambilDariLocalStorage() {
  const catatanItems = JSON.parse(localStorage.getItem('catatan')) || [];
  catatanItems.forEach(catatan => {
    tambahKeList(catatan.judul, catatan.isi);
  });
}

// Fungsi untuk menambah catatan ke dalam daftar di halaman
function tambahKeList(judul, isi) {
  listCatatan.innerHTML += `
    <li onclick="ambilJudul(this)" class="align-items-center list-group-item d-flex justify-content-between mb-3 listAdd">
      <div class="kiri overflow-y-auto d-flex align-items-center">
        <button class="ceklis-btn" onclick="changeIcon(this)">
          <i id="ceklis-icon" class="ceklis fa-solid fa-o fa-2x"></i>
        </button>
        <span id="judulCatatan" class="overflow-y-auto vform-check-label">${judul}</span>
        <span class="isiCatatan">${isi}</span>
      </div>
        <div class="kanan d-flex gap-2">
          <i data-bs-toggle="modal" data-bs-target="#formCatatan" class="edit text-warning-emphasis fa fa-pencil fa-xl" aria-hidden="true" onclick="editListBtn(this)"></i>
          <i data-bs-toggle="modal" data-bs-target="#modal-catatan"  class="delete fa-brands fa-readme text-warning fa-xl" aria-hidden="true"></i>
        </div>
    </li>
  `;
}

// Fungsi untuk menambah atau memperbarui catatan
function addListBtn() {
  let judul = inputJudul.value;
  let catatan = inputCatatan.value;

  if (!judul || !catatan) {
    // Penanganan input kosong seperti animasi shake
    inputJudul.classList.add('shake');
    inputCatatan.classList.add('shake');
    setTimeout(() => {
      inputJudul.classList.remove('shake');
      inputCatatan.classList.remove('shake');
    }, 500);
    return;
  }

  if (editIndex === -1) {
    // Menambahkan catatan baru
    tambahKeList(judul, catatan);
  } else {
    // Memperbarui catatan yang sedang diedit
    let listItem = listCatatan.children[editIndex];
    listItem.querySelector('#judulCatatan').innerText = judul;
    listItem.querySelector('.isiCatatan').innerText = catatan;
    editIndex = -1;
  }

  inputJudul.value = '';
  inputCatatan.value = '';

  // Simpan perubahan ke localStorage
  simpanKeLocalStorage();
}

// Fungsi untuk mengedit catatan
function editListBtn(button) {
  let listItem = button.closest('.list-group-item');
  inputJudul.value = listItem.querySelector('#judulCatatan').innerText;
  inputCatatan.value = listItem.querySelector('.isiCatatan').innerText;
  editIndex = Array.from(listItem.parentElement.children).indexOf(listItem);
}

// Fungsi untuk menghapus catatan
function deleteListBtn(button) {
  let listItem = document.querySelector('.list-group-item.listAdd');
      listItem.remove();
  // Simpan perubahan ke localStorage
  simpanKeLocalStorage();
}

// Fungsi untuk mengubah ikon centang
function changeIcon(button) {
  let listItem = button.closest(".listAdd");
  let icon = button.querySelector("#ceklis-icon");
  let judulCatatan = listItem.querySelector("#judulCatatan");
  if (icon.classList.contains("fa-circle-check")) {
    icon.classList.remove("fa-circle-check");
    icon.classList.add("fa-o");
    judulCatatan.style.textDecoration = "none";
    judulCatatan.style.fontStyle = "normal";
    icon.style.color = "#5b5b5b";
  } else {
    icon.classList.remove("fa-o");
    icon.classList.add("fa-circle-check");
    judulCatatan.style.textDecoration = "line-through";
    judulCatatan.style.fontStyle = "italic";
    icon.style.color = "#1871C1";
  }
}

// Fungsi untuk mengambil dan menampilkan judul dan isi catatan
function ambilJudul(button) {
  let listItem = button.closest('.list-group-item');
  document.querySelector("#judulOutputCatatan").innerText = listItem.querySelector('#judulCatatan').innerText;
  document.querySelector("#isiCatatanOutput").innerText = listItem.querySelector('.isiCatatan').innerText;
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