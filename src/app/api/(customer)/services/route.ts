import { mysqlPool } from "@/lib/db";

export async function GET() {
  const [services] = await mysqlPool.query("SELECT * FROM services WHERE is_active = 1");

  // ✅ format ราคาให้เป็น x,xxx
  const formattedServices = services.map((item: any) => ({
    ...item,
    price_min: Number(item.price_min).toLocaleString("th-TH"), // <-- format เป็น 1,000
  }));

  return Response.json({
    message: "success",
    data: { services: formattedServices },
  });
}

