//import { EditorProps, EditorState } from 'draft-js'
import { ButtonHTMLAttributes, CSSProperties, InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

export interface IFieldProps {
	placeholder?: string
	error?: FieldError | undefined
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps

export interface IField extends TypeInputPropsField {}
export interface IUploadField {
	folder?: string
	image?: any
	drawing?: any
	onChange: (...event: any[]) => void
	placeholder: string
	error?: FieldError
	style?: CSSProperties
	title: string
	isNoImage?: boolean
	images?: string[]
	drawings? : string[]
	setImageIsUpload?: any
	setDrawingIsUpload?: any
}


type TypeEditorPropsField = {/*EditorProps*/} & IFieldProps

export interface ITextEditor extends Omit<TypeEditorPropsField, 'editorState'> {
	onChange: (...event: any[]) => void
	value: string
	title: string
}