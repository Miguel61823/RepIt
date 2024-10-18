import { Button } from "@/components/ui/button";

const Plans = () => {
  return ( 
    <section id="pricing" className="mb-12">
    <h3 className="text-2xl font-bold mb-6">Pricing Plans</h3>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-blue-200 p-6 rounded-lg shadow-md  text-blue-950">
        <h4 className="text-xl font-semibold mb-2">Basic</h4>
        <p className="text-3xl font-bold mb-4">$9.99<span className="text-sm font-normal">/month</span></p>
        <ul className="mb-6">
          <li>✓ Personalized workouts</li>
          <li>✓ Basic nutrition tracking</li>
          <li>✓ Limited progress analytics</li>
        </ul>
        <Button variant="wide">
          Choose Plan
        </Button>
      </div>
      <div className="bg-blue-200 p-6 rounded-lg shadow-md  text-blue-950">
        <h4 className="text-xl font-semibold mb-2">Pro</h4>
        <p className="text-3xl font-bold mb-4">$19.99<span className="text-sm font-normal">/month</span></p>
        <ul className="mb-6">
          <li>✓ Advanced personalized workouts</li>
          <li>✓ Comprehensive nutrition tracking</li>
          <li>✓ Full progress analytics</li>
          <li>✓ Coach support</li>
        </ul>
        <Button variant="wide">
          Choose Plan
        </Button>
      </div>
      <div className="bg-blue-200 p-6 rounded-lg shadow-md text-blue-950">
        <h4 className="text-xl font-semibold mb-2">Elite</h4>
        <p className="text-3xl font-bold mb-4">$29.99<span className="text-sm font-normal">/month</span></p>
        <ul className="mb-6">
          <li>✓ All Pro features</li>
          <li>✓ Personalized meal plans</li>
          <li>✓ 1-on-1 coaching sessions</li>
          <li>✓ Premium content access</li>
        </ul>
        <Button variant="wide">
          Choose Plan
        </Button>
      </div>
    </div>
  </section>
   );
}
 
export default Plans;