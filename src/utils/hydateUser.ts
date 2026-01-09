import { useAuthStore } from "@/store/user.store"

export const hydrateUserStore = async () => {
    const user = useAuthStore.getState().user

    if (!user) {
        const user = localStorage.getItem("authify_user_info")!
        const parsedUser = JSON.parse(user)
        useAuthStore.getState().setUser(parsedUser)
    }
}