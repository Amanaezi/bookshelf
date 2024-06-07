import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import booksData from "./books.js";
import logo from "./logo.svg";
import BookItem from "./BookItem.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchPanel from "./SearchPanel.jsx";
import SortPanel from "./SortPanel.jsx";
import "./books.css";
import 'antd/dist/antd.js';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

class Sum extends React.Component {
  render() {
    let sum = 0;
    this.props.goods.forEach((book) => {
      console.log(book.price);
      sum += +(book.price * book.count);
    });
    return <div> Суммарная стоимость: {sum.toFixed(2)} </div>;
  }
}

class Count extends React.Component {
  render() {
    let count = 0;
    this.props.goods.forEach((book) => {
      count += book.count;
    });
    return <div> Количество книг в корзине: {count} </div>;
  }
}

const getBookData = () => {
  return localStorage.getItem("goods")
    ? JSON.parse(localStorage.getItem("goods"))
    : [];
};

const setBookData = (o) => {
  localStorage.setItem("goods", JSON.stringify(o));
};

const App = () => {
  const [books, setBooks] = useState(booksData);
  const [cart, setCart] = useState(getBookData);
  const [term, setTerm] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const removeBook = (book) => {
    const updateBooks = books.filter(function (item) {
      return item.id !== book.id;
    });
    setBooks(updateBooks);
  };

  const addBookToCart = (book) => {
    let goods = [...cart];
    if (goods.length && goods.includes(book)) {
      book.count++;
    } else {
      goods.push(book);
    }
    setBookData(goods);
    setCart(goods);
  };

  const deleteBookFromCart = (book) => {
    let goods;
    if (book.count === 1) {
      goods = cart.filter((item) => item.id !== book.id);
    } else {
      goods = cart.filter((item) =>
        item.id === book.id ? book.count-- : book.count
      );
    }
    setBookData(goods);
    setCart(goods);
  };

  const searchBook = (items, term) => {
    if (term.trim().length === 0) {
      return items;
    }
  
    const searchTerm = term.toLowerCase();
  
    return items.filter((item) => {
      return (
        item.name.toLowerCase().indexOf(searchTerm) > -1 ||
        item.author.toLowerCase().indexOf(searchTerm) > -1 ||
        item.price.toString().indexOf(searchTerm) > -1 // Convert price to string for search
      );
    });
  };


  const onUpdateSearch = (term) => {
    setTerm(term);
  };

  const sortBook = (items, isChecked) => {
    if (isChecked) {
      return items.sort((a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
      );
    } else {
      return items.sort((a, b) => a.id - b.id);
    }
  };

  const handleSearchChange = (query) => {
    onUpdateSearch(query); // Call onUpdateSearch here
  };

  const handleSortChange = (value) => {
    onUpdateSort(value); // Call onUpdateSort here
  };

  const onUpdateSort = (isChecked) => {
    setIsChecked(isChecked);
  };

  const visibleBooks = searchBook(sortBook(books, isChecked), term);

  useEffect(() => {
    // Load data from localStorage on component mount
    setCart(getBookData());
  }, []);

return (
  <div>
    <Header className="container-fluid p-5 bg-dark text-primary text-center" />

    <div className="container-fluid text-center">
      <div className="row">
        <div className="search-panel col-3 my-3">
          <SearchPanel searchQuery={term} onSearchChange={handleSearchChange} />
        </div>
      </div>
      <div className="row">
        <div className="col-3 my-3">
          <SortPanel sortBy={isChecked} onSortChange={handleSortChange} />
        </div>
      </div>

      <div className="row justify-content-center">
        {visibleBooks.map((book) => {
          return (
            <div className="col-sm-4 col-12" key={book.id}>
              <div className="card text-center my-5 p-3">
                <BookItem
                  book={book}
                  removeBook={removeBook}
                  addBookToCart={addBookToCart}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>

    <div className="container-fluid text-center">
      <h4>Кошик товарів</h4>
      <p>Кількість книг: {cart.length} </p>
      <ul className="list-group">
        {cart.map((book) => (
          <li key={book.id} className="list-group-item">
            <div className="row">
              <div className="col-3">{book.name}</div>
              <div className="col-3">{book.author}</div>
              <div className="col-2">{book.price}</div>
              <div className="col-1">{book.count}</div>
              <div className="col-3">
                <button
                  onClick={() => deleteBookFromCart(book)}
                  type="button"
                  className="btn btn-outline-primary mt-auto mb-2"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="row">
        <div className="col-12">
          <Count goods={cart} />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Sum goods={cart} />
        </div>
      </div>
    </div>
  </div>
);
};

function Header(props) {
  return (
    <div className={props.className}>
      <img src={logo} alt="logo" style={{ width: "150px" }} />
      <h1 className="display-2">Книгарня</h1>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

export default App;