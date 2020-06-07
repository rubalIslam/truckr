import React, { Component } from 'react';
import PageTop from '../utils/page_top';

import ProdNfo from './prodNfo';
import ProdImg from './prodImg';

import { connect } from 'react-redux';
import { addToCart } from '../../actions/user_actions';
import { addTruckComments } from '../../actions/truck_actions';
import { getProductDetail, clearProductDetail } from '../../actions/products_actions';
import { getTruckDetail } from '../../actions/truck_actions';

class TruckPage extends Component {

    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.dispatch(getTruckDetail(id)).then((res)=>{
            //console.log(res);
            if(!this.props.trucks.truckDetail){
                this.props.history.push('/');
            }
        })
        //console.log(this.props);
    }
/*
    componentWillUnmount(){
        this.props.dispatch(clearProductDetail())
    }
*/

    addToCartHandler(id){
        this.props.dispatch(addToCart(id))
    }
   
    addCommentsHandler(id){
        this.props.dispatch(addTruckComments(id))
    }

    render() {
        return (
            <div>
                <PageTop
                    title="Truck detail"
                />
                <div className="container">
                {
                    this.props.trucks.truckDetail ?
                    <div className="product_detail_wrapper">
                        <div className="left">
                            <div style={{width:'500px'}}>
                                <ProdImg
                                    detail={this.props.trucks.truckDetail}
                                />
                            </div>
                        </div>
                        <div className="right">
                            <ProdNfo
                                addToCart={(id)=> this.addToCartHandler(id)}
                                addComments = {(id)=> this.addCommentsHandler(id)}
                                detail={this.props.trucks.truckDetail}
                                udetail = {this.props.user.userData}
                            />
                        </div>
                    </div>
                    : 'Loading'
                }

                </div>                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        trucks: state.trucks
    }
}

export default connect(mapStateToProps)(TruckPage);