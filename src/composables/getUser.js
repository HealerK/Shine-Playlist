import { projectAuth } from "@/firebase/config";
import { ref } from "vue";

//refs
const user = ref(projectAuth.currentUser);

//auth changes
projectAuth.onAuthStateChanged(_user=>{
    console.log('User state changed.Current user is : ',_user);
    user.value = _user
})

const getUser = () => {
    return {user}
}

export default getUser