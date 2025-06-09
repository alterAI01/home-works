import './App.css';
import PricingCardContainer from './components/PricindContainer';

function App() {
   return (
    <div className="min-h-screen bg-black">
      {/* Основной контент с отступом сверху */}
      <div className="pt-10"> 
        {/* Заголовок Pricing */}
        <h1 className="text-white text-center text-4xl font-bold">
          Pricing
        </h1>
        
        {/* Контейнер для PricingCardContainer с отступом 56px */}
        <div className="mt-14"> 
          {/* Обертка с центрированием на больших экранах */}
          <div className="sm:flex sm:justify-center">
            <PricingCardContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App

