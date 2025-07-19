import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../supabaseClient'
import Home from './Home'


export default function Login() {
    const [session, setSession] = useState(null)
    const [userName, setUserName] = useState('')


    useEffect(() => {

        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            if (session?.user) {
                setUserName(session.user.user_metadata.name)
            }
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            if (session?.user) {
                setUserName(session.user.user_metadata.name)
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    /* Cerrar sesión
    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
    }*/

    if (!session) {
        return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={['google']} />)
    }
    else {
        return (<Home userName={userName} />)
    }

}