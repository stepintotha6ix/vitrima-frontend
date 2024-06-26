import { FC } from 'react'
import ReactSelect from 'react-select'
import ValueType from 'react-select'
import makeAnimated from 'react-select/animated'


import styles from './Select.module.scss'
import { IOption, ISelect } from './Select.interface'

const animatedComponents = makeAnimated()
const customStyles = {
    control: (provided:any ,state: any) => ({
      ...provided,
	  borderColor:'#999',
      background: 'transparent',
		borderRadius: "12px",
     
    }),
    menu: (provided:any) => ({
      ...provided,
      
    }),

};


const Select: FC<ISelect> = ({
	placeholder,
	error,
	isMulti,
	options,
	field,
	isLoading,
}) => {


	const onChange = (newValue: any) => {
		field.onChange(
			isMulti
				? (newValue as IOption[]).map((item: IOption) => item.value)
				: (newValue as IOption).value
		)
	}

	const getValue = () => {
		if (field.value) {
			return isMulti
				? options.filter((option) => field.value.indexOf(option.value) >= 0)
				: options.find((option) => option.value === field.value)
		} else {
			return isMulti ? [] : ('' as any)
		}
	}

	return (
		<div className={styles.selectContainer}>
			<label>
				<span>{placeholder}</span>
				<ReactSelect
                       styles={customStyles}
				
					placeholder={''}
					options={options}
					value={getValue()}
					onChange={onChange}
					isMulti={isMulti}
					components={animatedComponents}
					isLoading={isLoading}
				/>
			</label>
			
		</div>
	)
}

export default Select