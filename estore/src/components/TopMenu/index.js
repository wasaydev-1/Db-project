import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getTopMenu } from "../../redux/actions/topMenu";
import "../TopMenu/_topmenu.scss";

//const menu = ['Home', 'Women', 'Men', 'Kids', 'Best Seller'];

const TopMenu = (props) => {
  return (
    <>
      <header className="menuHeader">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <nav className="menu">
                <ul>
                  {props.state.topMenu.map((item, index) => (
                    <li key={index}>
                      <Link to="/">{item}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

const mapStateToProps = (state) => {
  return { state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMenu: dispatch(getTopMenu()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
