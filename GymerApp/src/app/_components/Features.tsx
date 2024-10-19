import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  return ( 
    <section id="features" className="mb-12">
    <h3 className="text-2xl font-bold mb-6">Key Features</h3>
    <div className="grid md:grid-cols-3 gap-8">

      <Card className="overflow-hidden flex flex-col h-full bg-blue-600 text-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Personalized Workouts</CardTitle>
          <CardDescription className="mt-2 text-white text-md">Tailored exercise plans based on your fitness level and goals</CardDescription>
        </CardHeader>
      </Card>

      <Card className="overflow-hidden flex flex-col h-full bg-blue-600 text-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Nutrition Tracking</CardTitle>
          <CardDescription className="mt-2 text-white text-md">Log your meals and track your calorie intake effortlessly</CardDescription>
        </CardHeader>
      </Card>

      <Card className="overflow-hidden flex flex-col h-full bg-blue-600 text-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Progress Analytics</CardTitle>
          <CardDescription className="mt-2 text-white text-md">Visualize your fitness journey with detailed progress reports</CardDescription>
        </CardHeader>
      </Card>

    </div>
    </section>
   );
}
 
export default Features;