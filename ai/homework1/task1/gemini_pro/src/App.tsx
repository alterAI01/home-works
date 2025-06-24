import './App.css';
import PricingCardContainer from './components/PricingContainer';

function App() {
   return (
     <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h1>
      <div className="flex justify-center"> {/* Optional: for centering the container itself */}
        <PricingCardContainer />
      </div>
    </div>
  ); 
}

export default App

