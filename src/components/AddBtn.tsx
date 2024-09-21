const AddBtn = ({handleClick, btnName}: {handleClick: () => void, btnName: string}) => {
    
  return (
    <div className='text-start'>
        <button className='btn bg-green-400 border-solid border-2 border-black' onClick={handleClick}>New {btnName}</button>
    </div>
  )
}

export default AddBtn