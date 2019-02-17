import React, { Component } from 'react'
import {
    Animated,
    Easing
} from 'react-native'
import { createStackNavigator, createAppContainer } from "react-navigation";
import {
   SignComponent,
   Dashboard,
   ViewCategory,
   AddServis,
   Hiring,
   BookPerson,
   HeiredReview,
   ChatComponent
} from "./Components/index"




const transitionConfig = () => {
    return {
        transitionSpec: {
            duration: 650,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: sceneProps => {
            const { position, layout, scene, index, scenes } = sceneProps
            const toIndex = index
            const thisSceneIndex = scene.index
            const height = layout.initHeight
            const width = layout.initWidth

            const translateX = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                outputRange: [width, 0, 0]
            })

            // Since we want the card to take the same amount of time
            // to animate downwards no matter if it's 3rd on the stack
            // or 53rd, we interpolate over the entire range from 0 - thisSceneIndex
            const translateY = position.interpolate({
                inputRange: [0, thisSceneIndex],
                outputRange: [height, 0]
            })

            const slideFromRight = { transform: [{ translateX }] }
            const slideFromBottom = { transform: [{ translateY }] }

            const lastSceneIndex = scenes[scenes.length - 1].index

            // Test whether we're skipping back more than one screen
            if (lastSceneIndex - toIndex > 1) {
                // Do not transoform the screen being navigated to
                if (scene.index === toIndex) return
                // Hide all screens in between
                if (scene.index !== lastSceneIndex) return { opacity: 0 }
                // Slide top screen down
                return slideFromBottom
            }
            return slideFromRight
        },
    }
}




const MainNavigator = createStackNavigator({
    SignComponent: {
        screen: SignComponent,
        navigationOptions: {
            header: null
        },
    },
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            header: null
        },
    },
    ViewCategory: {
        screen: ViewCategory,
        navigationOptions: {
            header: null
        },
    },
    AddServis: {
        screen: AddServis,
        // navigationOptions: {
        //     header: null
        // },
    },
    Hiring: {
        screen: Hiring,
        navigationOptions: {
            header: null
        },
    },
    BookPerson: {
        screen: BookPerson,

    },
    HeiredReview: {
        screen: HeiredReview,

    },
    ChatComponent: {
        screen: ChatComponent,

    },
   
}, {
        initialRouteName: "SignComponent",
        transitionConfig,
    })




const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;