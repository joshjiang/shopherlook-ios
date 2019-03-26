import React, { Component, } from 'react'
import  { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Picker} from 'react-native'
import { Button } from 'react-native-elements';
import { MaterialCommunityIcons, Feather, Foundation, Ionicons} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome'; // 4.4.2
import { Dropdown } from 'react-native-material-dropdown';
import Slider from "react-native-slider";


class Filters extends Component {
   
    render() {
        return  ( 
            <View style = {styles.container}> 
                <FilterContainer /> 
            </View>
        )
    }
}

const FilterContainer = ({looks}) => 
  <View> 
    <TopHeader/>
    <FiltersAll />
    <FiltersButton />
  </View>

const TopHeader = ({}) => 
    <View style = {styles.headerbox}>
        <View style = {styles.header}>
                <Feather name="align-justify" size={32} color="#d9eefc" />
                <Text style={{fontSize: 18, color: 'cornflowerblue' }} >FILTERS</Text>
                <Feather  name="x" size={32} color="cornflowerblue" />
        </View>
    </View>

const FiltersAll = ({}) => 
    <View> 
        <Size />
        <Color />
        <Brands />
        <Price />
    </View>

// TouchableOpacity for buttons 
const Size = ({}) =>
    <View> 
        <View style = {styles.top} > 
            <Text style={{fontSize: 14, marginLeft: 15, color: "cornflowerblue"} } >SIZE</Text>
        </View> 
        <View style = {styles.filters}> 
            <Button title="XS" onPress={onPressLearnMore}   style={{color: "cornflowerblue"}}  />
            <Button title="S" onPress={onPressLearnMore} color="cornflowerblue" />
            <Button title="M" onPress={onPressLearnMore} color="cornflowerblue" />
            <Button title="L" onPress={onPressLearnMore} color="cornflowerblue" />
            <Button title="XL"onPress={onPressLearnMore} color="cornflowerblue" />
        </View> 
    </View>

const Color = ({}) => 
    <View> 
        <View style = {styles.top} > 
            <Text style={{fontSize: 14, marginLeft: 15, color: "cornflowerblue"} } >COLOR</Text>
        </View> 
        <View style = {styles.filters}>
            <TouchableOpacity onPress={() => null}>
                    <Icon
                    name="circle"
                    icon={{ name: 'color1', type: 'font-awesome' }}
                    style={styles.button}
                    size={50}
                    color = "cornflowerblue"
                    />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => null}>
                    <Icon
                    name="circle"
                    icon={{ name: 'color3', type: 'font-awesome' }}
                    style={styles.button}
                    size={50}
                    color = "#ebdbff"
                    />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => null}>
                    <Icon
                    name="circle"
                    icon={{ name: 'color2', type: 'font-awesome' }}
                    style={styles.button}
                    size={50}
                    color = "pink"
                    />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => null}>
                    <Icon
                    name="circle"
                    icon={{ name: 'color3', type: 'font-awesome' }}
                    style={styles.button}
                    size={50}
                    color = "#d0f2e5"
                    />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => null}>
                    <Icon
                    name="circle"
                    icon={{ name: 'color3', type: 'font-awesome' }}
                    style={styles.button}
                    size={50}
                    color = "#fff8ce"
                    />
            </TouchableOpacity>
        </View>
    </View>

let data = [{
    value: 'brand 1',
  }, {
    value: 'brand 2',
  }, {
    value: 'brand 3',
  }, {
    value: 'brand 4',
  }, {
    value: 'brand 5',
  }];

const Brands = ({}) => 

    <View>
        <View style = {styles.top} > 
            <Text style={{fontSize: 14, marginLeft: 15, color: "cornflowerblue"} } >BRANDS</Text>
        </View> 
        <View style = {styles.brandStyle}>
            <Dropdown
                label='Choose One'
                data={data}
                
            />
        </View>
    </View>


state = { 
    distance: 55,
    minDistance: 10,
    maxDistance: 100 
}

const Price = ({}) => 
    <View>
        <View style = {styles.top} > 
            <Text style={{fontSize: 14, marginLeft: 15, color: "cornflowerblue"} } >PRICE</Text>
        </View> 
        <View style = {styles.brandStyle}>
            <Slider
                value={this.state.distance}
                onValueChange={val => this.setState({ distance: val })}
                step={1}
                minimumValue={this.state.minDistance}
                maximumValue={this.state.maxDistance}
                thumbTintColor='cornflowerblue'
                maximumTrackTintColor='#eaecef' 
                minimumTrackTintColor='#b3cbef'
            />
            <View style={styles.textCon}>
                    <Text style={styles.colorLightBlue}>$ {this.state.minDistance}</Text>
                    <Text style={styles.colorBlue}>
                        {'$ ' + this.state.distance }
                    </Text>
                    <Text style={styles.colorLightBlue}>$ {this.state.maxDistance}</Text>
            </View>
        </View>
    </View>

const FiltersButton = ({}) => 
    <View style = {styles.applyfilter}>
        <Button title="APPLY FILTERS" onPress={onPressLearnMore} color="cornflowerblue" type="outline" />
    </View>
    


const onPressLearnMore = ({}) => {

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      justifyContent:'space-between',
      flexDirection:'row',
      alignItems: 'center',
      marginTop: 50,
      marginBottom: 20,
      marginRight: 10,
      marginLeft: 10,
    },
    headerbox: {
        backgroundColor: '#d9eefc',
    },
    filters: {
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 5,
        marginRight: 15,
        marginLeft: 15,
      },
    top: {
        marginTop: 20,
    },
      brandStyle: {
        marginRight: 15,
        marginLeft: 15
      },
      textCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    colorLightBlue: {
        color: '#a0a9ba'
    },
    colorBlue: {
        color: '#9abcf9'
    },
    applyfilter: {
        color: 'cornflowerblue',
        marginRight: 15,
        marginLeft: 15,
        marginTop: 300,
        marginBottom: 15,

    },
})

export default Filters;
