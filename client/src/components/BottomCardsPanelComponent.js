import React from 'react';
import {Card, CardMedia, CardTitle} from 'material-ui/Card';

const BottomCardsPanelComponent = () => (
    <div className="bottom-cards col-md-12">
        <row className="col-md-12">
            <div className="col-md-4 col-md-offset-3">
                <Card>
                    <CardMedia overlay={< CardTitle title = "France" subtitle = "French" style = {{ height:'80px' }}/>}>
                        <img src='assets/img/france.jpg' className="bottom-cards-img"/>
                    </CardMedia>
                </Card>
            </div>
            <div className="col-md-2">
                <Card>
                    <CardMedia overlay={< CardTitle title = "France" subtitle = "French" style = {{ height:'80px' }}/>}>
                        <img src='assets/img/france.jpg' className="bottom-cards-img"/>
                    </CardMedia>
                </Card>
            </div>
        </row>
        <row className="col-md-12">
            <div className="col-md-2 col-md-offset-3">
                <Card>
                    <CardMedia overlay={< CardTitle title = "France" subtitle = "French" style = {{ height:'80px' }}/>}>
                        <img src='assets/img/france.jpg' className="bottom-cards-img"/>
                    </CardMedia>
                </Card>
            </div>
            <div className="col-md-4">
                <Card>
                    <CardMedia overlay={< CardTitle title = "France" subtitle = "French" style = {{ height:'80px' }}/>}>
                        <img src='assets/img/france.jpg' className="bottom-cards-img"/>
                    </CardMedia>
                </Card>
            </div>
        </row>
    </div>
);

export default BottomCardsPanelComponent;
