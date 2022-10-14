const $template = document.getElementById("template-note").content;
const $fragment = document.createDocumentFragment();
const $sectionNotes = document.querySelector(".section-notes");

const xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", (e) => {

  // operation is complete
  if(xhr.readyState !== 4) return;
  if(xhr.status >= 200 && xhr.status < 300){
    let data = JSON.parse(xhr.response);
    data.forEach(e => {
      $template.querySelector("#name").textContent = e.name;
      $template.querySelector("#user").textContent = e.username;
      $template.querySelector("#email").textContent = e.email;
      $template.querySelector("#phone").textContent = e.phone;
      $template.querySelector("#website").textContent = e.website;
      $template.querySelector("#street").textContent = e.address.street;
      $template.querySelector("#suite").textContent = e.address.suite;
      $template.querySelector("#city").textContent = e.address.city;
      $template.querySelector("#zipcode").textContent = e.address.zipcode;

      let $clone = document.importNode($template, true);
      $fragment.appendChild($clone);
    });

    $sectionNotes.appendChild($fragment);
  }else{
    let message = xhr.statusText || "Ocurrion un error a la solicitud...";
    const $h3 = document.createElement("h3");
    $h3.textContent = `${message} ${xhr.status}`;
    $sectionNotes.appendChild($h3);
  }

})

xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
xhr.send();