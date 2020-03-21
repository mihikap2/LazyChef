import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, Image, ScrollView, ActivityIndicator, AsyncStorage } from 'react-native';
import * as Font from 'expo-font';
import {Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";


const current = { 'title': 'hello'}
const screenwidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class Favorites extends Component {
  state = {
    list : [],
    modalVisible: false,
    currentRecipe: current,
    instructions: current,
    steps: '',
    ingredients: '',
  }
    async componentDidMount() {
      await Font.loadAsync({
        'Comfortaa-Regular': require('./assets/fonts/Comfortaa-Regular.ttf'),
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
      });
      let LIST = []
        AsyncStorage.getAllKeys((err, keys) => {
          AsyncStorage.multiGet(keys, (error, stores) => {
            stores.map((result, i, store) => {
              let id = store[i][0]
              let name = store[i][1].split("#")[0]
              let url = store[i][1].split("#")[1]
              let obj = {'id': id, 'name': name, 'url': url}
              LIST.push(obj)
            });
            this.setState({list: LIST})
            console.log(LIST)
          });
        });   
      const { navigation } = this.props;
      this._unsubscribe = navigation.addListener('focus', async () => { 
        let LIST = []
        AsyncStorage.getAllKeys((err, keys) => {
          AsyncStorage.multiGet(keys, (error, stores) => {
            stores.map((result, i, store) => {
              let id = store[i][0]
              let name = store[i][1].split("#")[0]
              let url = store[i][1].split("#")[1]
              let obj = {'id': id, 'name': name, 'url': url}
              LIST.push(obj)
            });
            this.setState({list: LIST})
            console.log(LIST)
          });
        });     
      });

      
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  removeFavorite(id) {
    AsyncStorage.removeItem(id)
    this.setState({
      list: this.state.list.filter(item => item.id !== id)
     })
     
  }
    
  async showRecipe (item) {
    let INSTRUCTIONS = '';
    this.setState({modalVisible: true, currentRecipe: item})
    try {
      const uri = 'https://api.spoonacular.com/recipes/' + item.id.toString() +'/analyzedInstructions?apiKey=550d7b10c49b4500b59cca143ff98c59'
      console.log(uri)
      const recipeApiCall = await fetch(uri);
      INSTRUCTIONS = await recipeApiCall.json();        
      
    } catch(err) {
        console.log("Error fetching data-----------", err);
    }
    console.log(INSTRUCTIONS)
    this.setState({instructions: INSTRUCTIONS});
    let STEPS = ''
    let stepList = this.state.instructions[0].steps
    stepList.map((item) => {
      STEPS += item.number + '. ' + item.step + '\n\n';
    })
    let INGREDIENTS = ''
    let info;
    try {
      const uri = 'https://api.spoonacular.com/recipes/' + item.id.toString() +'/information?apiKey=550d7b10c49b4500b59cca143ff98c59'
      console.log(uri)
      const recipeApiCall = await fetch(uri);
      info = await recipeApiCall.json();        
      
    } catch(err) {
        console.log("Error fetching data-----------", err);
    }
    let ingredientList = info.extendedIngredients
    ingredientList.map((item) => {
      INGREDIENTS += item.original + '\n\n';
    })
  this.setState({steps: STEPS, ingredients: INGREDIENTS})
  }

  renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.item} key={item.key} onPress={() => this.showRecipe(item)}>
        <Image
          style={{width: screenwidth - 40, height: 180, borderRadius: 50 / 2}}
          source={{uri: item.url}}/>
        </TouchableOpacity>
        <View style={{ flex: 1, position: "absolute", 
        right: 15,
        top: 5,backgroundColor: 'transparent'}}>
          <Icon.Button name="trash" color={'#ffBE16'} size={30} backgroundColor='transparent' 
            onPress={() => this.removeFavorite(item.id)}/>
        </View>
        <View style={styles.recipeNameBox}>
          <Text style={styles.recipeName}>{item.name.toLowerCase()}</Text>
        </View>
    </View>
  );

    render() {
        return (
            <View style={styles.container}>
              <View style={{
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
              <Modal
                style={{margin: 0, width: screenwidth, flex: 1}}
                backdropOpacity={0}
                backdropColor={'#FFF'}
                isVisible={this.state.modalVisible}
                onBackdropPress={()=> this.setState({modalVisible: false})}
                >
                <ScrollView style={{flex: 0.8, marginTop: screenHeight/6.35 , width: screenwidth, backgroundColor: '#FFF', borderTopLeftRadius: 25, borderTopRightRadius: 25}}>
                <Image
                  style={{width: screenwidth, height: 240, borderTopLeftRadius: 25, borderTopRightRadius: 25}}
                  source={{uri: this.state.currentRecipe.url}}/>
                  <View style={{alignItems: 'center'}}>
                      <Text style={{
                          fontFamily : 'Comfortaa-Regular',
                          color: 'black',
                          fontSize: 24,
                          textAlign: 'center',
                          marginHorizontal: 10,
                          paddingVertical: 25
                        }}>{this.state.currentRecipe.name}</Text>
                  </View>
                  <View>
                    <Text style={styles.smallHeader}>Ingredients</Text>
                  </View>
                  <View>
                    <Text style={styles.text}>{this.state.ingredients}</Text>
                  </View>
                  <View>
                    <Text style={styles.smallHeader}>Instructions</Text>
                  </View>
                  <View>
                    <Text style={styles.text}>{this.state.steps}</Text>
                  </View>
                  </ScrollView>
                
              </Modal>
              </View>

                <View style={styles.pageheader}>
                    <View style={{flex: 1, alignItems: 'flex-start', flexDirection: 'row', marginBottom: 0}}>
                        <Text style={styles.headerText}>Favorites</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-start', flexDirection: 'row'}}>
                        <Text style={styles.subHeaderText}>MY GO-TO RECIPES</Text>
                    </View>
                </View>
                <View style={{flex: 5, alignItems: "flex-start", flexDirection: 'row'}}>
                  <FlatList
                    keyExtractor={item => item.id.toString()}
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
    marginHorizontal: 35,
    marginTop: 35,
    flex : 1.2,
    alignItems: 'flex-start',
    flexDirection: 'column'
  },
  headerText : {
    fontFamily : 'Comfortaa-Regular',
    paddingTop: 40,
    color: 'black',
    fontSize: 24,
    flex: 3,
    paddingBottom: 10
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
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 25,
  },
  recipeNameBox: {
    backgroundColor: '#FFBE16', 
    height: 50, 
    width: screenwidth - 120,  
    position: "absolute", 
    right: 10,
    top: 140,
    borderBottomRightRadius: 20, 
    justifyContent: "center"
  },
  recipeName: {
    color: 'white', 
    fontSize: 16, 
    textAlign: "right", 
    paddingRight: 10
  },
  smallHeader: {
    fontFamily : 'Comfortaa-Regular',
    color: 'black',
    fontSize: 18,
    marginHorizontal: 35,
    marginBottom: 5,
  },
  text : {
    color: 'black',
    fontSize: 12,
    marginHorizontal: 35
  }
});
