import { computed, ref } from "vue";
import { type User } from "@/model/User";

const user = ref<User>({
    username: '',
    email: '',
    role: ''
});
const token = ref('');

export const useUserStore = () => {
    const setToken = (newToken: string) => {
        token.value = newToken;
    }
    const setUser = (newUser: any) => {
        user.value = newUser;
    }
    const isLoggedIn = computed(()=>{
        return token.value !== '';
    })
    return {
        user,
        token,
        setToken,
        setUser,
        isLoggedIn
    }
}