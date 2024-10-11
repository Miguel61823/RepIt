const Features = () => {
  return ( 
    <section id="features" className="mb-12">
    <h3 className="text-2xl font-bold mb-6">Key Features</h3>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-blue-600 p-6 rounded-lg shadow-md">
        <h4 className="text-xl font-semibold mb-2">Personalized Workouts</h4>
        <p>Tailored exercise plans based on your fitness level and goals</p>
      </div>
      <div className="bg-blue-600 p-6 rounded-lg shadow-md">
        <h4 className="text-xl font-semibold mb-2">Nutrition Tracking</h4>
        <p>Log your meals and track your calorie intake effortlessly</p>
      </div>
      <div className="bg-blue-600 p-6 rounded-lg shadow-md">
        <h4 className="text-xl font-semibold mb-2">Progress Analytics</h4>
        <p>Visualize your fitness journey with detailed progress reports</p>
      </div>
    </div>
    </section>
   );
}
 
export default Features;