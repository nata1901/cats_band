function createCard(pet, tag) {
    const card = document.createElement("div");
    card.className = "card";
    const cardImg = document.createElement("div");
    cardImg.className = "pic";
    if (pet.image) {
        cardImg.style.backgroundImage = `url(${pet.image})`;
    } else {
        cardImg.classList.add("tmp");
    }
    const cardTitle = document.createElement("h2");
    cardTitle.innerText = pet.name;

    const cardLike = document.createElement("i");
    cardLike.className = "like fa-heart";
    cardLike.classList.add(pet.favorite ? "fa-solid" : "fa-regular");
    cardLike.addEventListener("click", e => {
        setLike(cardLike, pet.id, !pet.favorite);
    })

    const cardTrash = document.createElement("i"); // создаём новый i для иконки удаления//
    cardTrash.className = "fa-sharp fa-solid fa-trash card__trash_bucket"; //Задаём класс для иконки удаления//
    cardTrash.addEventListener("click", e => {
      let answer = confirmDelete();
      if (answer) {
        deleteCard(pet.id, e.currentTarget.parentElement);
      }
    })
  
    const cardShowmore = document.createElement("i"); // создаём новый i для иконки подробнее //
    cardShowmore.className = "fa-solid fa-magnifying-glass card__showmore"; //Задаём класс для иконки лупы//
    // Пишем функцию для отображения данных о коте //
    cardShowmore.addEventListener("click", e => {
      showMore(pet.id, pet.name, pet.favorite, pet.rate, pet.age, pet.description, pet.image)
    })

    card.append(cardImg, cardTitle, cardLike, cardTrash, cardShowmore);
    tag.append(card);
    cardImg.style.height = cardImg.offsetWidth + "px";
}

function showMore(id, name, favorite, rate, age, description, image) {
    mdMoreinfo.classList.toggle("active");
    console.log("Данные о коте " + id + " " + name + " " + favorite + " " + rate + " " + age + " " + description);
    console.log(image);
  
    const id_name = document.querySelector("#info_id");
    id_name.innerText = id;
  
    const info_name = document.querySelector("#info_name");
    if (name) {
      info_name.innerText = name;
    }
    else {
      info_name.innerText = ("У кота пока нет имени :-(");
    }
  
  
    const info_favorite = document.querySelector("#info_favorite");
    if (favorite === true) {
      info_favorite.innerText = ("Любимчик");
    }
    else {
      info_favorite.innerText = ("Обычный кот");
    }
  
  
    const info_rate = document.querySelector("#info_rate");
    if (rate) {
      info_rate.innerText = (rate + " из 5");
    }
    else {
      info_rate.innerText = ("Оценки нет");
    }
  
    const info_age = document.querySelector("#info_age");
  
    if (age) {
      info_age.innerText = age;
    }
    else {
      info_age.innerText = ("Возраст не указан");
    }
  
    const info_description = document.querySelector("#info_description");
  
  
    if (description) {
      info_description.innerText = description;
    }
    else {
      info_description.innerText = ("Описание не указано");
    }
  
    const image_pic = document.querySelector("#picture_edit");
    if (image)
    {image_pic.classList.remove("preview");
    image_pic.classList.add("full-pic");
      image_pic.style.backgroundImage = `url(${image})`}
    else {
      image_pic.classList.remove("full-pic");
      image_pic.classList.add("preview");
      image_pic.style.backgroundImage = `url(images/default.png)`;
    }
    
    const image_pic2 = document.querySelector("#picture");
    if (image)
    {image_pic2.classList.remove("preview");
    image_pic2.classList.add("full-pic");
      image_pic2.style.backgroundImage = `url(${image})`}
    else {
      image_pic2.classList.remove("full-pic");
      image_pic2.classList.add("preview");
      image_pic2.style.backgroundImage = `url(images/default.png)`;
    }
    
    
  
   
  
    
    mdEditinfoBtn.addEventListener("click", e => {
      editInfo(id, name, favorite, rate, age, description, image);
    })
  }
  

  
  function editInfo(id, name, favorite, rate, age, description, image) {
    if (name) {
      document.querySelector("#info_edit_name").value = name;
    }
    else {
      document.querySelector("#info_edit_name").placeholder = ("Имя не указано");
    }
  
  
    if (favorite === true) {
      document.querySelector("#info_edit_favorite").checked = true;
    }
    else {
      document.querySelector("#info_edit_favorite").checked = false;
    }
    document.querySelector("#info_edit_rate").value = rate;
    document.querySelector("#info_edit_age").value = age;
  
    if (description) {
      document.querySelector("#info_edit_description").value = description;
    }
    else {
      document.querySelector("#info_edit_description").placeholder = ("Описание не указано");
    }
  
    editForm.addEventListener("submit", e => {
      e.stopPropagation(); //Всплытие пузырька / buuble effect// 
      e.preventDefault(); // остановить действие по умолчанию //
      //alert("Кот с id " + id + " успешно удалён!");//
      //e.stopPropagation(); //Всплытие пузырька / buuble effect// 
      //e.preventDefault(); // остановить действие по умолчанию //
      //console.log(editForm);
      //console.log(e.currentTarget);
      //console.log(editForm.children); // обращение ко всем дочерним тегам //
      const body = {};
      body.id = id;
      body.name = editForm.elements[0].value;
      body.image = editForm.elements[1].value;
      body.age = editForm.elements[2].value;
      body.rate = editForm.elements[3].value;
      body.description = editForm.elements[4].value;
      if (document.querySelector("#info_edit_favorite").checked) {
        body.favorite = true;
      }
      else {
        body.favorite = false;
      }
      //console.log(path + "/update/" + id);
      //console.log(JSON.stringify(body));
  
      fetch(path + "/update/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }).then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("band-cats");
          location.reload();
        }
      });
    })
  }

  
function setLike(el, id, like) {
    el.classList.toggle("fa-solid");
    el.classList.toggle("fa-regular");

    fetch(path + "/update/" + id, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({favorite: like})
    })
.then(res => res.json())
.then(data => {
    console.log(data);
    pets = pets.map(p => {
        if (p.id === id) {
            p.favorite = like;
        }
        return p;
    })
    localStorage.setItem("band-cats", JSON.stringify(pets));
})
}

function deleteCard(id, el) {
    if (id) {
      fetch(`${path}/delete/${id}`, {
        method: "DELETE"
      })
        .then(res => {
          if (res.status === 200) {
            el.remove();
            alert("Кот с id " + id + " успешно удалён!");
          }
        })
    }
  
  }
  
  
  function confirmDelete() {
    if (confirm("Вы действительно хотите удалить кота?")) {
      return true;
    } else {
      return false;
    }
  }