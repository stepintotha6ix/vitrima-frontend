import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useAuth } from '@/hooks/useAuth'

export const useAuthRedirect = () => {
	const {user} = useAuth()

	const { push } = useRouter()

	const redirect = '/select-feed'
	useEffect(() => {
		if (user) {push(redirect)}
		
	}, [user, redirect, push])
}
