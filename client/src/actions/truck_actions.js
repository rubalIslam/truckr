import axios from "axios";
import {
  GET_TRUCKS,
  ADD_TRUCKS,
  GET_BRANDS,
  ADD_BRAND,
  CLEAR_TRUCKS,
  GET_TRUCKTYPE,
  ADD_TRUCKTYPE,
  GET_CAPACITY,
  GET_TRUCK_DETAIL,
  CLEAR_TRUCK_DETAIL,
  ADD_TRUCK_COMMENTS,
  GET_TRUCK_COMMENTS
} from "./types";

import { TRUCK_SERVER } from "../components/utils/misc";


/*
export function getProductsToBook(skip, limit,filters =[], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${PRODUCT_SERVER}/book`,data)
                .then(response => {
                    let newState = [
                        ...previousState,
                        ...response.data.articles
                    ];
                    return {
                        size: response.data.size,
                        articles: newState
                    }
                });

    return {
        type: GET_PRODUCTS_TO_BOOK,
        payload: request
    }

}
*/
export function getTrucks(page,itemsPerPage) {
  //console.log(itemsPerPage);
  const request = axios
    .get(`${TRUCK_SERVER}/book?page=${page}&limit=${itemsPerPage}`)
    .then((response) => response.data);

  return {
    type: GET_TRUCKS,
    payload: request,
  };
}

export function getTruckDetail(id) {
  const request = axios
    .get(`${TRUCK_SERVER}/trucks_by_id?id=${id}& type = single`)
    .then((response) => {
      return response.data[0];
    });
  return {
    type: GET_TRUCK_DETAIL,
    payload: request,
  };
}
export function clearTruckDetail() {
  return {
    type: CLEAR_TRUCK_DETAIL,
    payload: "",
  };
}

export function addTruck(datatoSubmit) {
  const request = axios
    .post(`${TRUCK_SERVER}/truck`, datatoSubmit)
    .then((response) => response.data);

  return {
    type: ADD_TRUCKS,
    payload: request,
  };
}

export function clearTruck() {
  return {
    type: CLEAR_TRUCKS,
    payload: "",
  };
}

export function getBrands() {
  const request = axios
    .get(`${TRUCK_SERVER}/brands`)
    .then((response) => response.data);

  return {
    type: GET_BRANDS,
    payload: request,
  };
}

export function addBrand(dataToSubmit, existingBrands) {
  const request = axios
    .post(`${TRUCK_SERVER}/brand`, dataToSubmit)
    .then((response) => {
      let brands = [...existingBrands, response.data.brand];
      return {
        success: response.data.success,
        brands,
      };
    });
  return {
    type: ADD_BRAND,
    payload: request,
  };
}

export function addTrucktype(dataToSubmit, existingTrucks) {
  const request = axios
    .post(`${TRUCK_SERVER}/trucktype`, dataToSubmit)
    .then((response) => {
      let trucktype = [...existingTrucks, response.data.trucktype];
      return {
        success: response.data.success,
        trucktype,
      };
    });
  return {
    type: ADD_TRUCKTYPE,
    payload: request,
  };
}

/*

export function getTrucktype(){
    const request = axios.get(`${TRUCK_SERVER}/trucktype`)
    .then(response => response.data );

    return {
        type: GET_TRUCKTYPE,
        payload: request
    }
}

export function getCapacity(){
    const request = axios.get(`${TRUCK_SERVER}/capacity`)
    .then(response => response.data );

    return {
        type: GET_CAPACITY,
        payload: request
    }
}

*/
//Comments


export function addTruckComments(_id,commentsData){
  console.log(commentsData);

  const request = axios.post( `${TRUCK_SERVER}/addTruckComments?truckId=${_id}`,commentsData)
  .then(response => {
      
      let comments = [
          //...existingComments,
          //currentUser,
          response.data.commentsData
      ];
      return {
          success: true,
          comments
      }    
     // console.log(response.data);
  })

  return {
     // type: ADD_TO_CART_USER,
      type: ADD_TRUCK_COMMENTS,
      payload: request
  }
}

export function getTruckComments(){
  const request = axios.get(`${TRUCK_SERVER}/getTruckComments`)
              .then(response => response.data );
  
  return {
      type: GET_TRUCK_COMMENTS,
      payload: request
  }
}
