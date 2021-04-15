export interface Food {
  id: number
  name: string
  description: string
  price: number
  available: boolean
  image: string
}

export interface ModalProps {
  isOpen: boolean
  setIsOpen(): void
}
