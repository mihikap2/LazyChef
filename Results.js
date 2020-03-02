import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, Image, ScrollView, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import {Dimensions, TouchableOpacity} from 'react-native';
import Modal from "react-native-modal";
import './App.js'
import Icon from 'react-native-vector-icons/FontAwesome';
import {AsyncStorage} from 'react-native';


const current = { 'title': 'hello'}
const screenwidth = Math.round(Dimensions.get('window').width);
const screenheight = Math.round(Dimensions.get('window').height);


export default class Results extends Component {
   state = {
     RECIPES : [],
     modalVisible: false,
     currentRecipe: current,
     instructions: current,
     steps: '',
     ingredients: '',
     loading: false 
  }

    async componentDidMount() {
      const { navigation } = this.props;
        await Font.loadAsync({
          'Comfortaa-Regular': require('./assets/fonts/Comfortaa-Regular.ttf'),
          'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        });
        let INGREDIENTS = ''
          global.list.map((item) => {
            if (item.checked) {
              INGREDIENTS += item.title + ',+';
            }
          })
          INGREDIENTS = INGREDIENTS.slice(0, -2)
          // console.log(INGREDIENTS)
          this.setState({ loading: true })

          try {
            const recipeApiCall = await fetch('https://api.spoonacular.com/recipes/findByIngredients?ingredients='+INGREDIENTS+'&apiKey=550d7b10c49b4500b59cca143ff98c59');
            console.log('https://api.spoonacular.com/recipes/findByIngredients?ingredients='+INGREDIENTS+'&apiKey=550d7b10c49b4500b59cca143ff98c59')
            const recipes = await recipeApiCall.json();
            // console.log(recipes)
            let used = new Set();
  
            for (let obj of recipes) {
              console.log('https://api.unsplash.com/search/photos?page=1&query='+ obj.title +'&client_id=xD2GLsLM2FYyWPuH0YbXJ8bG9aNAkyjUOx_lH6AP03c')
              const imageApiCall = await fetch('https://api.unsplash.com/search/photos?page=1&query='+ obj.title +'&client_id=xD2GLsLM2FYyWPuH0YbXJ8bG9aNAkyjUOx_lH6AP03c')
              const image = await imageApiCall.json()
              this.setState({ loading: false })
              console.log(image.total)
              if (image.total > 3) {
                for(let i = 0; i < 3; i++) {
                  const url = image.results[i].urls.regular
                  if (!used.has(url)) {
                    used.add(url)
                    obj.image = url
                    // console.log(url)
                    break
                  }
                }
              }
            }
            this.setState({RECIPES: recipes});
            } catch(err) {
              // console.log(this.state.RECIPES)
              console.log("Error fetching data in image-----------", err);
          }

        this._unsubscribe = navigation.addListener('focus', async () => {
          // console.log("RESULTS - INGRED" + global.list)
          let INGREDIENTS = ''
          global.list.map((item) => {
            if (item.checked) {
              INGREDIENTS += item.title + ',+';
            }
          })
          INGREDIENTS = INGREDIENTS.slice(0, -2)
          // console.log(INGREDIENTS)
          this.setState({ loading: true })

          try {
            const recipeApiCall = await fetch('https://api.spoonacular.com/recipes/findByIngredients?ingredients='+INGREDIENTS+'&apiKey=550d7b10c49b4500b59cca143ff98c59');
            console.log('https://api.spoonacular.com/recipes/findByIngredients?ingredients='+INGREDIENTS+'&apiKey=550d7b10c49b4500b59cca143ff98c59')
            const recipes = await recipeApiCall.json();
            // console.log(recipes)
            let used = new Set();
  
            for (let obj of recipes) {
              console.log('https://api.unsplash.com/search/photos?page=1&query='+ obj.title +'&client_id=xD2GLsLM2FYyWPuH0YbXJ8bG9aNAkyjUOx_lH6AP03c')
              const imageApiCall = await fetch('https://api.unsplash.com/search/photos?page=1&query='+ obj.title +'&client_id=xD2GLsLM2FYyWPuH0YbXJ8bG9aNAkyjUOx_lH6AP03c')
              const image = await imageApiCall.json()
              this.setState({ loading: false })
              console.log(image.total)
              if (image.total > 3) {
                for(let i = 0; i < 3; i++) {
                  const url = image.results[i].urls.regular
                  if (!used.has(url)) {
                    used.add(url)
                    obj.image = url
                    // console.log(url)
                    break
                  }
                }
              }
            }
            this.setState({RECIPES: recipes});
            } catch(err) {
              // console.log(this.state.RECIPES)
              console.log("Error fetching data in image-----------", err);
          }
          

        });
        this.blurListener = navigation.addListener('blur', async () => {
          this.setState({RECIPES: []})
          this.setState({loading: false});
        });
     
    }

    componentWillUnmount() {
      this._unsubscribe();
      this.blurListener();
    }

    addFavorite(item) {
      AsyncStorage.setItem(item.id.toString(), item.title + "," + item.image);
    }

    async showRecipe (item) {
      let INSTRUCTIONS = '';
      this.setState({modalVisible: true, currentRecipe: item})
      try {
        const uri = 'https://api.spoonacular.com/recipes/' + item.id.toString() +'/analyzedInstructions?apiKey=550d7b10c49b4500b59cca143ff98c59'
        const recipeApiCall = await fetch(uri);
        INSTRUCTIONS = await recipeApiCall.json();        
        
      } catch(err) {
          console.log("Error fetching data-----------", err);
      }
      this.setState({instructions: INSTRUCTIONS});
      let STEPS = ''
      let stepList = this.state.instructions[0].steps
      stepList.map((item) => {
        STEPS += item.number + '. ' + item.step + '\n\n';
      })
      let INGREDIENTS = ''
      let ingredientList = item.missedIngredients
      ingredientList.map((item, index) => {
        INGREDIENTS += item.originalString + '\n\n';
      })
    this.setState({steps: STEPS, ingredients: INGREDIENTS})
    }
    

    renderItem = ({ item }) => (
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.item} key={item.key} onPress={() => this.showRecipe(item)}>
        <Image
          style={{width: screenwidth - 40, height: 180, borderRadius: 50 / 2}}
          source={{uri: item.image}}/>
        </TouchableOpacity>
        <View style={{ flex: 1, position: "absolute", 
        right: 15,
        top: 5,backgroundColor: 'transparent'}}>
          <Icon.Button name="heart" color={'#FFBE16'} size={30} backgroundColor='transparent' 
            onPress={() => this.addFavorite(item)}/>
        </View>
        <View style={styles.recipeNameBox}>
          <Text style={styles.recipeName}>{item.title.toLowerCase()}</Text>
        </View>
      </View>
  );

    render() {
      // console.log(this.state.currentRecipe)
      if (this.state.loading) {
        return (
          <View style={styles.container}>
            <View style={styles.pageheader}>
              <View style={{flex: 1, alignItems: 'flex-start', flexDirection: 'row'}}>
                  <Text style={styles.headerText}>Results</Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-start', flexDirection: 'row'}}>
                  <Text style={styles.subHeaderText}>LET'S GET COOKING</Text>
              </View>
            </View>
            {/*Code to show Activity Indicator*/}
            <View style={{flex: 4, alignItems: "center", flexDirection: 'row'}}>
              <ActivityIndicator size="large" color="#000000" />
            </View>
            
            {/*Size can be large/ small*/}
          </View>
        );
      } else 
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
                <ScrollView style={{flex: 0.8, marginTop: 150 , width: screenwidth, backgroundColor: '#FFF', borderTopLeftRadius: 25, borderTopRightRadius: 25}}>
                <Image
                  style={{width: screenwidth, height: 240, borderTopLeftRadius: 25, borderTopRightRadius: 25}}
                  source={{uri: this.state.currentRecipe.image}}/>
                  <View style={{alignItems: 'center'}}>
                      <Text style={{
                          fontFamily : 'Comfortaa-Regular',
                          color: 'black',
                          fontSize: 24,
                          textAlign: 'center',
                          marginHorizontal: 10,
                          paddingVertical: 25
                        }}>{this.state.currentRecipe.title }</Text>
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
                    <View style={{flex: 1, alignItems: 'flex-start', flexDirection: 'row'}}>
                        <Text style={styles.headerText}>Results</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-start', flexDirection: 'row'}}>
                        <Text style={styles.subHeaderText}>LET'S GET COOKING</Text>
                    </View>
                </View>
                <View style={{flex: 4, alignItems: "flex-start", flexDirection: 'row'}}>
                <FlatList
                    keyExtractor={item => item.id.toString()}
                    data={this.state.RECIPES}
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
        flex : 0.9,
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
        paddingTop: 10,
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