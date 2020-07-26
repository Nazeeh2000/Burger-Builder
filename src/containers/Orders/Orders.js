import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import Spinner from '../../UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// import order from '../../components/Order/Order';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Orders extends Component {
    
    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }
    render() {
        let orders = <Spinner />
        if(!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                    clicked={() => this.props.onOrderClicked(order.id)} />
            ))
        }
        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
        onOrderClicked: (id) => dispatch(actions.orderClicked(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));