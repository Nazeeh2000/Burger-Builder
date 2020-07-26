import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient'

const burger = props => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(IGkey => {
            return [...Array(props.ingredients[IGkey])].map((_, i) => {
                return <BurgerIngredient key={IGkey + i} type={IGkey} />
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    // console.log(transformedIngredients)

    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
    
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default burger;