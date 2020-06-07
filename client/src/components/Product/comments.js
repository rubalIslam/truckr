import React, { Component } from "react";

import FormField from "../utils/Form/formfield";
import {
  update,
  generateData,
  isFormValid,
  resetFields,
} from "../utils/Form/formActions";

import { connect } from "react-redux";
import {
  getBrands,
  addBrand,
  getComments,
  addComments,
} from "../../actions/products_actions";

class Comments extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "comment_input",
          type: "text",
          placeholder: "Enter the comment",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
    },
    messages: [],
    currentUser: "",
  };
  getDate = (item) => {
    let dt = item.date.split("T");
    let date = dt[0];
    //let time = dt[1];
    //let hrmin = time.substring(0,5);
    //console.log(date+" "+hrmin);
    //let dateNtime = hrmin+" "+date;
    return date;
  };
  getTime = (item) => {
    let dt = item.date.split("T");
    //let date = dt[0];
    let time = dt[1];
    let hrmin = time.substring(0, 5);
    return hrmin;
  };

  showCommentItems = () =>
    this.props.products.prodDetail.comments
      ? this.props.products.prodDetail.comments.map((item, i) => (
          <div className="comments" key={item.date}>
              <div className="nameMessage">
                <div className = "commentName">
                    {item.name}
                </div>
                <div className = "commentMessage">
                    {item.message}
                </div>
              </div>
              <div className = "dateTime">
                    <div className = "time">
                        {this.getTime(item)}
                    </div>
                    <div className = "date">
                        {this.getDate(item)}    
                    </div>
              </div>
          </div>
        ))
      : null;

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, "comments");
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
    //console.log(newFormdata);
  };

  resetFieldsHandler = () => {
    const newFormData = resetFields(this.state.formdata, "comments");
    //console.log(newFormData);
    this.setState({
      formdata: newFormData,
      formSuccess: true,
    });
    window.location.reload();
  };

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, "comments");
    let formIsValid = isFormValid(this.state.formdata, "comments");
    //let formIsValid = true;
    let existingComments = this.props.products.prodDetail;
    let prodId = this.props.products.prodDetail._id;
    let user = this.state.currentUser;
    //console.log(formIsValid);
    //console.log(dataToSubmit.comment);
    //console.log(prodId);
    let commentsData = {
      username: user,
      message: dataToSubmit,
      existComm: existingComments,
    };
    if (formIsValid) {
      this.props
        .dispatch(addComments(prodId, commentsData))
        .then((response) => {
          if (response.payload.success) {
            this.resetFieldsHandler();
            //console.log("reset");
          } else {
            this.setState({ formError: true });
          }
        });
      //console.log(formIsValid);
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  componentDidMount() {
    this.props.dispatch(getComments());
    //console.log(com);
    this.setState({
      currentUser: this.props.users.userData.name,
    });
    //console.log(this.state.currentUser);
  }

  componentWillMount() {
    //console.log(this.props.products.prodDetail.comments);
  }
  render() {
    return (
      <div className="">
        <h1>Comments</h1>
        <div className="">
          <div className="">
            <div className="">{this.showCommentItems()}</div>
          </div>
          <div className="  ">
            <form onSubmit={(event) => this.submitForm(event)} className="commentBox">
              <FormField
                id={"name"}
                formdata={this.state.formdata.name}
                change={(element) => this.updateForm(element)}
              />

              {this.state.formError ? (
                <div className="">Please click on comment</div>
              ) : null}
              <button onClick={(event) => this.submitForm(event)}>
                Add Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    users: state.user,
  };
};

export default connect(mapStateToProps)(Comments);
