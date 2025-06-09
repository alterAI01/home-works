import './App.css';
import PricingCardContainer from './components/PricindContainer';

function App() {
   return (
  <div className="bg-black pt-8 pb-8 min-h-screen">
      {/* Заголовок */}
      <h1 className="text-white text-2xl text-center">Pricing</h1>

      {/* Контейнер для карточек с отступом 56px сверху */}
      <div className="mt-14 flex sm:justify-center">
        <PricingCardContainer />
      </div>
    </div>
  );
}

export default App