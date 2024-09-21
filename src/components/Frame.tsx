/**
 * A reusable frame component that wraps its children with a centered layout and a title.
 *
 * @param {string} bgColor - The background color of the frame.
 * @param {string} title - The title of the frame.
 * @param {any} children - The content to be rendered inside the frame.
 * @return {JSX.Element} The frame component.
 */
const Frame = ({ bgColor, title, children }: {bgColor: string, title: string, children: any}) => {
  return (
    <section className={`text-center items-start min-h-screen w-screen p-4 ${bgColor}`}>
      <h1>{title}</h1>

      <div className='p-10 justify-center'>
        {children}
      </div>
    </section>
  )
}

export default Frame