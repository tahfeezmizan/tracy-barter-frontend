import { Card, CardContent } from "../ui/card";

export default function StatsCard({ stats }: { stats: any }) {
  console.log(stats);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats?.map((stat: any) => (
        <Card
          key={stat.title}
          className="bg-white text-black shadow-none border-none"
        >
          <CardContent className="!py-0 flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium">{stat.title}</p>
              <stat.icon className="text-black size-6" />
            </div>

            <p className="text-3xl font-medium text-slate-700">284</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
