import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Features = () => {
  return (
    <section id="features" className="mb-2">
      <h3 className="text-violet-600 text-2xl font-bold mb-6">Key Features</h3>
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="overflow-hidden flex flex-col h-full dark:bg-gray-900 dark:text-white">
          <CardHeader>
            <CardTitle className="text-violet-600 text-xl font-bold">
              Personalized Workouts
            </CardTitle>
            <CardDescription className="mt-2 dark:text-white text-black text-md">
              Exercise tracking based on local gyms&apos; machines
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="overflow-hidden flex flex-col h-full dark:bg-gray-900 dark:text-white">
          <CardHeader>
            <CardTitle className="text-violet-600 text-xl font-bold">
              Supplement Tracking
            </CardTitle>
            <CardDescription className="mt-2 dark:text-white text-black text-md">
              Log your assisters and track your intake effortlessly
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="overflow-hidden flex flex-col h-full dark:bg-gray-900 dark:text-white ">
          <CardHeader>
            <CardTitle className="text-violet-600 text-xl font-bold">
              Progress Analytics
            </CardTitle>
            <CardDescription className="mt-2 dark:text-white text-black text-md">
              Visualize your fitness journey with detailed progress reports
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
};

export default Features;
