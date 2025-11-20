import { ArrowRight } from "lucide-react"
import type { IngredientInterface } from "../../types/ingredients"
import { useState, type Dispatch, type SetStateAction } from "react"
import type { currentPage } from "../../types/current-page"

type DiscoverRecipeBtnProps = {
  ingredients: IngredientInterface[],
  setCurrentPage: Dispatch<SetStateAction<currentPage>>
}

const DiscoverRecipeBtn = ({ ingredients, setCurrentPage }: DiscoverRecipeBtnProps) => {

  // variabile di stato per cambiare la scritta sul bottone quando viene cliccato
  const [isDiscover, setIsDiscover] = useState<boolean>(false)

  //* funzione per fare gestire il click. Quando verrà cliccato verrà aggiornata la pagina e fatta la chiamata api
  const handleClick = async () => {

  setIsDiscover(true)
    
    //TODO: Implementare reale chiamata api
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(ingredients);
  
  setCurrentPage(() => ({ currentPage: {page: "discover-recipes" }}));

    setIsDiscover(false)
    
  }

    if (!ingredients || ingredients.length == 0) {
        return null
    }


  return (
    <button 
      className={`flex justify-center gap-2 flex-nowrap text-green-600 py-2 rounded-lg font-bold ${isDiscover ? "bg-green-100 cursor-default" : "bg-white hover:bg-green-100 cursor-pointer"} transition-all duration-300`}
      onClick={handleClick}
    >
        {isDiscover ? "Discovering ..." : "Discover Recipe"} <ArrowRight />
    </button>
  )
}

export default DiscoverRecipeBtn
