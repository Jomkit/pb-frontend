const TimerFace = ({sec, min}: {sec: number, min: number}) => {
    let time = sec < 10 ? `${min}:0${sec}` : `${min}:${sec}`;
  return (
    <>
        <div className='text-center'>
            <h3 className='text-2xl bg-slate-200 w-fit m-auto px-4 py-1 rounded border-2 border-slate-500'>{time}</h3>
        </div>
        

    </>
  )
}

export default TimerFace