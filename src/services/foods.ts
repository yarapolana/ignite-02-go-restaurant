import { Food } from "../types";
import { api } from "./api";

export async function updateFoodAvailability(food: Food, isAvailable: boolean) {
  return await api.put(`/foods/${food.id}`, {
    ...food,
    available: !isAvailable,
  })
}

export async function getFoods() {
  return await api.get('/foods')
}

export async function createFood(food: Food) {
  return await api.post('/foods', { ...food, available: true })
}

export async function updateFood(editingFood: Food, food: Food) {
  return await api.put(`/foods/${editingFood.id}`, { ...editingFood, ...food },)
}

export async function deleteFood(foodId: number) {
  return await api.delete(`/foods/${foodId}`)
}
