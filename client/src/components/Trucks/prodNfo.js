import React, { Component } from "react";
import MyButton from "../utils/button";
import FormField from "../utils/Form/formfield";
import Comments from "./comments";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTruck from "@fortawesome/fontawesome-free-solid/faTruck";
import faCheck from "@fortawesome/fontawesome-free-solid/faCheck";
import faTimes from "@fortawesome/fontawesome-free-solid/faTimes";

const ProdNfo = (props) => {

  const showProdTags = (detail) => (
    <div className="product_tags">
      {detail.shipping ? (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faTruck} />
          </div>
          <div className="tag_text">
            <div>Free shipping</div>
            <div>And return</div>
          </div>
        </div>
      ) : null}
      {detail.available ? (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faCheck} />
          </div>
          <div className="tag_text">
            <div>Available</div>
            <div>in store</div>
          </div>
        </div>
      ) : (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <div className="tag_text">
            <div>Not Available</div>
            <div>Preorder only</div>
          </div>
        </div>
      )}
    </div>
  );

  const showProdActions = (detail) => (
    <div className="product_actions">
      <div className="price">$ {detail.price} {/*detail._id*/}</div>
      <div className="cart">
        <MyButton
          type="add_to_cart_link"
          runAction={() => {
            props.addToCart(detail._id);
          }}
        />
      </div>
    </div>
  );
  /*
  const showComments = (detail) => (
    <div className="">
      comments
      <MyButton
        type="getComments"
        runAction={() => {
          props.getComments(detail._id);
        }}
      />
      {detail.comments}
    </div>
  );

  const updateComments = (event) => (
    <div className="">
      comments
      <MyButton
        type="addComments"
        runAction={() => {
          props.addComments(event._id);
        }}
      />
      {detail.comments}
    </div>
  );
*/
  const showProdSpecifications = (detail) => (
    <div className="product_specifications">
      <h2>Specs:</h2>
      <div>
        <div className="item">
          <strong>Frets:</strong> {detail.frets}
        </div>
        <div className="item">
          <strong>Wood:</strong> {detail.wood.name}
        </div>
      </div>
    </div>
  );

  const detail = props.detail;
  return (
    <div>
      <h1>
        {detail.brand.name} {detail.name}
      </h1>
      <p>{detail.description}</p>
      {showProdTags(detail)}
      {showProdActions(detail)}
      {/*showProdSpecifications(detail)*/}
      <Comments/>
      {/*<div>
        <FormField
          id={"comment"}
          formdata={"comment"}
        />
      </div>
      <div>
        <button onClick={(event) => updateComments(event)}>
          Comment
        </button>
      </div>

      {showComments(detail)}*/}
    </div>
  );
};

export default ProdNfo;
