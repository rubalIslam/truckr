import React, { Component } from 'react';
import UserLayout from '../../../hoc/user';

import FormField from '../../utils/Form/formfield';
import { update, generateData, isFormValid, populateOptionFields,resetFields} from '../../utils/Form/formActions';
import FileUpload from '../../utils/Form/fileupload';

import { connect } from 'react-redux';
import { getTrucktype, getCapacity,addTruck, clearTruck } from '../../../actions/truck_actions';


class AddTrucks extends Component {

    state = {
        formError:false,
        formSuccess:false,
        formdata:{
            name: {
                element: 'input',
                value: '',
                config:{
                    label: 'Truck name',
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter the truck'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            description: {
                element: 'textarea',
                value: '',
                config:{
                    label: 'Truck description',
                    name: 'description_input',
                    type: 'text',
                    placeholder: 'Enter trucks description'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            price: {
                element: 'input',
                value: '',
                config:{
                    label: 'Truck price/km',
                    name: 'price_input',
                    type: 'number',
                    placeholder: 'Enter your price'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            brand: {
                element: 'input',
                value: '',
                config:{
                    label: 'Truck Brand',
                    name: 'brands_input',
                    type: 'text',
                    placeholder: 'Enter truck brand'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            driver: {
                element: 'input',
                value: '',
                config:{
                    label: 'Driver name',
                    name: 'diiver_input',
                    type: 'text',
                    placeholder: "Enter the Driver name"
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            available: {
                element: 'select',
                value: '',
                config:{
                    label: 'Available',
                    name: 'available_input',
                    options:[
                        {key:true,value:'Yes'},
                        {key:false,value:'No'},
                    ]
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            trucktype: {
                element: 'select',
                value: '',
                config:{
                    label: 'Truck_type',
                    name: 'type_input',
                    options:[
                        {key:'small',value:'small'},
                        {key:'mini',value:'mini'},
                        {key:'auto',value:'auto'},
                        {key:'big',value:'big'}
                    ]
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            capacity: {
                element: 'select',
                value: '',
                config:{
                    label: 'capacity',
                    name: 'capacity_input',
                    options:[
                        {key:20,value:20},
                        {key:21,value:21},
                        {key:22,value:22},
                        {key:24,value:24}
                    ]
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            publish: {
                element: 'select',
                value: '',
                config:{
                    label: 'Publish',
                    name: 'publish_input',
                    options:[
                        {key:true,value:'Public'},
                        {key:false,value:'Hidden'},
                    ]
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            images:{
                value:[],
                validation:{
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: false
            }
        }
    }


    updateFields = (newFormdata) => {
        this.setState({
            formdata: newFormdata
        })
    }

    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'trucks');
        //console.log(newFormdata);
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    resetFieldHandler = () => {
        const newFormData = resetFields(this.state.formdata,'trucks');
        console.log("reset");
        this.setState({
            formdata: newFormData,
            formSuccess:true
        });
        setTimeout(()=>{
            this.setState({
                formSuccess: false
            },()=>{
                this.props.dispatch(clearTruck())
            })
        },3000)
    }

    submitForm= (event) =>{
        event.preventDefault();
        
        let dataToSubmit = generateData(this.state.formdata,'trucks');
        let formIsValid = isFormValid(this.state.formdata,'trucks')

        console.log(dataToSubmit);
        //console.log(formIsValid);
        if(formIsValid){
            this.props.dispatch(addTruck(dataToSubmit)).then(()=>{
                if( this.props.trucks.addTrucks.success){
                    this.resetFieldHandler();
                }else{
                    this.setState({formError: true})
                }
            })
        } else {
            this.setState({
                formError: true
            })
        }
    }


    componentDidMount(){
        const formdata = this.state.formdata;
/*
        this.props.dispatch(getTrucktype()).then( response => {
            const newFormData = populateOptionFields(formdata,this.props.trucks.brands,'brand');
            this.updateFields(newFormData)
        })

        this.props.dispatch(getCapacity()).then( response => {
            const newFormData = populateOptionFields(formdata,this.props.trucks.woods,'wood');
            this.updateFields(newFormData)
        })
    */    }

    imagesHandler = (images) => {
        const newFormData = {
            ...this.state.formdata
        }
        newFormData['images'].value = images;
        newFormData['images'].valid = true;

        this.setState({
            formdata:  newFormData
        })
    }

    render() {
        return (
            <UserLayout>
                <div>
                    <h1>Book Truck</h1>
                    
                    <form onSubmit={(event)=> this.submitForm(event)}>

                        <FileUpload
                            imagesHandler={(images)=> this.imagesHandler(images)}
                            reset={this.state.formSuccess}
                        />

                        <FormField
                            id={'name'}
                            formdata={this.state.formdata.name}
                            change={(element) => this.updateForm(element)}
                        />

                         <FormField
                            id={'description'}
                            formdata={this.state.formdata.description}
                            change={(element) => this.updateForm(element)}
                        />

                         <FormField
                            id={'price'}
                            formdata={this.state.formdata.price}
                            change={(element) => this.updateForm(element)}
                        />

                        <div className="form_devider"></div>

                        <FormField
                            id={'brand'}
                            formdata={this.state.formdata.brand}
                            change={(element) => this.updateForm(element)}
                        />

                        <FormField
                            id={'driver'}
                            formdata={this.state.formdata.driver}
                            change={(element) => this.updateForm(element)}
                        />

                         <FormField
                            id={'available'}
                            formdata={this.state.formdata.available}
                            change={(element) => this.updateForm(element)}
                        />

                        <div className="form_devider"></div>

                        <FormField
                            id={'trucktype'}
                            formdata={this.state.formdata.trucktype}
                            change={(element) => this.updateForm(element)}
                        />

                        <FormField
                            id={'capacity'}
                            formdata={this.state.formdata.capacity}
                            change={(element) => this.updateForm(element)}
                        />

                        <div className="form_devider"></div>

                        <FormField
                            id={'publish'}
                            formdata={this.state.formdata.publish}
                            change={(element) => this.updateForm(element)}
                        />

                        {this.state.formSuccess ?
                            <div className="form_success">
                                Success
                            </div>
                        :null}

                        {this.state.formError ?
                            <div className="error_label">
                                Please check your data
                                        </div>
                            : null}
                        <button onClick={(event) => this.submitForm(event)}>
                            Book Truck
                        </button>


                    </form>

                </div>
            </UserLayout>
            
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        trucks: state.trucks
    }
}


export default connect(mapStateToProps)(AddTrucks);