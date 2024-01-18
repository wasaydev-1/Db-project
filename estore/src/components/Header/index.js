import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TopMenu from "../TopMenu";
import "./_header.scss";
const Header = () => {
  const { cart } = useSelector((obj) => obj);
  const userdetails = JSON.parse(sessionStorage.getItem("userdetails"));
  return (
    <>
      <header className="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 col-lg-2">
              <div className="header__logo">
                <font>eStore</font>
              </div>
            </div>
            <div className="col-xl-6 col-lg-7">
              <div className="input-group mt-3">
                <div className="input-group-prepend">
                  {/* <select className="form-control btn btn-success dropdown-toggle">
                    <option>ALL</option>
                    <option>Outfit</option>
                    <option>Accessories</option>
                  </select> */}
                </div>

                {/* <input type="text" className="form-control" /> */}

                {/* <div className="input-group-append">
                  <button className="btn btn-success">
                   <i className="fa fa-search"></i>
                  </button>
                </div> */}
              </div>
            </div>
            <div className="col-lg-3">
              <div className="header__right">
                {!userdetails ? (
                  <div className="header__right__auth">
                    <Link to="/login">Log-in</Link>
                    <Link to="/signup">Sign-up</Link>
                    {/* <Link to="/logout">Log-out</Link> */}
                  </div>
                ) : (
                  <div className="header__right__auth">
                    <img
                      src={userdetails.imageUrl}
                      style={{ width: 30, borderRadius: 50 }}
                    />
                    <a href="javascript:void(0)">{` Welcome ${userdetails.Username}`}</a>
                    <Link to="/history">View History</Link>
                  </div>
                )}

                <ul className="header__right__widget">
                  {/* <li>
                    <i className="fa fa-heart"></i>{" "}
                  </li> */}
                  <li>
                    <Link to={"/viewcart"}>
                      <i className="fa fa-shopping-cart">
                        {cart.item.length > 0 && (
                          <div className="tip">{cart.item.length}</div>
                        )}
                      </i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      <TopMenu />
    </>
  );
};

export default Header;
