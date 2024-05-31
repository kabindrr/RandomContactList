const apiEP = "https://randomuser.me/api?results=5";

let userList = [];

// slide to go to the app screen

const slider = document.getElementById("mySlider");

slider.addEventListener("change", (e) => {
  const { value } = e.target;
  const label = document.getElementById("label");

  if (value > 70) {
    label.textContent = "";
    displayAppScreen();
  } else {
    label.textContent = "Slide to Unlock";
  }
});
const displayAppScreen = () => {
  //hide home screen
  document.querySelector(".homeScreen").remove();

  //show home screen
  document.querySelector(".appScreen").style.display = "block";
};
const displayContactScreen = () => {
  //hide app screen
  document.querySelector(".appScreen").remove();

  //show contact screen
  document.querySelector(".contactListScreen").style.display = "block";
  fetchUsers(apiEP);
};

const fetchUsers = async (url) => {
  //fetch the user from api

  //promise method
  //   fetch(url)
  //     .then((response) => {
  //       console.log(response);
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((e) => {
  //       console.log(error);
  //     });

  //async await

  const response = await fetch(url);
  const data = await response.json();
  userList = data.results;

  //hide the spinner
  document.querySelector(".showSpinner").style.display = "none";

  //show the user
  displayContactList(userList);
};

///displayy contact list

const displayContactList = (userList) => {
  document.getElementById("list").style.display = "block";

  let str = "";

  userList.map((item, i) => {
    str += ` 
     <div class="accordion-item">
    <h2 class="accordion-header">
      <button
        class="accordion-button"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapse${i}"
        aria-expanded="true"
        aria-controls="collapse${i}"
      >
        <img
          src="${item.picture.large}"
          alt=""
          width="50px"
          class="rounded-circle"
        />
        <div class="ms-2">
          <div class="fw-bolder">${item.name.title} ${item.name.first} ${item.name.last}</div>
          <small>${item.location.street.number} ${item.location.street.name}</small>
        </div>
      </button>
    </h2>
    <div
      id="collapse${i}"
      class="accordion-collapse collapse "
      data-bs-parent="#accordionExample"
    >
      <div
        class="accordion-body d-flex flex-column align-items-center"
      >
        <img
          src="${item.picture.large}"
          alt=""
          width="150px"
          class="rounded-circle"
        />
        <div>
          <div class="fw-bolder">
            <i class="fa-solid fa-id-badge"></i>
            ${item.name.title} ${item.name.first} ${item.name.last}
          </div>
          <div>
            <a href="tel:${item.cell}"
              ><i class="fa-solid fa-phone"></i>${item.cell}</a
            >
          </div>
          <div>
            <a href="mailto:${item.email}">
              <i class="fa-solid fa-envelope"></i> ${item.email}
            </a>
          </div>
          <div>
            <a
              href="https://www.google.com.au/maps/dir//${item.location.street.number} + ${item.location.street.name} + ${item.location.street.city} + ${item.location.street.state} + ${item.location.street.country}"
              ><i class="fa-solid fa-map-location"></i> ${item.location.street.number} ${item.location.street.name} ${item.location.state}</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>`;
  });

  document.getElementById("userAccordion").innerHTML = str;

  document.getElementById("userCount").innerText = userList.length;
};

//search contacts

document.getElementById("search").addEventListener("keyup", (e) => {
  const { value } = e.target;

  const filterUsers = userList.filter((item) => {
    const name = (item.name.first + " " + item.name.last).toLowerCase();
    return name.includes(value.toLowerCase());
  });

  displayContactList(filterUsers);
});
