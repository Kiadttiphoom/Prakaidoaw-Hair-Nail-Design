import { mysqlPool } from "@/lib/db";

export async function GET() {
  const [services] = await mysqlPool.query("SELECT * FROM services WHERE is_active = 1");
  const [stylists] = await mysqlPool.query("SELECT * FROM stylists WHERE is_active = 1");

  return Response.json({
    message: "success",
    data: { services, stylists },
  });
}
