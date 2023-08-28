const loadPhone = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
  );
  const data = await res.json();
  const phones = data.data;
  //   console.log(phones);
  displayPhone(phones);
};

const displayPhone = (phones) => {
  console.log(phones);
  //  1. get the id
  const phoneContainer = document.getElementById("phone-container");
  phones.forEach((phoneParameter) => {
    console.log(phoneParameter);
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
              <button class="btn btn-primary">Buy Now</button>
            </div>
          </div>
    `;
    // 4. append the div
    phoneContainer.appendChild(phoneCard);
  });
};

loadPhone();
