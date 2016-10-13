import React from 'react';

import MainPageHeader from '../components/MainPageHeader';

export default class MainPageLayout extends React.Component {
    render() {
        const path = this.props.location.pathname;
        return (
            <div>
                <MainPageHeader/>
                {React.cloneElement(this.props.children, {key: path})}
            </div>
        )

    }

}
