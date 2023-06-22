import firebase from 'firebase'

export default async function creditUser(userID) {
  const db = firebase.firestore()
  const profile = await db.collection('profiles').doc(userID).get()

  if (!profile.exists) {
    profile = {
      credits: 100,
    }
  } else {
    profile.credits += 100
  }

  await db.collection('profiles').doc(userID).set(profile)
}
