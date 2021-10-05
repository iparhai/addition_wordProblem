
import { MathHelper } from "."
import apple from '../assets/apple.png'
import banana from '../assets/banana.png'
import mango from '../assets/mango.png'
import orange from '../assets/orange.png'
import pear from '../assets/pear.png'
import pineapple from '../assets/pineapple.png'
import plum from '../assets/plum.png'
import pomegranate from '../assets/pomegranate.png'
import strawberry from '../assets/strawberry.png'
import watermelon from '../assets/watermelon.png'
import lemon from '../assets/lemon.png'
import carrot from '../assets/carrot.png'
import cherry from '../assets/cherry.png'
import peach from '../assets/peach.png'
import dragon_fruit from '../assets/dragon_fruit.png'

const Names1 = ['Ahmed', 'Ali', 'Arham', 'Aryan', 'Awan', 'Awj', 'Harnail', 'Muhallil', 'Rohaan', 'Souma', 'Azeeb', 'Etizaaz', 'Ghazanfer', 'zawwar ', 'Areeb ']
const Names2 = ['Shahrukh', 'Ismail', 'Taimoor ', 'Ashad', 'Faizan', 'Shariat', 'Aaniya', 'Minahil', 'Rauf', 'Fawwad', 'Shahida', 'Rabia', 'Areesha', 'Ayesha', 'Aneeq']
const objectNameAndImage = [
    { objName: "apple", img: apple },
    { objName: "banana", img: banana },
    { objName: "mango", img: mango },
    { objName: "orange", img: orange },
    { objName: "pear", img: pear },
    { objName: "pineapple", img: pineapple },
    { objName: "plum", img: plum },
    { objName: "pomegranate", img: pomegranate },
    { objName: "strawberry", img: strawberry },
    { objName: "watermelon", img: watermelon },
    { objName: "lemon", img: lemon },
    { objName: "carrot", img: carrot },
    { objName: "cherry", img: cherry },
    { objName: "peach", img: peach },
    { objName: "dragon_fruit", img: dragon_fruit },
]



const getRandomSentenceParams = () => {
    const index_1 = MathHelper.getRandomInt(0, Names1.length - 1)
    const index_2 = MathHelper.getRandomInt(0, Names2.length - 1)
    const index_3 = MathHelper.getRandomInt(0, objectNameAndImage.length - 1)

    const firstName = Names1[index_1]
    const secondName = Names2[index_2]
    const objectName = objectNameAndImage[index_3].objName
    const img = objectNameAndImage[index_3].img
    return {firstName, secondName, objectName, img}
}

export default {
    getRandomSentenceParams
}