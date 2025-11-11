
interface RecipeCardProps {
  title: string;
  image: string;
}

function RecipeCard({ title, image }: RecipeCardProps) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '18px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      padding: '16px',
      marginBottom: '18px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '320px',
      width: '100%'
    }}>
      <img src={image} alt={title} style={{ width: '100%', borderRadius: '12px', marginBottom: '12px' }} />
      <h3 style={{ fontSize: '1.15rem', color: '#222', textAlign: 'center', margin: 0 }}>{title}</h3>
    </div>
  );
}

export default RecipeCard;
