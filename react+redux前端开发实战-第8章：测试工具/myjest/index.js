import React, { useState } from 'react';

const STATUS = {
    HOVERED: 'hovered',
    NORMAL: 'normal'
};
const Link = (props) => {
    const [cla, setCla] = useState(STATUS.NORMAL);
    const _onMouseEnter = ()=>{
        setCla(STATUS.HOVERED);
    };
    const _onMouseLeave = ()=>{
        setCla(STATUS.NORMAL);
    };
    return (
        <a className={cla} href={props.url || '#'} onMouseEnter={_onMouseEnter} onMouseLeave={_onMouseLeave}>
            {this.props.children}
        </a> 
    )
}
export default Link;