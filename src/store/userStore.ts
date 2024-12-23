import { ref } from "vue";
import { type User } from "@/model/User";

const user = ref<User>({
    id: 0,
    username: '',
    email: '',
    role: ''
});

export const useUserStore = () => {
    const setUser = (newUser: User) => {
        user.value = newUser;
    }
    const setAvatar = (avatar: string) => {
        user.value.profilePicture = avatar;
        localStorage.setItem('avatar', avatar);
    }
    return {
        user,
        setAvatar,
        setUser,
    }
}
