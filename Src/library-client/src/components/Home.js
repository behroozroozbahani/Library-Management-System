import "../assets/css/App.css"
import "../assets/css/bootstrap.min.css"
import React from "react";
import { Link } from "react-router-dom";
import "./Author/Author";
import "./Book/Book";
import "./Genre/Genre";
import "./Publisher/Publisher";

const Home = () => {
  return (
    <div className="App container">
      <h1 className="d-flex justify-content-center m-3 bg-secondary text-white">
        سیستم مدیریت کتابخانه
      </h1>
      <div className="mt-5">
        <Link to="/book" className="btn btn-primary btn-sm me-2 text-dark">
          کتاب
        </Link>
        <Link to="/author" className="btn btn-warning btn-sm me-2 text-dark">
          نویسنده
        </Link>
        <Link to="/genre" className="btn btn-danger btn-sm me-2 text-dark">
          ژانر
        </Link>
        <Link to="/publisher" className="btn btn-success btn-sm me-2 text-dark">
          ناشر
        </Link>
      </div>
      <div>
        <h1 className="mt-5">خوش آمدید📚</h1>
      </div>
    </div>
  );
};

export default Home;
