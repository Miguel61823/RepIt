import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Plans = () => {
  return ( 
    <section id="pricing" className="mb-12">
    <h3 className="text-2xl font-bold mb-6">Pricing Plans</h3>
    <div className="grid md:grid-cols-3 gap-8">

    <Card className="overflow-hidden flex flex-col h-full text-black dark:text-white bg-black">
      <CardHeader>
        <CardTitle className="text-xl font-bold truncate">Basic</CardTitle>
        <CardDescription className="mt-2 text-black dark:text-white font-bold text-3xl">$9.99<span className="text-sm font-thin">/month</span></CardDescription>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
      <ul className="mb-6">
          <li>✓ Personalized workouts</li>
          <li>✓ Basic nutrition tracking</li>
          <li>✓ Limited progress analytics</li>
        </ul>
      </CardContent>
      <CardFooter>
      <Button variant="wide">
          Choose Plan
        </Button>
      </CardFooter>
    </Card>

    <Card className="overflow-hidden flex flex-col h-full text-black dark:text-white  bg-black">
      <CardHeader>
        <CardTitle className="text-xl font-bold truncate">Pro</CardTitle>
        <CardDescription className="mt-2 text-black dark:text-white font-bold text-3xl">$19.99<span className="text-sm font-thin">/month</span></CardDescription>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
      <ul className="mb-6">
          <li>✓ Advanced personalized workouts</li>
          <li>✓ Comprehensive nutrition tracking</li>
          <li>✓ Full progress analytics</li>
          <li>✓ Coach support</li>
        </ul>
      </CardContent>
      <CardFooter>
      <Button variant="wide">
          Choose Plan
        </Button>
      </CardFooter>
    </Card>

    <Card className="overflow-hidden flex flex-col h-full text-black dark:text-white bg-black">
      <CardHeader>
        <CardTitle className="text-xl font-bold truncate">Elite</CardTitle>
        <CardDescription className="mt-2 text-black dark:text-white font-bold text-3xl">$29.99<span className="text-sm font-thin">/month</span></CardDescription>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
      <ul className="mb-6">
          <li>✓ All Pro features</li>
          <li>✓ Personalized meal plans</li>
          <li>✓ 1-on-1 coaching sessions</li>
          <li>✓ Premium content access</li>
        </ul>

      </CardContent>
      <CardFooter>
      <Button variant="wide">
          Choose Plan
        </Button>
      </CardFooter>
    </Card>

    </div>
  </section>
   );
}
 
export default Plans;