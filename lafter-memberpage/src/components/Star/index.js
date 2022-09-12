import React from 'react';

import propTypes from 'prop-types';

import IconStar from 'public/images/icon-star.svg'

function Star({ className, value, height, width }) {
    const star = []
    let leftPos = 0

    for (let index = 0; index < 5 && index < value; index++) {
        leftPos = leftPos + width
        star.push(<div className='star' key={`star-${index}`} style={{ left: index * width, height, width }} />)
    }

    const starPlaceholder = []
    for (let index = 0; index < 5; index++) {
        starPlaceholder.push(<div className='star placeholder' key={`starPlaceholder-${index}`} style={{ left: index * width, height, width }} />)
    }

    return (
        <div className={["stars", className].join(" ")} style={{ height }}>
            {starPlaceholder}
            {star}
            <IconStar></IconStar>
        </div>
    );
}

Star.propTypes = {
    className: propTypes.string,
    value: propTypes.number,
    height: propTypes.number,
    width: propTypes.number
}

export default Star;