import { useContext } from 'react'
import AlertContext from '../alertContext'

const Notification = () => {
  const [alert, dispatch] = useContext(AlertContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (alert.message == null) return null

  return (
    <div style={style}>
      {alert.message}
    </div>
  )
}

export default Notification
