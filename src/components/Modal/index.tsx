import { FC } from 'react'
import ReactModal from 'react-modal'

import { ModalProps } from '../../types'

export const Modal: FC<ModalProps> = ({ isOpen, setIsOpen, children }) => {
  // constructor(props) {
  //   super(props)

  //   const { isOpen } = this.props
  //   this.state = {
  //     modalStatus: isOpen
  //   }
  // }

  // componentDidUpdate(prevProps) {
  //   const { isOpen } = this.props

  //   if (prevProps.isOpen !== isOpen) {
  //     console.log(this.props)
  //     this.setState({ modalStatus: isOpen })
  //   }
  // }

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      // isOpen={modalStatus}
      isOpen={isOpen}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#F0F0F5',
          color: '#000000',
          borderRadius: '8px',
          width: '736px',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
    >
      {children}
    </ReactModal>
  )
}
