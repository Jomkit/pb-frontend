const Popup = ({children, close}: {children: any, close: () => void}) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-40">
      
    <div className='w-1/2 h-52 fixed top-0 left-1/2 transform -translate-x-1/2 translate-y-1/2'>
        <div className='bg-slate-200 simple-border w-full min-h-full'>
            <div className='fixed top-0 right-0 m-3 mr-4'>
                <button onClick={close}><span>&#10005;</span></button>
            </div>
            {children}
        </div>

    </div>
    </div>
  )
}

export default Popup