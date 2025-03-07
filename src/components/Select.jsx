import React,{ useId} from 'react'

const Select = ({
    options,
    label,
    className='',
    ...props
},ref) => {
    const id=useId()
    return(
        <div className='flex flex-col'>
            <label htmlFor={id} className='text-sm font-semibold text-gray-600'></label>
            <select
            id={id}
            className={`w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-500 ${className}`}
            {...props}
            ref={ref}
            >
                {options?.map(option=>(
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)