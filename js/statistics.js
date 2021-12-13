async function getData() {
    const data = await fetch(
        "https://61b6c9b0c95dd70017d41020.mockapi.io/users",
        { method: "GET" }
    );
    const details = await data.json();
    document.querySelector(".user-list").innerHTML = ``;
    // console.log(details);
    details.forEach((datas) => createProfile(datas));
}

function createProfile({ name, cellphone, id }) {
    // console.log(avatar);
    const info = document.createElement("div");
    info.className = "container";
    info.innerHTML = `
      <div class="profile-container">
      <img class="profile" src="assets/img/userhead.png"  alt="none">
      </div>
      
      <div class="details">
      <h3>${name}</h3>
      <p>${cellphone}</p>
      <div>
      <button class="delete" onclick="deleteUser(${id})">Delete</button>
      <button class="edit" onclick="editUser(${id})">Edit</button>
      </div>
      </div>
      `;
    document.querySelector(".user-list").append(info);
}

getData();

async function deleteUser(id) {
    const data = await fetch(
        `https://61b6c9b0c95dd70017d41020.mockapi.io/users/${id}`,
        { method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            }
        }
    );
    const details = await data.json();
    getData();
    // console.log(details);
}
let send = document.querySelector(".send");

async function sendData() {
    send.style.display = "none";
    name = document.querySelector("#name").value;
    let cellphone = document.querySelector("#cellphone").value;
    console.log(name, cellphone);
    post = await fetch("https://61b6c9b0c95dd70017d41020.mockapi.io/users", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            // createdAt: Date,
            name: name,
            cellphone: cellphone,
        }),
    });
    let data = await post.json();
    await getData();
    document.querySelector("#name").value = "";
    document.querySelector("#cellphone").value = " ";
    data.forEach((update) => {
        createProfile(update);
    });
}

async function editUser(id) {
    send.style.display = "none";
    name = document.querySelector("#name").value;
    cellphone = document.querySelector("#cellphone").value;
    // date = new Date().toISOString();
    // console.log(name, avatar, date);
    post = await fetch(
        `https://61b6c9b0c95dd70017d41020.mockapi.io/users/${id}`,
        {
            method: "PUT",

            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                cellphone: cellphone,
            }),
        }
    );
    let data = post.json();
    getData();
    document.querySelector("#name").value = "";
    document.querySelector("#cellphone").value = " ";
    data = JSON.parse(data);
    data.forEach((update) => {
        createProfile(update);
    });
}