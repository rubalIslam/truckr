import React, { useState, useEffect, Component } from "react";
import PageTop from "../utils/page_top";

import { frets, price } from "../utils/Form/fixed_categories";

import { connect } from "react-redux";
import {
  getProductsToShop,
  getBrands,
  getWoods,
} from "../../actions/products_actions";
import { getTrucks } from "../../actions/truck_actions";
import CollapseCheckbox from "../utils/collapseCheckbox";
import CollapseRadio from "../utils/collapseRadio";
//import CardBlockShop from "../utils/card_block_shop";
import CardBlockBook from "./card_block_book";

//import LoadmoreCards from "./loadmoreCards";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faBars from "@fortawesome/fontawesome-free-solid/faBars";
import faTh from "@fortawesome/fontawesome-free-solid/faTh";
import angleRight from "@fortawesome/fontawesome-free-solid/faAngleRight";
import angleLeft from "@fortawesome/fontawesome-free-solid/faAngleLeft";
import { restore } from "cloudinary/lib/api";


class Book extends Component {
  //const [ posts,setPosts ] = useState([]);
  //const [ loading, setLoading ] = useState(false);

  state = {
    posts: [],
    next: [],
    currentPage: 1,
    nextPage: 1,
    previousPage: 1,

    grid: "",
    page: 1,
    itemsPerPage: 6,
    limit: 3,
    skip: 0,
    filters: {
      brand: [],
      frets: [],
      wood: [],
      price: [],
    },
  };
  //const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;

  componentDidMount() {
    const page = this.state.page;
    const itemsPerPage = this.state.itemsPerPage;
    this.props.dispatch(getTrucks(page, itemsPerPage)).then((res) => {
      //console.log(res.payload.next);
      this.setState({
        posts: res.payload.results,
        next: res.payload.next,
        currentPage: res.payload.next.page - 1,
        nextPage: res.payload.next.page,
      });
    });
  }
  handlePrevious = () => {
    const prevNum = this.state.previousPage;
    const itemsPerPage = this.state.itemsPerPage;

    this.props.dispatch(getTrucks(prevNum, itemsPerPage)).then((res) => {
      this.setState({
        posts: res.payload.results,
        next: res.payload.next,
      });
      if (res.next) {
        this.setState({
          nextPage: res.payload.next.page,
          currentPage: res.payload.next.page - 1
        });
      }
      if (res.previous) {
        this.setState({
          previousPage: res.payload.previous.page,
          currentPage: res.payload.previous.page + 1
        });
      }
      window.scrollTo(0, 0);
    });
  };
  handleNext = () => {
    const newNum = this.state.nextPage;
    const itemsPerPage = this.state.itemsPerPage;
    //console.log(newNum);
    this.props.dispatch(getTrucks(newNum, itemsPerPage)).then((res) => {
      //console.log(res);
      this.setState({
        posts: res.payload.results,
        next: res.payload.next,
      });
      if (res.next) {
        this.setState({
          nextPage: res.payload.next.page,
          currentPage: res.payload.next.page - 1
        });
      }
      if (res.previous) {
        this.setState({
          previousPage: res.payload.previous.page,
          currentPage: res.payload.previous.page + 1
        });
      }
      window.scrollTo(0, 0);
    });
  };

  handlePage = (number, itemsPerPage) => {
    this.props.dispatch(getTrucks(number, itemsPerPage)).then((res) => {
      this.setState({
        posts: res.payload.posts,
        next: res.payload.next,
      });
    });
  };
  pageNumber = () => {
    const currentPage = this.state.currentPage;
    return (
      <div
        className="number"
      >
        {currentPage}
      </div>
    );
  };

  handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  handleFilters = (filters, category) => {
    const newFilters = { ...this.state.filters };
    newFilters[category] = filters;

    if (category === "price") {
      let priceValues = this.handlePrice(filters);
      newFilters[category] = priceValues;
    }

    this.showFilteredResults(newFilters);
    this.setState({
      filters: newFilters,
    });
  };

  showFilteredResults = (filters) => {
    this.props
      .dispatch(getProductsToShop(0, this.state.limit, filters))
      .then(() => {
        this.setState({
          skip: 0,
        });
      });
  };

  handleGrid = () => {
    this.setState({
      grid: !this.state.grid ? "grid_bars" : "",
    });
  };

  render() {
    const tr = this.props.trucks.trucks;

    return (
      <div>
        <PageTop title="Browse Products" />
        <div className="container">
          <div className="shop_wrapper">
            <div className="shopLists">
              <div className="shop_grids clear">
                <div
                  className={`grid_btn ${this.state.grid ? "" : "active"}`}
                  onClick={() => this.handleGrid()}
                >
                  <FontAwesomeIcon icon={faTh} />
                </div>
                <div
                  className={`grid_btn ${!this.state.grid ? "" : "active"}`}
                  onClick={() => this.handleGrid()}
                >
                  <FontAwesomeIcon icon={faBars} />
                </div>
              </div>
              <div style={{ clear: "both" }} className="shopCards">
                {
                  <CardBlockBook
                    grid={this.state.grid}
                    list={this.state.posts}
                  />
                }
              </div>
              <div className="page">
                <div
                  className="pageNumber"
                  onClick={() => this.handlePrevious()}
                >
                  <FontAwesomeIcon icon={angleLeft} /> 
                   Previous
                </div>
                <div className="pageNumber">{this.state.nextPage-1}</div>
                <div className="pageNumber" onClick={() => this.handleNext()}>
                  Next
                  <FontAwesomeIcon icon={angleRight} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // products: state.products
    trucks: state.trucks,
  };
};

export default connect(mapStateToProps)(Book);
