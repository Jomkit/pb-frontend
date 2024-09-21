import Frame from '../../components/Frame'

const Login = ({children}: {children: any}) => {
  return (
    <Frame bgColor='bg-green-400' title='Login'>
      {children}
    </Frame>
  )
}

export default Login