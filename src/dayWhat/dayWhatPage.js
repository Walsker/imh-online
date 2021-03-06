// React Native imports
import React, {Component} from 'react';
import {RefreshControl, ScrollView, Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {updateDate, updateDayType} from './actions';

// Custom imports
import {colors, containerStyle} from 'ihsOnline/src/common/appStyles';
// import EventList from 'ihsOnline/src/common/events/eventList';
import ActionBar from 'ihsOnline/src/common/actionBar';
import IconButton from 'ihsOnline/src/common/iconButton';
import {DailyMessage, DateDisplay, BigLetter} from './components';

class DayWhatPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {refreshing: false};
    }

    renderDayInfo()
    {
        if (this.props.currentDayType == "Weekend")
        {
            return(
                <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center', height: 500}}>
                    <Text>It's the weekend!</Text>
                </View>
            );
        }
        else
        {
            return(
                <View style = {containerStyle.page}>
                    <BigLetter type = {this.props.currentDayType}/>
                </View>
            );
        }
    }

    update()
    {
        this.props.updateDate();
        this.props.updateDayType(this.props.currentDate);
    }

    refresh()
    {
        this.setState({refreshing: true});
        this.update();
        this.setState({refreshing: false});
    }

    render()
    {
        this.update();
        return(
            <View style = {containerStyle.default}>
                <ActionBar 
                    leftButton = {
                        <IconButton
                            type = 'menu'
                            size = {30}
                            color = {colors.titleAndIconColor}
                            action = {() => this.props.navigation.openDrawer()}
                        />
                    }
                    centerComponent = {<DateDisplay date = {this.props.currentDate}/>}
                />
                <ScrollView
                    refreshControl = 
                    {
                        <RefreshControl
                            refreshing = {this.state.refreshing}
                            onRefresh = {this.refresh.bind(this)}
                        />
                    }
                >
                    {this.renderDayInfo()}
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) =>
{
    return {
        currentDate: state.currentDate,
        currentDayType: state.currentDayType,
    };
}
export default connect(mapStateToProps, {updateDate, updateDayType})(DayWhatPage);