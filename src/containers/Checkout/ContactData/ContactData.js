import React, { Component } from 'react';
import Button from '../../../UI/Button/Button';
import Spinner from '../../../UI/Spinner/Spinner';
import classes from './ContactData.css'
import axios from '../../../axios-orders';

class ContactData extends Component {
    state={
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients)
        
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Nazeeh Vahora',
                address: {
                    street: 'TestStreet',
                    zipCode: '96969',
                    country: 'India'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
                // console.log(response)
            })
            .catch(error => {
                this.setState({loading: false});
                // console.log(error)
            });
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type='text' name='name' placeholder='Your Name' />
                <input className={classes.Input} type='email' name='email' placeholder='Your Mail' />
                <input className={classes.Input} type='text' name='street' placeholder='Street' />
                <input className={classes.Input} type='text' name='postal' placeholder='Postal Code' />
                <Button 
                    btnType="Success"
                    clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter yoiur Contact Data</h4>
                {form}    
            </div>
        )
    }
}

export default ContactData;