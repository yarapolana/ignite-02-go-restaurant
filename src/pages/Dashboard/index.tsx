import { useEffect, useState } from 'react'

import { Header } from '../../components/Header'
import { FoodItem } from '../../components/Food'
import { ModalAddFood } from '../../components/ModalAddFood'
import { ModalEditFood } from '../../components/ModalEditFood'
import { FoodsContainer } from './styles'
import { createFood, deleteFood, getFoods, updateFood } from '../../services/foods'
import { Food } from '../../types'

export const Dashboard = () => {
  const [foods, setFoods] = useState<Food[]>([])
  const [editingFood, setEditingFood] = useState<Food>({} as Food)
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  useEffect(() => {
    async function getInitialFoods() {
      const { data } = await getFoods()
      setFoods(data)
    }
    
    getInitialFoods() 
  }, [])

  const handleAddFood = async (food: Food) => {
    try {
      const { data } = await createFood({
        ...food,
        available: true,
      })

      setFoods([...foods, data])
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdateFood = async (food: Food) => {
    try {
      // const foodUpdated = await api.put(
      //   `/foods/${editingFood.id}`,
      //   { ...editingFood, ...food },
      // )
      const foodUpdated = await updateFood(editingFood, food)

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      )

      setFoods(foodsUpdated)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteFood = async (id: number) => {
    await deleteFood(id)

    const foodsFiltered = foods.filter(food => food.id !== id)

    setFoods(foodsFiltered)
  }

  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen)
  }

  const handleEditFood = (food: Food) => {
    setEditingFood(food)
    setEditModalOpen(true)
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <FoodItem
              key={food.id}
              food={food}
              handleDeleteFood={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  )
}
