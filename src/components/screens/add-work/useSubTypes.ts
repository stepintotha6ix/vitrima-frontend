
import { WorkService } from '@/services/work/work.service'

import { useQuery } from 'react-query'


export const useSubTypes = (_id: string) => {
	const queryData = useQuery('list of sub types', () => WorkService.getSubTypeByWorkType(_id), {
		select: ({ data }) =>
			data.map(
				(subType) => ({
					label: subType.title,
					description: subType.description,
                    image: subType.image,
                    value: subType._id
				})
			),
		onError(error) {
			console.log(error, 'Ошибка')
		},
	})

	return queryData
}
