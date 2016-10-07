import React from 'react';

import ContentPortalHeader from '../components/ContentPortalHeader';

export default class ContentPortalLayout extends React.Component {
    render() {
        const path = this.props.location.pathname;
        return (
            <div>
                <ContentPortalHeader/>
                {React.cloneElement(this.props.children, {key: path})}
            </div>
        )

    }

}
