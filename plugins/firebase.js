import firebase from 'firebase'

const config = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    apiKey: process.env.FIREBASE_PROJECT_API,
    authDomain: process.env.FIREBASE_AUTH_DOMEIN,
    storageBucket: process.env.FIREBASE_STRAGE_BUCKET,
}

if(!firebase.apps.length){
    firebase.initializeApp(config)
}

export default firebase
export const auth = firebase.auth();
// export const storage = firebase.storage();