const Card = ({title="", subtitle="", children}: {title?: string, subtitle?: string, children: any}) => {
  return (
    <div className='w-full mx-auto mb-2 p-6 bg-white border-solid border-2 border-black rounded-lg divide-y'>
      <div className='text-center'>
        <h2>{title}</h2>
        <h4>{subtitle}</h4>
      </div>
      {children}
    </div>
  )
}

export default Card