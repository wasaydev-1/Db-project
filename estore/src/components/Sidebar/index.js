import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions/product";
import "./_sidebar.scss";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((obj) => obj);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    dispatch(actions.getProductCategories());
  }, []);

  const applyFilter = (item) => {
    let tmpFilter = {
      ...filter,
      categoryId: item.map((x) => x.Id),
    };

    setFilter(tmpFilter);

    if (tmpFilter.categoryId.length > 0)
      dispatch(actions.applyFilter(tmpFilter, product));
    else dispatch(actions.applyFilter(null, product));

    console.log(tmpFilter);
  };

  const checkboxchange = (e, item) => {
    let categories = [...categoryFilter];

    let index = categories.findIndex((item) => item.Id >= e.target.value);
    console.log("INDEX", index);

    if (!e.target.checked) {
      categories = categories
        .slice(0, index)
        .concat(categories.slice(index + 1, categories.length));
    } else if (e.target.checked) {
      categories.push(item);
    }
    setCategoryFilter(categories);

    applyFilter(categories);
  };

  return (
    <div>
      <div className="sidebar_category">
        <div className="section-title">
          <h4>Categories</h4>
        </div>
        {product.categories.map((item, index) => {
          return (
            <div className="category_accordian" key={index}>
              <div className="accordian">
                <div className="card">
                  <div className="card-heading">
                    <a>{item.Category}</a>
                  </div>
                  <div className="card-body">
                    <ul>
                      {item.SubCategory.map((subitem, ind) => (
                        <li key={ind}>
                          {/* <a href={null} onClick={()=>applyFilter(subitem)}>{subitem.Name} </a> */}
                          <div className="form-check">
                            <input
                              type="checkbox"
                              value={subitem.Id}
                              name={subitem.Name}
                              className="form-check-input"
                              onChange={(e) => checkboxchange(e, subitem)}
                              checked={
                                categoryFilter.find((x) => x.Id === subitem.Id)
                                  ? true
                                  : false
                              }
                            ></input>
                            <label
                              className="form-check-label"
                              style={{ color: "#000" }}
                            >
                              {subitem.Name}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="sidebar_category">
        <div className="section-title">
          <h4>Shop by price</h4>
        </div>
        <div>
          {`Price : $${filter?.price?.min || 0}-$${filter?.price?.max || 0}`}
          <div>
            <p>
              {`Min: `}
              <input
                type="range"
                id="min"
                min={1}
                max={150}
                step={1}
                onChange={(e) => {
                  setFilter({
                    ...filter,
                    price: {
                      ...filter.price,
                      min: parseInt(e.target.value),
                    },
                  });

                  console.log(filter);
                }}
              />
            </p>
            <p>
              {`Max: `}
              <input
                type="range"
                id="max"
                min={1}
                max={150}
                step={1}
                onChange={(e) => {
                  setFilter({
                    ...filter,
                    price: {
                      ...filter.price,
                      max: parseInt(e.target.value),
                    },
                  });

                  console.log(filter);
                }}
              />
            </p>
          </div>
          <button
            className="btn-sidebar"
            onClick={() => dispatch(actions.applyFilter(filter, product))}
          >
            {"Apply prices"}
          </button>
          <button
            className="btn-sidebar"
            onClick={() => {
              setFilter({});
              setCategoryFilter([]);
              dispatch(actions.applyFilter(null, product));
            }}
          >
            {"Remove all filters"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
