import React, { useState } from 'react';
import { connect } from 'react-redux';
import { orderByForce, orderByName } from '../../actions';
import './OrderBy.css';

function OrderBy({ orderByForce, orderByName }) {

    const [orderName, setOrderName] = useState("ascendent");
    const [orderForce, setOrderForce] = useState("ascendent");

    const getByName = async (e) => {

        e.preventDefault();

        await orderByName(orderName);

        if (orderName === "ascendent") {
            setOrderName("descendent")
        }
        if (orderName === "descendent") {
            setOrderName("ascendent")
        }
    }

    const getByForce = async (e) => {

        e.preventDefault();

        await orderByForce(orderForce);

        console.log("GET FORCE")

        if (orderForce === "ascendent") {
            setOrderForce("descendent")
        }
        if (orderForce === "descendent") {
            setOrderForce("ascendent")
        }

    }

    return (
        <div className='orderby-container'>
            <button onClick={(e) => getByName(e)}>Order By Name</button>
            <button onClick={(e) => getByForce(e)}>Order By Force</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        orderByForce: (order) => dispatch(orderByForce(order)),
        orderByName: (order) => dispatch(orderByName(order))
    }
}

export default connect(null, mapDispatchToProps)(OrderBy);