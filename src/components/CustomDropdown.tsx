import { Dropdown } from 'flowbite-react'

const CustomDropdown = ({label, items, handleClick}: {label: string, items: any, handleClick: Function}) => {
  return (
    <div className='simple-border rounded w-fit bg-slate-500 h-6'>
        <Dropdown label={label} dismissOnClick={false}>
            {items.map(( item:any ) => (
              <Dropdown.Item className='hover:bg-slate-100' key={item.id} onClick={() => handleClick(item)}>{ item.name }</Dropdown.Item>
            ))}
          </Dropdown>
    </div>
  )
}

export default CustomDropdown