const loadPhone = async (searchText = "13", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  //   console.log(phones);
  displayPhone(phones, isShowAll);
};

const displayPhone = (phones, isShowAll) => {
  // console.log(phones);
  //  1. get the id
  const phoneContainer = document.getElementById("phone-container");
  // clear phone container cards before adding new cards
  // phoneContainer.innerHTML = " ";//use it or bellow
  phoneContainer.innerText = " ";

  // show button
  const showAllContainer = document.getElementById("show-all-container");
  // display show all button if there are more than 12 phones
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  // display only first 12 phones and if not show all

  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phoneParameter) => {
    // console.log(phoneParameter);
    // 2. create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card w-96 bg-base-100 shadow-xl`;
    // 3. set inner HTML
    phoneCard.innerHTML = `
    <figure>
            <img
              class = "mt-4 w-1/3"
              src="${phoneParameter.image}"
              alt="phones"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">Phone</h2>
            <p>Phone name: ${phoneParameter.phone_name}</p>
            <div class="card-actions justify-center">
              <button onclick = "handleShowDetails('${phoneParameter.slug}')" class="btn btn-primary">show Details</button>
            </div>
          </div>
    `;
    // 4. append the div
    phoneContainer.appendChild(phoneCard);
  });
  // hide loading spinner
  toggleLoadingSpinner(false);
};

// handle the click on the button
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);
  loadPhone(searchText, isShowAll);
};

// for spinner
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// for show details
const handleShowDetails = async (id) => {
  // console.log("click", id);
  // load single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  // console.log(data);
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  console.log(phone);
  const PhoneName = document.getElementById("show-detail-phone-name");
  PhoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
  <img src="${phone.image}" alt="" />
  <p><span class="text-2xl text-yellow-800">Manufacturer:</span><span>${phone?.mainFeatures?.memory}</span></p>
`;
  // show the modal
  show_details_modal.showModal();
};

// handle show all
const handleShowAll = () => {
  handleSearch(true);
};

loadPhone();
