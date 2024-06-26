
import { IFieldProps } from '@/components/ui/Form-elements/form.interface'
import { ControllerRenderProps } from 'react-hook-form'
import  {Options}  from 'react-select'

export interface IOption {
	label: string
	value: string
}

export interface ISelect extends IFieldProps {
	options: any
	isMulti?: boolean
	field: ControllerRenderProps<any, any>
	isLoading?: boolean
	onSelectChange?: any
	setCurrentSubType:any
	title?: string
}