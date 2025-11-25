import { ArrowRight } from "lucide-react"
import type { IngredientInterface } from "../../types/ingredients"
import { useState, type Dispatch, type SetStateAction } from "react"
import type { currentPage } from "../../types/current-page"

type DiscoverRecipeBtnProps = {
  ingredients: IngredientInterface[],
  setCurrentPage: Dispatch<SetStateAction<currentPage>>
}

const DiscoverRecipeBtn = ({ ingredients, setCurrentPage }: DiscoverRecipeBtnProps) => {

  const [isDiscover, setIsDiscover] = useState<boolean>(false)

  const handleClick = async () => {
    setIsDiscover(true)
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    setCurrentPage(() => ({ currentPage: {page: "discover-recipes" }}));

    setIsDiscover(false)
    
  }

    if (!ingredients || ingredients.length == 0) {
        return null
    }


  return (
    <button 
      
      onClick={handleClick}
    >
        {isDiscover ? "Discovering ..." : "Discover Recipe"} <ArrowRight />
    </button>
  )
}

export default DiscoverRecipeBtn
