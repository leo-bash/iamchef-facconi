import type { currentPage } from "../../types/current-page"
import type { IngredientInterface } from "../../types/ingredients"
import SelectedItem from "./SelectedItem"

type SelectedListProps = {
    ingredients: IngredientInterface[],
    handleRemove: (ing: IngredientInterface) => void,
    currentPage: currentPage
}

const SelectedList = ({ ingredients, handleRemove, currentPage }: SelectedListProps) => {
  return (
    <div className={`max-h-40 flex ${currentPage.currentPage.page == 'homepage' ? "flex-wrap gap-4" : "flex-nowrap gap-2"}  overflow-y-auto rounded-lg`}>
    {ingredients.map((ingredient, index) => (
        <SelectedItem 
            key={index.toString()}
            id={index.toString()} 
            ingredient={ingredient} 
            handleRemove={handleRemove}
            currentPage={currentPage}/>
    ))}
    </div>

  )
}

export default SelectedList
