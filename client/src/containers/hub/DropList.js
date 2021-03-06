import React from 'react';
import ReactDOM from 'react-dom';
import Drop from './Drop';
import Waypoint from 'react-waypoint';
import CircularProgress from 'material-ui/CircularProgress';
import util from 'util';
class DropList extends React.Component {
    constructor(props) {
        super(props);
        this._loadMoreItems = this._loadMoreItems.bind(this);
        this._renderWaypoint = this._renderWaypoint.bind(this);
        this._renderItems = this._renderItems.bind(this);

		console.log("happens");
        this.state = {
            isLoading: false,
			drops: this.props.drops,
            currentItems: this.props.drops.slice(0, 20)
		
        }
    }

	componentWillReceiveProps(nextProps) {




		this.setState({newDrops: nextProps.newDrops})


	}



    _loadMoreItems() {
        var itemsToAdd = 50;
        var secondsToWait = 1;
		if(!this.state.isLoading){
	        this.setState({isLoading: true});
	        // fake an async. ajax call with setTimeout
	        window.setTimeout(() => {
	            // add datad
	            var currentItems = this.state.currentItems;
	            var newItems = this.state.drops.slice(currentItems.length, currentItems.length + 49);
	            currentItems = currentItems.concat(newItems);
	            this.setState({currentItems: currentItems, isLoading: false});
	        }, secondsToWait * 1000);
		}
    }

    _renderWaypoint() {
        if (!this.state.isLoading) {
            return (<Waypoint scrollableAncestor={window} debug={false} onEnter={this._loadMoreItems}/>);
        }
    }


    _renderItems() {


        let x = this.state.currentItems.map(function(drop, index) {
            return (<Drop key={index} file={drop.file}/>);
        });
		if(this.state.newDrops){
			let y = this.state.newDrops.map(function(drop, index) {
            	return (<Drop key={`n-${index}`} file={drop.file}/>);
        	});
			x = y.concat(x);
		}

		if(this.state.currentItems.length !== this.state.drops.length)
			x.splice(x.length - 20, 0, <Waypoint ref="waypoint" key={`${x-20}w`} scrollableAncestor={window} debug={false} onEnter={this._loadMoreItems}/>);
		return x;

    }

    render() {
        return (
            <div className="hubDrops grid-full clearfix" ref="parent">
              {this._renderItems()}
      				<div>
      					{this.state.isLoading ? <CircularProgress size={40} thickness={4} /> : null}
      				</div>
            </div>
        )

    }
};

export default DropList;
