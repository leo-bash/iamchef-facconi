type RecipeTimeProps = {
  readyInMinutes: number | undefined;
};
const RecipeTime = ({ readyInMinutes }: RecipeTimeProps) => (
  <span className="flex items-center gap-1 bg-green-100 text-green-800 rounded-full px-2 py-0.5 font-semibold">
    
    {readyInMinutes ? `${readyInMinutes} min` : "n/d min"}
  </span>
);

export default RecipeTime;
