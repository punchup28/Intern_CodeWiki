import React from 'react'

const AlreadyDescription = (props) => {
    return (
        <div>
            {props.children}
        </div>
    )
}

const MiddleDescription = (props) => {
    return (
        <div >
            {props.children}
        </div>
    )
}

const styles = {
    already_des: {
        backgroundColor: '#f2f2f2', 
        paddingLeft: 16,
        borderLeftStyle: 'solid',
        borderLeftWidth: 'thick',
        borderLeftColor: '#577380'
    },
    middle_des: {
        backgroundColor: '#f2f2f2', 
        paddingLeft: 16,
        paddingTop: 5,
        paddingBottom: 5,
        borderLeftStyle: 'solid',
        borderLeftWidth: 'thick',
        borderLeftColor: 'red'
    }
}

export {
    AlreadyDescription,
    MiddleDescription
}