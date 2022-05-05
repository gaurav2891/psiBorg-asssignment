const authorFunc = async (name, DOB, age) => {
  try {
    const authorAwait = await fetch("http://localhost:8000/api/v1/author/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, DOB, age }),
    });
    const authorData = await authorAwait.json();

    console.log("authorData =>", authorData);

    if (authorData.status === "success") {
      alert("author successful");
      window.setTimeout(() => {
        location.assign("/");
      }, 1000);
    } else {
      alert("author failed");
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

const bookFunc = async (name, price, author, publishedOn) => {
  try {
    const bookAwait = await fetch("http://localhost:8000/api/v1/book/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, author, publishedOn }),
    });
    const bookData = await bookAwait.json();

    console.log("bookData =>", bookData);

    if (bookData.status === "success") {
      alert("book successful");
      window.setTimeout(() => {
        location.assign("/");
      }, 1000);
    } else {
      alert("book failed");
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

const author = document.querySelector(".create_author");

if (author) {
  author.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const DOB = document.getElementById("dob").value;
    const age = document.getElementById("age").value;

    console.log(name, DOB, age);

    authorFunc(name, DOB, age);
  });
}

const book = document.querySelector(".create_book");

if (book) {
  book.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const author = document.getElementById("author").value;
    const publishedOn = document.getElementById("publishedOn").value;

    console.log(name, price, author, publishedOn);

    bookFunc(name, price, author, publishedOn);
  });
}
