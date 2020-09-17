import React, { useCallback, useEffect, useState } from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import Aux from '../../hoc/Auxilliary/Auxilliiary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';


const burgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch();

    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.price)
    const isAuthenticated = useSelector(state => state.auth.token !== null)

    const onIngredientsAdded = (ingName) => dispatch(actions.addIngredient(ingName));
    const onIngredientsRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirect(path));

    
    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients])

    

    const updatePurchaseState = (ingredients) => {
        
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        
        return sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type];
    //     const updatedCount = oldCount + 1;

    //     const updatedIngredients = {
    //         ...this.props.ings
    //     };

    //     updatedIngredients[type] = updatedCount;

    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice +  priceAddition;

    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     });

    //     this.updatePurchaseState(updatedIngredients)
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type];
        
    //     if(oldCount <= 0) {
    //         return;
    //     }

    //     const updatedCount = oldCount - 1;

    //     const updatedIngredients = {
    //         ...this.props.ings
    //     };
    //     updatedIngredients[type] = updatedCount;

    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;

    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     })

    //     this.updatePurchaseState(updatedIngredients);
    // }

    const purchaseHandler = () => {
       if(isAuthenticated) {
           setPurchasing(true)
       } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
       }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        // alert('You Continue!')
        // const queryParams = [];
        
        // for(let i in this.props.ings) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        // }
        // queryParams.push('price=' + this.props.price)

        // const queryString = queryParams.join('&');

        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString,
        // })
        onInitPurchase();
        props.history.push('/checkout')
    }


        const disabledInfo = {
            ...ings
        }

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />
        let orderSummary = <Spinner />

        if(ings) {
            burger = (
                <Aux>
                    <Burger ingredients={ings} />
                    <BuildControls
                        ingredientAdded={onIngredientsAdded}
                        ingredientRemoved={onIngredientsRemoved}
                        disabled={disabledInfo}
                        ordered={purchaseHandler}
                        isAuth={isAuthenticated}
                        purchasable={updatePurchaseState(ings)}
                        price={price} /> 
                </Aux>
            )

            orderSummary = <OrderSummary 
                ingredients={ings}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}
                price={price} />

        }

        // if(this.state.loading) {
        //     orderSummary = <Spinner />
        // }

        return(
            <Aux>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        ) 
    
}

// const mapStateToProps = state => {
//     return {
//         ings: state.burgerBuilder.ingredients,
//         price: state.burgerBuilder.totalPrice,
//         error: state.burgerBuilder.error,
//         isAuthenticated: state.auth.token !== null
//     }
// }

// const mapDispachToProps = dispatch => {
//     return {
//         onIngredientsAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
//         onIngredientsRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
//         onInitIngredients: () => dispatch(actions.initIngredients()),
//         onInitPurchase: () => dispatch(actions.purchaseInit()),
//         onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirect(path))
//     }
// }

export default withErrorHandler(burgerBuilder,axios);