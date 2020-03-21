import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { FlatList } from 'react-native-gesture-handler';
import { CheckBox, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SearchBar } from 'react-native-elements';
import { Dimensions } from "react-native";
import './global.js'

const screenWidth = Math.round(Dimensions.get('window').width);

const DATA = global.list


export default class Ingredients extends Component {
    state = {
        list: DATA,
        search: '',
        loading: false
    }
    
    async componentDidMount() {
        
        await Font.loadAsync({
          'Comfortaa-Regular': require('./assets/fonts/Comfortaa-Regular.ttf'),
          'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        });
        this.setState({ loading: true })
      }
    componentDidUpdate() {
      global.list = this.state.list
    }

    checkThisBox=(id)=>{
        let list=this.state.list
        const index = list.findIndex(
          item => item.id === id
        );
        list[index].checked = !list[index].checked
        this.setState({list:list})
    }

    deleteItem=(id)=>{
      this.setState({
        list: this.state.list.filter(item => item.id !== id)
       })
    }

    updateSearch = search => {
      this.setState({ search });
    };

    addIngredient = search => {
      let list = this.state.list
      let item = {
        id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        title: this.state.search,
        checked: true
      }
      list.push(item)
      this.setState({list:list, search: ''})
    }

    renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.item} key={item.key}>
                <CheckBox
                    checked={item.checked}
                    onPress={() => this.checkThisBox(item.id)}
                    checkedColor='black'
                    uncheckedColor='black'
                    />
                <Text>{item.title}</Text>
                <Icon.Button
                    name ='trash'
                    size={30}
                    color='#000'
                    backgroundColor="#FFF"
                    onPress = { () => this.deleteItem(item.id) }
                    >               
                </Icon.Button>
            </View>
        </View>
    );

    render() {
      if (this.state.loading) {

        return (
            <View style={styles.container}>
                <View style={styles.pageheader}>
                    <View style={{flex: 1, alignItems: 'flex-start', flexDirection: 'row'}}>
                        <Text style={styles.headerText}>Ingredients</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-start', flexDirection: 'row'}}>
                        <Text style={styles.subHeaderText}>WHAT'S IN YOUR KITCHEN</Text>
                    </View>
                </View>
                <View style={{flex: 0.4, alignItems: "stretch", flexDirection: 'row'}}>
                  <SearchBar
                    inputStyle={{color: '#FFF'}}
                    inputContainerStyle={styles.searchbar1}
                    containerStyle={styles.searchbar}
                    placeholder="Enter ingredient to add..."
                    placeholderTextColor='#FFF'
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                    searchIcon={<Icon name='search' color='#FFF'size={15}/>}
                    clearIcon={<Icon name='close' color='#FFF' size={20}
                        onPress={() => this.setState({search: ''})}/>}
                    onSubmitEditing={this.addIngredient}
                  />
                </View>
                <View style={{flex: 4, alignItems: "flex-start", flexDirection: 'row', padding: 20}}>
                    <FlatList
                        keyExtractor={item => item.id}
                        data={this.state.list}
                        renderItem={this.renderItem}
                    />
                </View> 
          </View>
    );
        }
        return(<View></View>)
  }
}

const styles = StyleSheet.create({
  pageheader : {
    marginTop: 35,
    marginHorizontal: 35,
    flex : 1,
    alignItems: 'flex-start',
    flexDirection: 'column'
  },
  headerText : {
    fontFamily : 'Comfortaa-Regular',
    paddingTop: 40,
    color: 'black',
    fontSize: 24,
    flex: 2
  },
  subHeaderText : {
    fontFamily : 'Roboto-Bold',
    color: 'black',
    fontSize: 14,
    flex: 1,
    marginTop: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flex: 1,
    flexDirection:'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 5,
    marginHorizontal: 1,
  },
  searchbar: {
    backgroundColor: '#FFBE16',
    borderColor: '#FFF',
    alignItems: 'stretch',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomRightRadius: 20
  },
  searchbar1: {
    backgroundColor: '#FFBE16',
    alignItems: 'stretch',
    width: screenWidth - 70
  },
});
