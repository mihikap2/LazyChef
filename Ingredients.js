import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { FlatList } from 'react-native-gesture-handler';
import { CheckBox, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


const DATA = [
    {
      id: '0',
      title: 'First Item',
      checked: false,
    },
    {
      id: '1',
      title: 'Second Item',
      checked: true,
    },
    {
      id: '2',
      title: 'Third Item',
      checked: true,
    },
  ];


export default class Ingredients extends Component {
    state = {
        list: DATA,
    }
    
    async componentDidMount() {
        
        await Font.loadAsync({
          'Comfortaa-Regular': require('./assets/fonts/Comfortaa-Regular.ttf'),
          'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),

        });
    }

    checkThisBox=(itemID)=>{
        let list=this.state.list
        list[itemID].checked=!list[itemID].checked
        this.setState({list:list})
    }


    renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.item} key={item.key}>
                <CheckBox
                    checked={this.state.list[item.id].checked}
                    onPress={() => this.checkThisBox(item.id)}
                    checkedColor='black'
                    uncheckedColor='black'
                    />
                <Text>{item.title}</Text>
                <Button
                    onPress = { () => this.deleteItem(item.id) }
                    >
                    <Icon name = { 'trash' } size={15}/>                
                </Button>
            </View>
        </View>
    );


    onCheck = (i) => {
        console.log('yes')
        let items = this.state.data;
        items[i].checked = items[i].checked ? ! items[i].checked : true
        this.setState({data:items})
    }

    render() {
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
                <View style={{flex: 3.5, alignItems: "flex-start", flexDirection: 'row', padding: 20}}>
                    <FlatList
                        keyExtractor={item => item.id}
                        data={this.state.list}
                        renderItem={this.renderItem}
                    />
                </View> 
          </View>
    );
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
    flex: 1
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
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 5,
    marginHorizontal: 1,
  },
});
