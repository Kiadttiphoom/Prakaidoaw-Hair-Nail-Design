import { mysqlPool } from "@/lib/db";

export async function GET() {

  const promisePool = mysqlPool.promise();

  const [services] = await promisePool.query<any[]>("SELECT * FROM services WHERE is_active = 1");

  // ✅ format ราคาให้เป็น x,xxx
  const formattedServices = services.map((item: any) => ({
    ...item,
    price_min: Number(item.price_min).toLocaleString("th-TH"),
  }));

  return Response.json({
    message: "success",
    data: { services: formattedServices },
  });
}

